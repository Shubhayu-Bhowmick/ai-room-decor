import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2B1710] p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Panel - Decorative */}
        <div className="relative hidden md:block bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-yellow-300/30 blur-md animate-float" />
            <div className="absolute top-[40%] right-[20%] w-32 h-32 rounded-full bg-orange-300/30 blur-md animate-float-delayed" />
            <div className="absolute bottom-[20%] left-[30%] w-40 h-40 rounded-full bg-yellow-400/20 blur-md animate-float" />
          </div>

          {/* Welcome Text */}
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-white mb-6">
              WEL
              <br />
              COME
            </h1>
            <p className="text-orange-50 text-lg">
              Transform your space with AI-powered interior design
            </p>
          </div>
        </div>

        {/* Right Panel - Sign In Form */}
        <div className="bg-white p-4 flex items-center">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-sm normal-case",
                card: "shadow-none p-8 bg-transparent",
                headerTitle: "text-[#2B1710]",
                headerSubtitle: "text-[#2B1710]/80",
                socialButtonsBlockButton: "border-gray-300 hover:bg-orange-50",
                socialButtonsBlockButtonText: "text-[#2B1710] font-normal",
                formFieldLabel: "text-[#2B1710]",
                formFieldInput:
                  "border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                footerActionLink: "text-orange-600 hover:text-orange-700",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
