import ModernNavigation from '@/components/layout/ModernNavigation'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}