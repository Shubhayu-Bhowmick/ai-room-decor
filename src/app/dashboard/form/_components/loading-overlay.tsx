export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-md w-full">
        <svg
          className="w-32 h-32 mb-6"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10 L90 50 L80 50 L80 90 L20 90 L20 50 L10 50 Z"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 300"
              to="300 300"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <rect x="35" y="60" width="15" height="30" fill="#8B5CF6">
            <animate
              attributeName="height"
              from="0"
              to="30"
              dur="1s"
              begin="1s"
              fill="freeze"
            />
          </rect>
          <circle cx="70" cy="40" r="8" fill="#8B5CF6">
            <animate
              attributeName="r"
              from="0"
              to="8"
              dur="0.5s"
              begin="1.5s"
              fill="freeze"
            />
          </circle>
        </svg>
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          AI Magic in Progress
        </h2>
        <p className="text-lg text-gray-700 text-center mb-4">
          We&apos;re reimagining your space with cutting-edge AI. This might
          take a moment...
        </p>
        <div className="flex space-x-2">
          <div
            className="w-3 h-3 rounded-full bg-orange-600 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-orange-600 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-orange-600 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
