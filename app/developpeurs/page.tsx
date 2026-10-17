import Link from 'next/link'

export const metadata = { title: 'API météo pour développeurs | MétéoExpert', description: 'Consultez le contrat public de l’API MétéoExpert.' }

const DevelopersPage = () => <main className="mx-auto min-h-screen max-w-4xl px-6 py-16 text-slate-100"><Link href="/" className="text-sm text-cyan-300">← Retour à MétéoExpert</Link><h1 className="mt-8 text-4xl font-semibold">API météo pour développeurs</h1><p className="mt-4 max-w-2xl text-slate-400">Un contrat JSON stable pour intégrer météo actuelle, nowcasting et observations citoyennes.</p><div className="mt-8 rounded-2xl border border-white/10 bg-[#0d2132] p-6"><h2 className="text-xl font-semibold">OpenAPI</h2><p className="mt-2 text-sm text-slate-400">Le contrat est disponible à l’URL suivante :</p><a className="mt-4 inline-block text-cyan-300 underline" href="/api/v2/openapi">/api/v2/openapi</a></div></main>
export default DevelopersPage
