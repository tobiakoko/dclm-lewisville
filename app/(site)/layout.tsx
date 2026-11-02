import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteData } from '@/lib/data'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { config } = await getSiteData()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header shortName={config.shortName} />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
