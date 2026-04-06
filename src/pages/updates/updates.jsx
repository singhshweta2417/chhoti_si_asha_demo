import { useState } from "react";

function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Subscribe */}
        <div className="flex-1 max-w-lg text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4 leading-snug">
            Get Latest Updates and Offers – Subscribe Now!
          </h2>
          <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed mb-8">
            Be the first to know about latest products, offers, events and more!
            Subscribe our newsletter to stay connected and informed.
          </p>

          {subscribed ? (
            <div className="text-green-600 font-medium text-sm border border-green-200 bg-green-50 rounded-lg px-4 py-3">
              ✓ Thank you for subscribing! We'll keep you updated.
            </div>
          ) : (
            <div className="flex items-stretch w-full max-w-md mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email address"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors duration-200"
              />
              <button
                onClick={handleSubscribe}
                className="bg-gray-900 text-white px-6 py-3 rounded-r-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>

        {/* Right: YouTube Embed */}
        <div className="flex-1 w-full max-w-xl">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/DCPajZ43Wxc"
              title="Disha 2.0 Promo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default SubscribeSection;