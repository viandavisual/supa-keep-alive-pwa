# SUPA KEEP ALIVE PWA · PUBLIC v1.1

Actualització de seguretat i independència entre PWAs. Manté intactes la supervisió, la lectura de data/status.json i el disseny.

## Canvis
- Identitat PWA nova i estable `./supa-keep-alive-pwa`, relativa a la carpeta del projecte. A GitHub Pages es resol dins la ruta del repositori de SUPA KEEP ALIVE, no a l'arrel compartida `https://viandavisual.github.io/`.
- start_url `./index.html`, scope `./`: delimiten aquesta instal·lació.
- Service Worker amb neteja de cachés restringida exclusivament a `supa-keep-alive-assets-*`. Mai esborrar les caches d'altres apps.
- Precache tolerant a fitxers opcionals i activació de nova versió.

## Publicació
Substitueix els fitxers del repositori públic SUPA KEEP ALIVE, **sense alterar `data/status.json` ni els workflows/secret del motor privat**. Mantén la ubicació de GitHub Pages actual.

## ATENCIÓ: instal·lació antiga amb manifest_id de l'arrel
El `manifest_id` antic `https://viandavisual.github.io/` ja pot estar registrat a Chrome. Canviar el manifest al servidor NO elimina ni converteix automàticament aquella instal·lació. Per això:
1. Publica v1.1 i comprova que SUPA KEEP ALIVE continua mostrant l'estat de Supabase al navegador.
2. A Chrome PC, revisa `chrome://web-app-internals` per comprovar la identitat nova quan la instal·lis. No confonguis la PWA nova amb el registre antic.
3. Si l'antiga SUPA KEEP ALIVE segueix capturant LEPETITPRINCE, desinstal·la la **instal·lació antiga** de SUPA KEEP ALIVE des de `chrome://apps` / el menú de la seva finestra. **No seleccionis cap opció per esborrar dades de navegació**, i no eliminis caches o localStorage del domini globalment. Torna a instal·lar SUPA KEEP ALIVE des de la seva pròpia URL.
4. Revisa Le Petit Prince i instal·la-la separadament. Chrome pot necessitar reinici o actualització de les pestanyes.

## Comprovacions
- El manifest v1.1 declara un `id` diferent del de Le Petit Prince.
- El SW queda limitat a la seva carpeta i no neteja caches globals.
- És possible que l'ID antic de Chrome continuï existint fins a desinstal·lar expressament la PWA antiga. Cap patch de l'altra app pot garantir la correcció d'aquest registre de Chrome.

## Seguretat
Aquest repositori només conté la PWA pública, les icones i `data/status.json`; no hi ha claus de Supabase.
