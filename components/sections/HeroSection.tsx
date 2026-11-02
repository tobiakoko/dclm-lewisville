import Image from 'next/image'
import congregationPrayer from '@/app/assets/CongregationPrayer.jpeg'

export default function HeroSection({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden min-h-[360px] bg-(--church-navy)">
      <Image
        src={congregationPrayer}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-(--church-navy)/80" aria-hidden="true" />
      <div className="relative z-10 text-center px-4 text-white">
        <p className="text-lg font-semibold mb-2">{subtitle}</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold">{title}</h1>
      </div>
    </section>
  )
}
