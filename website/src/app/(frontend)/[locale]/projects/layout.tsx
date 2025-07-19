import { routing, redirect } from '@/i18n/routing'
import type { localeType } from '@/i18n/routing'
import { generateMetadata as generate } from '@/lib/metadata'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: localeType }>
}): Promise<Metadata> {
  return generate({ params })
}

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
  }>,
) {
  const params = await props.params

  const { locale } = params
  const { children } = props

  if (!routing.locales.includes(locale as localeType)) {
    redirect({ href: '/projects', locale: routing.defaultLocale })
  }
  return children
}
