import { BeforeAfter } from "@/app/dashboard/form/_components/before-after";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Sparkles } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#120a07]">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-orange-700/20 to-transparent pointer-events-none" />

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl animate-float"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <header className="relative glass-card backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">AI Room Decor</h1>
          <div className="flex items-center gap-8">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#features"
                    className="text-orange-100/80 hover:text-orange-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-orange-100/80 hover:text-orange-400 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-orange-100/80 hover:text-orange-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        <section className="py-20">
          <div className="container mx-auto px-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                  Transform Your Space with{" "}
                  <span className="gradient-text">AI Magic</span>
                </h2>
                <p className="text-xl text-orange-100/80 mb-8 animate-fade-in-up animation-delay-200">
                  Experience the future of interior design. Upload your room
                  photo and watch as AI transforms it into your dream space in
                  seconds.
                </p>
                <div className="flex gap-4 animate-fade-in-up animation-delay-400">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none"
                    >
                      Try it Now <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 w-full animate-fade-in-up animation-delay-600">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-xl opacity-50 animate-glow" />
                  <BeforeAfter
                    beforeImage="/before.png"
                    afterImage="/after.png"
                    className="w-full rounded-xl shadow-2xl relative"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full">
                    <p className="text-sm font-medium text-orange-100/80">
                      ← Slide to compare →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="p-20 ">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose <span className="gradient-text">AI Room Decor</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Instant Results",
                  description: "Get your redesigned room in seconds, not days.",
                },
                {
                  icon: CheckCircle,
                  title: "Multiple Styles",
                  description:
                    "Choose from a variety of interior design styles.",
                },
                {
                  icon: Zap,
                  title: "Easy to Use",
                  description:
                    "Simple 3-step process: Upload, Choose, Generate.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl transition-all hover:scale-105 hover:bg-white/20"
                >
                  <feature.icon className="w-12 h-12 text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-orange-100/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 relative">
          <div className="absolute inset-0 bg-orange-950/30" />
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
              {[
                {
                  step: 1,
                  title: "Upload Your Room",
                  description:
                    "Take a photo of your room and upload it to our platform.",
                },
                {
                  step: 2,
                  title: "Choose Your Style",
                  description:
                    "Select from various interior design styles that suit your taste.",
                },
                {
                  step: 3,
                  title: "Generate New Design",
                  description:
                    "Our AI will redesign your room based on your chosen style.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl max-w-sm w-full text-center group hover:bg-white/20 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-orange-100/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-xl opacity-30 " />
                <div className="glass-card rounded-xl overflow-hidden relative">
                  <div className="px-6 py-8">
                    <h3 className="text-2xl font-semibold text-center mb-4 text-white">
                      Abhi decide nhi kiya
                    </h3>
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold text-white">
                        $ aap batao kitna de sakte ho
                      </span>
                      <span className="text-orange-100/80"> / design</span>
                    </div>
                    <ul className="mb-8">
                      <li className="flex items-center mb-2 text-orange-100/80">
                        <CheckCircle className="w-5 h-5 text-orange-400 mr-2" />
                        <span>High-quality AI-generated designs</span>
                      </li>
                      <li className="flex items-center mb-2 text-orange-100/80">
                        <CheckCircle className="w-5 h-5 text-orange-400 mr-2" />
                        <span>Multiple style options</span>
                      </li>
                      <li className="flex items-center text-orange-100/80">
                        <CheckCircle className="w-5 h-5 text-orange-400 mr-2" />
                        <span>Instant results</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      Start Designing
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative glass-card border-t border-white/10 text-orange-100/80 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 AI Room Decor. All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
