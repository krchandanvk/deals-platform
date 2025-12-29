import { Target, Heart, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About DealsHub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for finding the best deals and discounts across the internet
          </p>
        </div>

        {/* Our Mission */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            At DealsHub, we believe everyone deserves access to great deals. Our mission is to curate the best discounts, offers, and promotions from trusted brands and retailers, making it easy for you to save money on products and services you love. We tirelessly search the web so you don't have to, bringing you hand-picked deals that offer real value.
          </p>
        </section>

        {/* What We Do */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">What We Do</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <p className="text-gray-600">
                <strong>Curate the Best Deals:</strong> Our team of deal hunters works around the clock to find and verify the most valuable offers across electronics, software, fashion, food, and services.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <p className="text-gray-600">
                <strong>Verify Every Offer:</strong> We personally test and verify each deal to ensure it's legitimate, active, and actually provides the savings promised.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <p className="text-gray-600">
                <strong>Update Regularly:</strong> Our platform is updated daily with fresh deals, and we promptly remove expired offers to save you time.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <p className="text-gray-600">
                <strong>Provide Honest Recommendations:</strong> We're transparent about our affiliate relationships and only recommend products we believe offer genuine value.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">
                We clearly disclose our affiliate relationships and never hide how we earn commissions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                Every deal is personally reviewed to ensure it meets our quality standards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">User-Centric</h3>
              <p className="text-gray-600 text-sm">
                Your savings and satisfaction are our top priorities in everything we do.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                We build long-term relationships with our users through honest, reliable service.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Find a Deal</h3>
                <p className="text-gray-600 text-sm">
                  Browse our curated deals by category or check out the best deals of the day.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Click to Buy</h3>
                <p className="text-gray-600 text-sm">
                  Click on any deal to be redirected to the official retailer or service provider.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Save Money</h3>
                <p className="text-gray-600 text-sm">
                  Complete your purchase on the partner's website and enjoy your savings!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-blue-100 mb-6">
            Browse our latest deals and discover how much you can save today!
          </p>
          <a
            href="/best-deals-today"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Best Deals
          </a>
        </section>
      </div>
    </div>
  );
}