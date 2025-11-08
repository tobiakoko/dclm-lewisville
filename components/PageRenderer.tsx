import HeroSection from './sections/HeroSection'
import FeaturesListSection from './sections/FeaturesListSection'
import BenefitsSection from './sections/BenefitsSection'
import AboutSection from './sections/AboutSection'
import CTASection from './sections/CTASection'
import CTAFormSection from './sections/CTAFormSection'
import FAQSection from './sections/FAQSection'
import Team from './sections/Team'
import Testimonials from './sections/Testimonials'
import MinistriesPreview from './sections/MinistriesPreview'

interface Section {
  _type: string
  _key: string
  [key: string]: any
}

interface PageRendererProps {
  sections: Section[]
}

export default function PageRenderer({ sections }: PageRendererProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'hero':
            return <HeroSection key={section._key} {...section} />

          case 'featuresList':
            return <FeaturesListSection features={[]} key={section._key} {...section} />

          case 'benefitsSection':
            return <BenefitsSection benefits={[]} key={section._key} {...section} />

          case 'aboutSection':
            return <AboutSection key={section._key} {...section} />

          case 'ctaSection':
            return <CTASection title={''} key={section._key} {...section} />

          case 'ctaFormSection':
            return <CTAFormSection heading={''} key={section._key} {...section} />

          case 'faqSection':
            return <FAQSection faqs={[]} key={section._key} {...section} />

          case 'ministriesRef':
            // This would need to be populated from a reference query
            return <MinistriesPreview key={section._key} ministries={[]} />

          case 'testimonialsRef':
            // This would need to be populated from a reference query
            return <Testimonials key={section._key} testimonials={[]} />

          case 'teamRef':
            // This would need to be populated from a reference query
            return <Team key={section._key} members={[]} />

          default:
            console.warn(`Unknown section type: ${section._type}`)
            return null
        }
      })}
    </>
  )
}
