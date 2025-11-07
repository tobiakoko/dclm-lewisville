import { Heart, CreditCard, Building2, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Give',
  description: 'Support the ministry of DCLM Lewisville through your generous giving.',
}

export default function GivePage() {
  return (
    <div className="py-16">
      {/* Hero */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container text-center max-w-3xl">
          <Heart size={64} className="mx-auto mb-6" />
          <h1 className="font-heading text-5xl font-bold mb-4">Give</h1>
          <p className="text-xl">
            Your generosity helps us spread the Gospel, support our community, and fulfill God&apos;s mission in Lewisville and beyond.
          </p>
        </div>
      </section>

      {/* Why Give */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Why We Give
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Worship</h3>
              <p className="text-gray-600 text-sm">
                Giving is an act of worship, expressing our gratitude to God for His provision and blessings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Ministry</h3>
              <p className="text-gray-600 text-sm">
                Your gifts support ministries, maintain our facilities, and enable us to serve our community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Mission</h3>
              <p className="text-gray-600 text-sm">
                Together, we can reach more people with the life-changing message of Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Ways to Give
          </h2>

          <div className="space-y-6">
            {/* Online Giving */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold mb-2">Online Giving</h3>
                  <p className="text-gray-600 mb-4">
                    Give securely online using your credit card, debit card, or bank account. Set up one-time or recurring donations.
                  </p>
                  <Button size="lg">
                    Give Online
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Secure, encrypted transaction through our trusted payment processor.
                  </p>
                </div>
              </div>
            </div>

            {/* In-Person Giving */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="text-purple-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold mb-2">In-Person Giving</h3>
                  <p className="text-gray-600 mb-4">
                    Place your offering in the collection boxes during any of our services. Cash and checks are welcome.
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>For checks:</strong> Make payable to &quot;Deeper Life Bible Church Lewisville&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mail Giving */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="text-green-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold mb-2">Give by Mail</h3>
                  <p className="text-gray-600 mb-4">
                    Mail your contribution to our church address:
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm font-mono">
                      Deeper Life Bible Church Lewisville<br />
                      123 Church Street<br />
                      Lewisville, TX 75067
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giving FAQs */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Is online giving secure?</h3>
              <p className="text-gray-600">
                Yes! We use industry-standard encryption and security measures to protect your financial information.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Can I get a tax receipt?</h3>
              <p className="text-gray-600">
                Yes, all donations are tax-deductible. You&apos;ll receive a year-end giving statement for your records.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Can I give to specific ministries?</h3>
              <p className="text-gray-600">
                Yes, when giving online or by check, you can designate your gift for a specific ministry or the general fund.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">What is the biblical principle of tithing?</h3>
              <p className="text-gray-600">
                The Bible teaches us to give the first 10% of our income to God (Malachi 3:10, Proverbs 3:9-10). Offerings are gifts above and beyond the tithe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-3xl text-center">
          <blockquote className="text-2xl italic text-gray-700 mb-4">
            &quot;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&quot;
          </blockquote>
          <p className="text-gray-600 font-medium">2 Corinthians 9:7</p>
        </div>
      </section>
    </div>
  )
}