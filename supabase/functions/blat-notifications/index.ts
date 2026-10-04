import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, serviceRoleKey)

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const BLAT_FROM_EMAIL = Deno.env.get('BLAT_FROM_EMAIL') || 'Blat al dia <avisos@resend.dev>'
const NTFY_TOKEN = Deno.env.get('NTFY_TOKEN') || ''
const CRON_SECRET = Deno.env.get('CRON_SECRET') || ''

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
  })
}

function madridDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value || ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

function minusDays(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() - Number(days || 0))
  return d.toISOString().slice(0, 10)
}

async function sendEmail(to: string, title: string, message: string) {
  if (!to) throw new Error('Falta l’adreça de correu')
  if (!RESEND_API_KEY) throw new Error('Falta RESEND_API_KEY')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: BLAT_FROM_EMAIL,
      to: [to],
      subject: title,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#171717"><h2 style="margin:0 0 12px">${title}</h2><p>${message}</p><p style="color:#777;font-size:12px">Enviat des de Blat al dia.</p></div>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
  return res.json()
}

async function sendNtfy(server: string, topic: string, title: string, message: string) {
  if (!topic) throw new Error('Falta el topic de ntfy')
  const base = (server || 'https://ntfy.sh').replace(/\/$/, '')
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (NTFY_TOKEN) headers.Authorization = `Bearer ${NTFY_TOKEN}`
  const res = await fetch(base, {
    method: 'POST', headers,
    body: JSON.stringify({ topic, title, message, priority: 3, tags: ['dog', 'calendar'] }),
  })
  if (!res.ok) throw new Error(`ntfy ${res.status}: ${await res.text()}`)
  return res.json().catch(() => ({}))
}

async function syncData(body: any) {
  const deviceId = String(body.deviceId || '')
  if (!deviceId) throw new Error('Falta deviceId')
  const settings = body.settings || {}
  const tracking = Array.isArray(body.tracking) ? body.tracking : []

  const profile = {
    device_id: deviceId,
    email_enabled: !!settings.emailEnabled,
    email: String(settings.email || ''),
    ntfy_enabled: !!settings.ntfyEnabled,
    ntfy_server: String(settings.ntfyServer || 'https://ntfy.sh'),
    ntfy_topic: String(settings.ntfyTopic || ''),
    updated_at: new Date().toISOString(),
  }
  const { error: profileError } = await supabase.from('blat_notification_profiles').upsert(profile)
  if (profileError) throw profileError

  const { error: deleteError } = await supabase.from('blat_notification_reminders').delete().eq('device_id', deviceId)
  if (deleteError) throw deleteError

  const rows = tracking
    .filter((t: any) => t?.id && t?.nextDate)
    .map((t: any) => ({
      device_id: deviceId,
      tracking_id: String(t.id),
      name: String(t.name || 'Seguiment'),
      category: String(t.category || ''),
      format: String(t.format || ''),
      subtype: String(t.subtype || ''),
      next_date: t.nextDate,
      notify_before: Number(t.notifyBefore || 0),
      notify_same_day: !!t.notifySameDay,
      updated_at: new Date().toISOString(),
    }))
  if (rows.length) {
    const { error: insertError } = await supabase.from('blat_notification_reminders').insert(rows)
    if (insertError) throw insertError
  }
  return { synced: rows.length }
}

async function sendTest(body: any) {
  const settings = body.settings || {}
  const channel = String(body.channel || '')
  const title = 'Blat al dia · prova'
  const message = 'Les notificacions funcionen correctament 🐾'
  if (channel === 'email') return { email: await sendEmail(settings.email, title, message) }
  if (channel === 'ntfy') return { ntfy: await sendNtfy(settings.ntfyServer, settings.ntfyTopic, title, message) }
  throw new Error('Canal no vàlid')
}

async function dispatch(req: Request) {
  if (CRON_SECRET && req.headers.get('x-cron-secret') !== CRON_SECRET) throw new Error('Cron no autoritzat')
  const today = madridDate()
  const { data: reminders, error } = await supabase
    .from('blat_notification_reminders')
    .select('*, blat_notification_profiles(*)')
  if (error) throw error

  let sent = 0
  const errors: string[] = []
  for (const reminder of reminders || []) {
    const profile = reminder.blat_notification_profiles
    if (!profile || !reminder.next_date) continue

    const kinds: { type: string; due: boolean; label: string }[] = [
      {
        type: 'before',
        due: Number(reminder.notify_before || 0) > 0 && minusDays(reminder.next_date, reminder.notify_before) === today,
        label: `d’aquí ${Number(reminder.notify_before)} dies`,
      },
      { type: 'same_day', due: !!reminder.notify_same_day && reminder.next_date === today, label: 'avui' },
    ]

    for (const kind of kinds.filter((k) => k.due)) {
      const alertKey = `${reminder.device_id}:${reminder.tracking_id}:${reminder.next_date}:${kind.type}`
      const { data: existing } = await supabase.from('blat_notification_log').select('id').eq('alert_key', alertKey).maybeSingle()
      if (existing) continue

      const title = `Blat al dia · ${reminder.name}`
      const detail = [reminder.category, reminder.format, reminder.subtype].filter(Boolean).join(' · ')
      const message = `${reminder.name} toca ${kind.label}.${detail ? ` ${detail}.` : ''}`

      try {
        if (profile.email_enabled && profile.email) await sendEmail(profile.email, title, message)
        if (profile.ntfy_enabled && profile.ntfy_topic) await sendNtfy(profile.ntfy_server, profile.ntfy_topic, title, message)
        const { error: logError } = await supabase.from('blat_notification_log').insert({
          alert_key: alertKey,
          device_id: reminder.device_id,
          tracking_id: reminder.tracking_id,
          reminder_date: reminder.next_date,
          alert_type: kind.type,
          sent_at: new Date().toISOString(),
        })
        if (logError) throw logError
        sent++
      } catch (err) {
        errors.push(`${reminder.name}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  }
  return { date: today, sent, errors }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const body = await req.json().catch(() => ({}))
    const action = String(body.action || '')
    if (action === 'sync') return json(await syncData(body))
    if (action === 'test') return json(await sendTest(body))
    if (action === 'dispatch') return json(await dispatch(req))
    return json({ error: 'Acció no vàlida' }, 400)
  } catch (err) {
    console.error(err)
    return json({ error: err instanceof Error ? err.message : String(err) }, 500)
  }
})
