# SUPA KEEP ALIVE PWA · PUBLIC v1.0

Repositorio público que contiene únicamente la interfaz PWA de SUPA KEEP ALIVE.

## Seguridad
Este repositorio NO contiene:
- Supabase Secret Keys
- URLs privadas/configuración sensible
- scripts backend de health-check
- GitHub Actions del motor privado

Solo contiene la interfaz y `data/status.json`.

## GitHub Pages
En este repositorio público:
Settings → Pages → Build and deployment
Source: Deploy from a branch
Branch: main
Folder: /(root)

## Actualización del estado
El repositorio privado del motor debe actualizar `data/status.json` de este repositorio público después de cada health-check.

La PWA leerá ese archivo y mostrará el estado de los proyectos.
