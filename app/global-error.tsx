'use client'

import { useEffect, useRef } from 'react'

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const reloaded = useRef(false)

  useEffect(() => {
    const isChunkError = error.name === 'ChunkLoadError' || /Loading chunk|ChunkLoadError|dynamically imported module/i.test(error.message)
    const reloadKey = 'meteor-expert-chunk-reload'
    if (isChunkError && !reloaded.current && !sessionStorage.getItem(reloadKey)) {
      reloaded.current = true
      sessionStorage.setItem(reloadKey, '1')
      window.location.reload()
    }
  }, [error])

  return (
    <html lang="fr">
      <body className="bg-[#081522] text-white">
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <section>
            <h1 className="text-2xl font-semibold">Une erreur est survenue</h1>
            <p className="mt-3 text-slate-300">Rechargez la page ou revenez à l’accueil.</p>
            <button type="button" onClick={() => { sessionStorage.removeItem('meteor-expert-chunk-reload'); reset() }} className="mt-6 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-[#081522]">Réessayer</button>
          </section>
        </main>
      </body>
    </html>
  )
}

export default GlobalError
