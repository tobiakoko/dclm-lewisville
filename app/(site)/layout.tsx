import Header, { type HeaderInfo } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteData } from '@/lib/data'
import { formatAddress, mapsUrl, telHref } from '@/lib/constants'
import { cityAndState } from '@/lib/address'
import { mainService, serviceStart } from '@/lib/schedule'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { config, schedule } = await getSiteData()
  const main = mainService(schedule)
  const headerInfo: HeaderInfo = {
    brandName: config.shortName.split(' · ')[0],
    brandPlace: cityAndState(config.address),
    streamsUrl: config.youtube.streams,
    mainServiceTime: main ? serviceStart(main) : null,
    address: formatAddress(config.address),
    mapsHref: mapsUrl(config.address),
    phone: config.phone,
    phoneHref: telHref(config.phone),
  }
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header info={headerInfo} />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
