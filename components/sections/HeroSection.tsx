import Image from 'next/image'

const HERO_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD8no584vi9HWSzrrIQi7ieOeePjA5a0rjyLQQ-sfQV9JcoYOWnXjNzcnwB5GybE-R9eceIU2q7_hx_dg5bWBGP9yTs532Ot4au5FJi6puP6gU9eYp8HQmz07mcp0qtitx6TqV2NzVgEihG7zZ67yZ6y21Nkv06TqubW0nGQy1w5LkkF054-c9PVxcjznR-CuNr_zK-XTWfJJD8c1yWvjqfcISkx_nMVSEUkSmWLQnuErdioKoS4h0CEj6_M_ej90PcpTbZjrr5kno'

export default function HeroSection({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 flex items-center justify-center overflow-hidden min-h-[450px]">
      <Image
        src={HERO_BG_IMAGE}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-(--church-navy)/70" aria-hidden="true" />
      <div className="relative z-10 text-center px-4">
        <p className="font-display italic text-2xl mb-2 text-yellow-500">
          {subtitle}
        </p>
        <h1 className="text-white font-display text-5xl md:text-7xl uppercase tracking-widest">
          {title}
        </h1>
        <div className="mt-6 flex justify-center space-x-2" aria-hidden="true">
          <div className="h-1 w-12 bg-(--church-red)" />
          <div className="h-1 w-12 bg-yellow-500" />
        </div>
      </div>
    </section>
  )
}