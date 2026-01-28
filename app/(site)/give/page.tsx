import { Heart, CreditCard, Building2, Smartphone, Mail, ShieldCheck, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Give Online',
  description: 'Support the ministry of DCLM Lewisville through your generous giving.',
}

export default function GivePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[var(--church-navy)]">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--church-navy)] to-[#1a237e]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-xl">
            <Heart size={14} className="text-[var(--church-red)] fill-[var(--church-red)]" />
            Generosity
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Investing in <br/><span className="text-[var(--church-red)] italic">Kingdom Work</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Your generosity helps us preach the Gospel, serve our community, and maintain a house of worship where lives are transformed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-[var(--church-red)] hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 h-14 rounded-full shadow-lg hover:shadow-red-900/20 hover:-translate-y-0.5 transition-all text-sm">
               Give Now
             </Button>
             <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest px-10 h-14 rounded-full text-sm">
               Manage Giving
             </Button>
          </div>
        </div>
      </section>

      {/* --- PRIMARY WAYS TO GIVE --- */}
      <section className="py-20 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Online Giving Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-[var(--church-navy)]/5 border-t-4 border-[var(--church-red)] flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-[var(--church-red)] group-hover:bg-[var(--church-red)] group-hover:text-white transition-colors">
                <CreditCard size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--church-navy)] mb-3">Give Online</h3>
              <p className="text-slate-600 mb-6 flex-grow">
                Simple, secure giving. Set up recurring gifts or make a one-time donation using your card or bank account.
              </p>
              <Button className="w-full bg-[var(--church-navy)] hover:bg-[var(--church-navy)]/90 text-white font-bold h-12 rounded-lg">
                Donate Securely
              </Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400 font-medium">
                <ShieldCheck size={12} /> SSL Encrypted Transaction
              </div>
            </div>

            {/* In-Person Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-[var(--church-navy)]/5 border-t-4 border-[var(--church-navy)] flex flex-col hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-[var(--church-navy)] group-hover:bg-[var(--church-navy)] group-hover:text-white transition-colors">
                <Building2 size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--church-navy)] mb-3">In Person</h3>
              <p className="text-slate-600 mb-6 flex-grow">
                Place your cash or check offering in the collection baskets during any of our weekly services.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-auto">
                 <p className="text-xs font-bold uppercase text-slate-400 mb-1">Checks Payable To:</p>
                 <p className="font-bold text-[var(--church-navy)]">DCLM Lewisville</p>
              </div>
            </div>

            {/* Mail Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-[var(--church-navy)]/5 border-t-4 border-slate-400 flex flex-col hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                <Mail size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--church-navy)] mb-3">By Mail</h3>
              <p className="text-slate-600 mb-6 flex-grow">
                Prefer to mail a check? Send it directly to our secure finance office at the address below.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-auto">
                 <p className="text-xs font-bold uppercase text-slate-400 mb-1">Mailing Address:</p>
                 <p className="text-sm font-medium text-[var(--church-navy)] leading-relaxed">
                   DCLM Lewisville<br/>
                   123 Church Street<br/>
                   Lewisville, TX 75067
                 </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- WHY WE GIVE --- */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--church-navy)] mb-4">The Heart of Giving</h2>
            <p className="text-lg text-slate-500">
              We give not because we have to, but because God first gave to us. Giving is an act of worship and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-[var(--church-red)]/10 text-[var(--church-red)] flex items-center justify-center shrink-0 font-bold">1</div>
                   <div>
                     <h3 className="font-bold text-xl text-[var(--church-navy)] mb-2">It's Biblical</h3>
                     <p className="text-slate-600 leading-relaxed">
                       The Bible teaches us to honor God with the "firstfruits" of our labor (Proverbs 3:9). Tithing reflects our trust in His provision.
                     </p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-[var(--church-red)]/10 text-[var(--church-red)] flex items-center justify-center shrink-0 font-bold">2</div>
                   <div>
                     <h3 className="font-bold text-xl text-[var(--church-navy)] mb-2">It Supports Ministry</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Your gifts keep the lights on, fund outreach programs, support missionaries, and ensure our children and youth have safe environments to learn about Jesus.
                     </p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-[var(--church-red)]/10 text-[var(--church-red)] flex items-center justify-center shrink-0 font-bold">3</div>
                   <div>
                     <h3 className="font-bold text-xl text-[var(--church-navy)] mb-2">It Changes Lives</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Every dollar given is an investment in eternity—helping to bring the Gospel to the lost and hope to the hopeless.
                     </p>
                   </div>
                </div>
             </div>
             
             {/* Scripture Block */}
             <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 relative">
               <Heart className="absolute top-10 right-10 text-[var(--church-red)]/10 w-32 h-32" />
               <blockquote className="relative z-10 font-serif text-2xl italic text-[var(--church-navy)] leading-relaxed mb-6">
                 "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
               </blockquote>
               <cite className="relative z-10 text-sm font-bold uppercase tracking-widest text-[var(--church-red)] not-italic">
                 — 2 Corinthians 9:7
               </cite>
             </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[var(--church-navy)] flex items-center justify-center gap-3">
              <HelpCircle className="text-slate-400" /> Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is online giving secure?", a: "Yes. We use industry-standard encryption and security measures (PCI Compliance) to protect your financial information at all times." },
              { q: "Will I receive a tax receipt?", a: "Absolutely. We send out annual giving statements every January for the preceding tax year. Ensure your contact info is up to date." },
              { q: "Can I designate my gift?", a: "Yes. Our giving platform allows you to select specific funds (e.g., General Fund, Missions, Building Project) for your donation." },
              { q: "What about processing fees?", a: "The church pays a small processing fee for online gifts. If you wish, you can choose to 'cover the fees' during checkout to ensure 100% of your gift goes to ministry." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-[var(--church-navy)] mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">Have questions about finances?</p>
            <a href="mailto:finance@dclmlewisville.org" className="text-[var(--church-navy)] font-bold underline hover:text-[var(--church-red)] transition-colors">
              Contact our Finance Team
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}