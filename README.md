# Paie Cocottes — Calculateur de salaire IDCC 1501

Calculateur interne Cocottes Gourmandes : brut → net, coût employeur (RGDU 2026),
comparaison 35 h / 30 h, Navigo, mutuelle Alan, bulletin type PDF A4.

## Déploiement
Site 100 % statique : aucun build, aucune clé, aucune base de données. Coût : 0 €.
- **Netlify** : connecter ce repo GitHub (branche `main`, dossier de publication `/`), ou glisser-déposer le dossier sur app.netlify.com/drop
- Les réglages (grille, taux, Alan…) sont sauvegardés dans le navigateur de chaque appareil (localStorage)

## Mise à jour des barèmes
Tout est modifiable dans l'app (section Paramètres). À surveiller : prochain avenant
salaires IDCC 1501 (grille), revalorisations SMIC, PMSS au 1er janvier.

## Fichiers
- `index.html` — l'app complète (HTML/CSS/JS, sans dépendance)
- `manifest.webmanifest` + `service-worker.js` + icônes — PWA installable, fonctionne hors ligne
