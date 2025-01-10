import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsCameraReels, BsBarChartLine, BsPeople } from "react-icons/bs";
import { FaChartPie, FaRegLightbulb } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { Lightbulb } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const developers = [
    {
      name: "Rohan Sharma",
      role: "Founding Engineer",
      company: "Rappo",
      linkedin: "https://www.linkedin.com/in/rohansx/",
      img: "https://media.licdn.com/dms/image/v2/D5603AQFPi6prxvqIaQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731137766252?e=1741824000&v=beta&t=udmU_vTO1UPREEjgZKO-SEKg6mbMD72yB7PNGMs0dX4",
      github: "https://github.com/rohansx",
    },
    {
      name: "Haider Patanwala",
      role: "Associate Application Engineer",
      company: "Surfboard Ventures",
      linkedin: "https://www.linkedin.com/in/haiderpatan/",
      img: "https://media.licdn.com/dms/image/v2/D4D03AQHZhqmis-ck6g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702198977438?e=1741824000&v=beta&t=8lt_A52b1zhdNDpca9CiA1H0wUhXS31FqKigK6r6efE",
      github: "https://github.com/haider-patanwala",
    },
    {
      name: "Chetan Divekar",
      role: "Associate Application Engineer",
      company: "Surfboard Ventures",
      linkedin: "https://www.linkedin.com/in/chetan-divekar/",
      img: "https://media.licdn.com/dms/image/v2/D4D03AQE_eLYYuuciDg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1664886766009?e=1741824000&v=beta&t=Mt_sB40rcWmCqCXqSQZ_v47_aedDQoqL8Ph-uadv2zY",
      github: "https://www.github.com/chetandivekar",
    },
    {
      name: "Nilesh Kapri",
      role: "Associate Application Engineer",
      company: "Raw Engineering",
      linkedin: "https://www.linkedin.com/in/nilesh-kapri/",
      img: "https://media.licdn.com/dms/image/v2/D4D03AQHdg17w8iqEGQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726173239533?e=1741824000&v=beta&t=0856RIBPR_ukJ_uj9Y-0lKlpbuvoECXbZncILs3_vG0",
      github: "https://github.com/itsKapri",
    },
  ];
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

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Meet the Developers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((developer) => {
              return (
                <DeveloperCard
                  key={developer.name} // It's important to add a key when mapping over a list
                  name={developer.name}
                  role={developer.role}
                  image={developer.img}
                  linkedin={developer.linkedin}
                  github={developer.github}
                  company={developer.company}
                />
              );
            })}
          </div>
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

function DeveloperCard({
  name,
  role,
  image,
  github,
  linkedin,
  company,
}: {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  company: string;
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 hover:shadow-purple-500/10 transition-all duration-300 flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name}, ${role}`}
        width={120}
        height={120}
        className="rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold mb-1 text-white">{name}</h3>
      <p className="text-purple-400 mb-2">{role}</p>
      <p className="text-gray-300 mb-4 text-sm">@{company} </p>{" "}
      {/* Company name display */}
      <div className="flex space-x-4">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-all duration-300"
        >
          GitHub
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-all duration-300"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
