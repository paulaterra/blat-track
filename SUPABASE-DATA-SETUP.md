# Guardar totes les dades a Supabase

Aquesta versió de Blat Track desa a Supabase el perfil, seguiments, pautes, quadern, documents, configuració de notificacions i la foto/arxius.

## 1. SQL Editor
Executa el fitxer `supabase/data-setup.sql`.

## 2. Edge Function
Crea una Edge Function anomenada exactament `blat-data` i substitueix el seu `index.ts` pel contingut de:

`supabase/functions/blat-data/index.ts`

Desplega-la.

## Migració automàtica
La primera vegada que obris aquesta versió al dispositiu on ara tens les dades, si Supabase encara no té cap estat guardat, l'app pujarà automàticament l'estat local existent. A partir d'aquí Supabase serà la còpia persistent i qualsevol dispositiu carregarà aquestes dades.
