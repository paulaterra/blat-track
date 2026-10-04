import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
  })
}

function cleanPart(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData()
      const action = String(form.get('action') || '')
      const appId = cleanPart(String(form.get('appId') || ''))
      const key = cleanPart(String(form.get('key') || ''))
      const file = form.get('file')

      if (action !== 'upload') throw new Error('Acció multipart no vàlida')
      if (!appId || !key) throw new Error('Falten appId o key')
      if (!(file instanceof File)) throw new Error('Falta el fitxer')

      const path = `${appId}/${key}`
      const bytes = new Uint8Array(await file.arrayBuffer())
      const { error } = await supabase.storage
        .from('blat-files')
        .upload(path, bytes, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        })
      if (error) throw error
      return json({ ok: true, path })
    }

    const body = await req.json().catch(() => ({}))
    const action = String(body.action || '')
    const appId = cleanPart(String(body.appId || ''))
    if (!appId) throw new Error('Falta appId')

    if (action === 'load') {
      const { data, error } = await supabase
        .from('blat_app_state')
        .select('data, updated_at')
        .eq('app_id', appId)
        .maybeSingle()
      if (error) throw error
      return json({ found: !!data, data: data?.data || null, updatedAt: data?.updated_at || null })
    }

    if (action === 'save') {
      const data = body.data
      if (!data || typeof data !== 'object') throw new Error('Falten dades')
      const { error } = await supabase
        .from('blat_app_state')
        .upsert({ app_id: appId, data, updated_at: new Date().toISOString() })
      if (error) throw error
      return json({ ok: true })
    }

    if (action === 'download') {
      const key = cleanPart(String(body.key || ''))
      if (!key) throw new Error('Falta key')
      const path = `${appId}/${key}`
      const { data, error } = await supabase.storage.from('blat-files').createSignedUrl(path, 300)
      if (error) throw error
      return json({ url: data.signedUrl })
    }

    if (action === 'delete') {
      const key = cleanPart(String(body.key || ''))
      if (!key) throw new Error('Falta key')
      const path = `${appId}/${key}`
      const { error } = await supabase.storage.from('blat-files').remove([path])
      if (error) throw error
      return json({ ok: true })
    }

    return json({ error: 'Acció no vàlida' }, 400)
  } catch (err) {
    console.error(err)
    return json({ error: err instanceof Error ? err.message : String(err) }, 500)
  }
})
