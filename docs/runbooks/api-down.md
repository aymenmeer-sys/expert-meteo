# API indisponible

1. Vérifier `/status` et les logs Vercel.
2. Contrôler Open-Meteo et Météo-France séparément.
3. Vérifier le cache SW et la réponse fallback.
4. Si le taux 429 augmente, inspecter Upstash et ajuster la fenêtre.
5. Communiquer l’incident sans exposer de données utilisateur.
