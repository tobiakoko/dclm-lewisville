import Image from 'next/image'
import Link from 'next/link'
import newHere from '@/app/assets/NewHere.jpeg'
import MusicMinistry from '@/app/assets/MusicMinistry.jpeg'
import Visit from '@/app/assets/visit.jpeg'

export function Welcome() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-church_bg">
                <h2 className="font-display text-3xl md:text-5xl text-church_blue font-semibold mb-8 max-w-4xl mx-auto leading-tight">
                    Every one of us was created to belong to a community. It was never God&apos;s heart for us to do this life alone.
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-sm leading-relaxed">
                    DCLM Lewisville is committed to championing the high and heavenly call from Jesus to reach out to people of all race, social economic class and language with the message of God’s love and grace and in turn discipling them into spiritual maturity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link href="/about" className="relative group cursor-pointer">
                        <div className="aspect-3/4 rounded-t-[100px] overflow-hidden mb-6 shadow-xl">
                            <Image alt="Plan a visit" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" src={newHere} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-church_blue">I&apos;m New</h3>
                        <p className="text-xs text-gray-500 mt-2 tracking-widest">PLAN A VISIT</p>
                    </Link>
                    <Link href="/contact" className="relative group cursor-pointer">
                        <div className="aspect-3/4 rounded-t-[100px] overflow-hidden mb-6 shadow-xl">
                            <Image alt="Get connected" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" src={Visit} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-church_blue">Connect</h3>
                        <p className="text-xs text-gray-500 mt-2 tracking-widest">GET CONNECTED</p>
                    </Link>
                    <Link href="/ministries" className="relative group cursor-pointer">
                        <div className="aspect-3/4 rounded-t-[100px] overflow-hidden mb-6 shadow-xl">
                            <Image alt="find a ministry" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" src={MusicMinistry} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-church_blue">Find a Ministry</h3>
                        <p className="text-xs text-gray-500 mt-2 tracking-widest">VIEW MINISTRIES</p>
                    </Link>
                </div>
            </section>
    )
}