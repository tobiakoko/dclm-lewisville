import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to main content for accessibility */}
      <Link href="#main-content" className="skip-to-content">
        Skip to main content
      </Link>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}