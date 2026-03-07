import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#F5F5F5]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-300">
        
        {/* Our Store */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
            Our store
          </h4>
          <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
            Khudda Lahora house number 30,<br />
            Chandigarh, 160014
          </p>
          <p className="text-sm text-gray-600 font-light">+91-70095 44354</p>
          <p className="text-sm text-gray-600 font-light">info@chhotisiasha.org</p>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
            Information
          </h4>
          <ul className="space-y-3">
            {["About Us", "Contact us", "Testimonials", "Blog", "FAQs"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors duration-200 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
            Legal
          </h4>
          <ul className="space-y-3">
            {["Privacy Policy", "Terms & Conditions", "Shipping & Return Policy"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors duration-200 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
            Subscribe
          </h4>
          <p className="text-sm text-gray-600 font-light leading-relaxed mb-5">
            Enter your email below to be the first to know about new collections
            and product launches.
          </p>
          {subscribed ? (
            <p className="text-green-600 text-sm font-medium">
              ✓ Subscribed successfully!
            </p>
          ) : (
            <div className="flex items-center border border-gray-400 rounded bg-white overflow-hidden">
              <span className="pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                onClick={handleSubscribe}
                className="px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Payment Icons */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          {/* Amex */}
          <div className="h-7 w-11 bg-blue-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">AMEX</span>
          </div>
          {/* Apple Pay */}
          <div className="h-7 w-11 bg-black rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium"> Pay</span>
          </div>
          {/* Google Pay */}
          <div className="h-7 w-11 bg-white border border-gray-300 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-blue-500">G</span>
            <span className="text-xs font-bold text-red-500">P</span>
          </div>
          {/* Mastercard */}
          <div className="h-7 w-11 bg-white border border-gray-300 rounded flex items-center justify-center gap-0.5">
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-90"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-90 -ml-2"></div>
          </div>
          {/* ShopPay */}
          <div className="h-7 w-11 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">Shop</span>
          </div>
          {/* Visa */}
          <div className="h-7 w-11 bg-white border border-gray-300 rounded flex items-center justify-center">
            <span className="text-blue-800 text-xs font-extrabold italic">VISA</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 font-light text-center">
          © CHHOTI SI ASHA 2023 | Powered by Collabworks.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
            </svg>
          </a>
          {/* WhatsApp */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.57a.75.75 0 00.921.921l5.716-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.524-5.198-1.437l-.372-.221-3.853.991.993-3.734-.241-.386A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;