import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsCameraReels, BsBarChartLine, BsPeople } from "react-icons/bs";
import { FaChartPie, FaRegLightbulb } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { Lightbulb } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SocialLens
          </div>
          <div className="space-x-4">
            <Link href="/analysis" className="ml-auto">
              <div className="px-6 flex gap-2 py-3 text-lg font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md transition-all duration-200">
                <button className="">Insights Hub</button>

                <Lightbulb width={22} />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Elevate Your Social Media Strategy
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            SocialLens Analytics provides cutting-edge insights to boost your
            social media performance. Understand your audience, optimize your
            content, and stay ahead of the curve.
          </p>
          <button>
            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg"
            >
              Go to Dashboard {"->"}
            </Link>
          </button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<BsBarChartLine className="h-8 w-8 text-purple-400" />}
            title="Advanced Analytics"
            description="Dive deep into your social media performance with our comprehensive analytics tools."
          />
          <FeatureCard
            icon={<FaChartPie className="h-8 w-8 text-purple-400" />}
            title="Content Insights"
            description="Understand what content resonates with your audience and why."
          />
          <FeatureCard
            icon={<MdTrendingUp className="h-8 w-8 text-purple-400" />}
            title="Trend Forecasting"
            description="Stay ahead of the curve with our AI-powered trend prediction technology."
          />
        </section>

        <section className="bg-black/40 backdrop-blur-xl rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureListItem
              icon={<BsCameraReels className="h-6 w-6 text-purple-400" />}
              title="Reels Performance"
              description="Track and analyze the performance of your Reels to maximize engagement."
            />
            <FeatureListItem
              icon={<FaRegLightbulb className="h-6 w-6 text-purple-400" />}
              title="Content Recommendations"
              description="Get AI-powered suggestions for content that will resonate with your audience."
            />
            <FeatureListItem
              icon={<BsPeople className="h-6 w-6 text-purple-400" />}
              title="Audience Insights"
              description="Understand your followers better with detailed demographic and psychographic data."
            />
            <FeatureListItem
              icon={<MdTrendingUp className="h-6 w-6 text-purple-400" />}
              title="Competitor Analysis"
              description="Benchmark your performance against competitors and industry standards."
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Ready to Transform Your Social Media Strategy?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of social media professionals who are already
            leveraging SocialLens Analytics to drive their success.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg"
          >
            Start Your Free Trial
          </Button>
        </section>
      </main>

      <footer className="bg-black/40 backdrop-blur-xl mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-0">
            SocialLens
          </div>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 hover:shadow-purple-500/10 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function FeatureListItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
