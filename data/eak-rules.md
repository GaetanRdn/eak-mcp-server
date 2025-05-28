# Règles EAK pour les revues de code

## Architecture
- Respect des couches : core/domain, core/use-cases, infrastructure, ui
- Pas de logique métier dans les composants UI
- Un use case = un fichier, avec un test associé

## Tests
- Chaque use-case doit être testé avec Vitest
- Les fichiers `.spec.ts` doivent couvrir les cas limites

## Qualité de code
- Pas de any, préférer unknown + Zod
- Nommage clair et explicite
- Code auto-documenté, pas de commentaires superflus