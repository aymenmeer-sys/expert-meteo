# API contract

MétéoExpert exposes server-side route handlers under `/api`. External providers are never called directly from the browser; route handlers are responsible for validation, timeout handling, caching and provider fallback.

## Weather query

`GET /api/weather?latitude=48.8566&longitude=2.3522`

### Parameters

- `latitude`: number between -90 and 90.
- `longitude`: number between -180 and 180.
- `timezone`: optional IANA timezone; defaults to `auto`.

### Response shape

```json
{
  "location": { "latitude": 48.8566, "longitude": 2.3522, "timezone": "Europe/Paris" },
  "current": { "temperature": 18, "feelsLike": 18, "humidity": 64, "pressure": 1018, "windSpeed": 12, "uvIndex": 3 },
  "hourly": [],
  "daily": [],
  "source": "open-meteo",
  "fetchedAt": "2026-10-16T10:42:00.000Z"
}
```

Invalid coordinates return `400`. Provider timeouts return `503` with a stable `{ "error": "weather_unavailable" }` payload. Clients must not expose provider keys or depend on provider-specific response fields.

## Operational rules

- Validate all query parameters at the boundary.
- Apply per-IP and per-user rate limits before provider calls.
- Add a correlation ID to structured logs.
- Cache read-only forecasts and expose the source timestamp.
- Do not log precise location history or personal identifiers without consent.
