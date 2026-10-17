import type { Metadata } from 'next'
import Page from '@/app/page'

type Locale = 'fr' | 'en' | 'es' | 'de'
const locales: Locale[] = ['fr', 'en', 'es', 'de']

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const safeLocale = locales.includes(locale as Locale) ? locale : 'fr'
  return {
    title: `MétéoExpert — ${safeLocale.toUpperCase()}`,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  }
}

const LocalePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const initialLanguage = locales.includes(locale as Locale) ? (locale as Locale) : 'fr'
  return <Page initialLanguage={initialLanguage} />
}

export default LocalePage
