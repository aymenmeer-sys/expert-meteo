type LogContext = Record<string, string | number | boolean | null | undefined>

export const logEvent = (event: string, context: LogContext = {}) => {
  const payload = { timestamp: new Date().toISOString(), event, ...context }
  if (process.env.NODE_ENV === 'production') console.info(JSON.stringify(payload))
  else console.debug('[v0]', payload)
}
