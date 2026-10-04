# Blat al dia — v9

Webapp/PWA responsive per al seguiment de salut d'en Blat. Funciona en ordinador, mòbil i com a app instal·lable.

## Disseny
- Base molt neta: fons gris clar, targetes blanques, tipografia negra i botons principals negres.
- Cada apartat conserva el seu color principal.
- Dins de **Seguiment**, cada format té color i icona propis perquè es diferenciï ràpidament:
  - Vacuna → groc
  - Pastilla → verd menta
  - Pipeta → blau
  - Crema → salmó
  - Xampú → lila
  - Aliment → taronja
  - Injecció → rosa
- **Pautes** torna a combinar salmó, verd, lila, blau, groc, etc., en lloc de ser tot groc.
- **Quadern** també diferencia visualment Salut, Visita veterinària, Millora, Medicació i Alimentació.
- **Documents** diferencia carnet, analítiques, receptes i informes per color.

## Funcionalitats
- Seguiments il·limitats i formularis desables encara que faltin dades.
- Dates, recurrència, avís X dies abans i avís el mateix dia.
- Botó “Fet” que crea registre al Quadern i calcula la pròxima data.
- Pautes amb tantes fotos/documents com vulguis i descripció individual de cada adjunt.
- Quadern cronològic amb fotos i documents a cada episodi.
- Documents com a apartat propi.
- Perfil amb foto real d'en Blat.
- Dades locals en localStorage + IndexedDB.
- PWA offline després de la primera càrrega.

## Notificacions
Nou apartat **Notificacions** amb dos canals:
- Email.
- ntfy al mòbil.

Des de la pantalla pots activar/desactivar cada canal, posar l'email, servidor/topic ntfy, veure els pròxims avisos i enviar proves.

### Avisos automàtics amb l'app tancada
La carpeta `supabase/` inclou el backend preparat perquè els avisos s'enviïn encara que la PWA estigui tancada:
- Supabase Edge Function: `blat-notifications`.
- Email amb Resend.
- Push amb ntfy.
- SQL de taules i cron.

Consulta `supabase/README.md` per connectar-ho.

## Obrir en local
Amb VS Code, obre la carpeta i executa `index.html` amb **Live Server**.

## Instal·lar com app
Publica la carpeta en HTTPS.
- iPhone/iPad: Safari → Compartir → Afegir a la pantalla d'inici.
- Android/Chrome: menú → Instal·lar app / Afegir a pantalla d'inici.

## Connectar notificacions
Un cop desplegada l'Edge Function, edita `config.js`:

```js
window.BLAT_CONFIG = {
  notificationFunctionUrl: 'https://PROJECT.supabase.co/functions/v1/blat-notifications',
  supabaseAnonKey: 'LA_TEVA_ANON_KEY'
};
```


## Canvis v9
- Targetes de Seguiment sense degradat: fons blanc i color només en icona, etiquetes i data.
- “D’aquí X dies” adopta exactament el color del tipus de seguiment.
- Pautes sense degradat: targetes blanques amb accent i etiquetes de color.


## V10
- Icones de Seguiment i Notificacions amb fons suau + icona en color fort.
- Sense gradients a Notificacions.
- Cronologia del Quadern unificada en lila.
- Reenquadrament de la foto d'en Blat amb posició horitzontal, vertical i zoom.


## V12
- A Seguiment, la **Pròxima data** es calcula automàticament a partir de l’última administració + la recurrència.
- La data calculada continua sent editable manualment quan cal fer una excepció.
- Si una data s’ha editat manualment, l’app la respecta mentre no es vulgui tornar a calcular canviant la recurrència.
- Càlcul de mesos/anys millorat per tractar correctament finals de mes (p. ex. 31 de gener + 1 mes).

## Publicació
Per publicar aquesta versió a GitHub Pages i connectar les notificacions amb Supabase, segueix `DEPLOY.md`.
