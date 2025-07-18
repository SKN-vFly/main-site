import { routing, redirect } from '@/i18n/routing'
import type { localeType } from '@/i18n/routing'

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
    redirect({ href: '/blog', locale: routing.defaultLocale })
  }
  return children
}
