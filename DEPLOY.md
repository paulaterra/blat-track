# Publicar Blat al dia · GitHub Pages + Supabase

## 1. GitHub Pages
1. Crea un repositori nou a GitHub (per exemple `blat-al-dia`).
2. Puja **el contingut d'aquesta carpeta** a l'arrel del repositori.
3. A GitHub: **Settings → Pages**.
4. A **Build and deployment**, tria **Deploy from a branch**.
5. Selecciona `main` i `/ (root)` i desa.
6. GitHub et mostrarà l'URL pública, normalment `https://USUARI.github.io/blat-al-dia/`.

L'app ja usa rutes relatives, així que funciona bé dins d'un subdirectori de GitHub Pages.

## 2. Supabase · base de dades de notificacions
1. Crea un projecte a Supabase.
2. Ves a **SQL Editor** i executa `supabase/setup.sql`.

## 3. Supabase · Edge Function
1. Ves a **Edge Functions → Deploy a new function → Via Editor**.
2. Crea una funció amb el nom exacte `blat-notifications`.
3. Substitueix el codi per `supabase/functions/blat-notifications/index.ts`.
4. Desplega-la.

La URL tindrà aquest format:
`https://PROJECT_REF.supabase.co/functions/v1/blat-notifications`

## 4. Secrets de la funció
A **Edge Functions → Secrets**, afegeix:
- `RESEND_API_KEY`
- `BLAT_FROM_EMAIL`
- `CRON_SECRET`
- `NTFY_TOKEN` només si el teu servidor/topic ntfy és privat i el necessita.

`SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` els proporciona Supabase automàticament a les Edge Functions allotjades.

## 5. Connectar el frontend
A Supabase, ves a **Settings → API Keys** i copia la **Publishable key** (o la clau anon legacy si el projecte encara la mostra).

Edita `config.js`:

```js
window.BLAT_CONFIG = {
  notificationFunctionUrl: 'https://PROJECT_REF.supabase.co/functions/v1/blat-notifications',
  supabaseAnonKey: 'LA_TEVA_PUBLISHABLE_KEY'
};
```

La publishable/anon key es pot usar al navegador. **No posis mai la service_role/secret key al frontend.**

## 6. Programar els avisos automàtics
Executa `supabase/cron-example.sql` després de substituir:
- `PROJECT_REF`
- `PUBLISHABLE_KEY`
- `CRON_SECRET`

El cron crida la funció un cop al dia i envia els avisos que toquen.

## 7. Resend (per email)
Per enviar emails reals necessites un compte de Resend i un remitent verificat. Posa la seva API key a `RESEND_API_KEY` i el remitent complet a `BLAT_FROM_EMAIL`.

Per provar ntfy no necessites Resend.

## Important sobre les dades
En aquesta versió, **Seguiment, Pautes, Quadern, Documents i Perfil continuen guardats localment al navegador** (`localStorage` + `IndexedDB`). Supabase només desa la còpia necessària dels recordatoris per poder enviar notificacions amb l'app tancada.

Per tant:
- si obres l'app al mateix dispositiu/navegador, tens les teves dades;
- si l'obres en un dispositiu diferent, començarà amb dades pròpies d'aquell dispositiu;
- els documents/fotos no es pugen a Supabase en aquesta versió.

Si es vol sincronització total entre mòbil i ordinador, cal una segona fase amb Supabase Auth + Database + Storage.
