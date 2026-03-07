import { useNavigate } from "react-router-dom";
function PhilosphyIntro() {
  const navigate = useNavigate();
  const imageFree = "https://chhotisiasha.org/cdn/shop/files/Our_Philosophy_3.jpg?v=1683773690&width=940";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-8 md:px-16 gap-10 py-16 bg-[#F5F5F5]">

      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={imageFree}
          alt="Our Philosophy"
          className="w-64 md:w-96 lg:w-[420px] rounded-2xl shadow-xl object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="max-w-xl flex flex-col items-center md:items-start text-center md:text-left gap-5">

        {/* Eyebrow label */}
        <span className="text-xs tracking-[0.25em] uppercase text-green-700 font-semibold">
          Who We Are
        </span>

        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Our{" "}
          <span className="italic font-light text-green-700">Philosophy</span>
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 w-full md:justify-start justify-center">
          <div className="h-px w-10 bg-green-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
          <div className="h-px w-10 bg-green-600" />
        </div>

        {/* Body text */}
        <p className="text-gray-600 font-light leading-[1.85] text-sm md:text-base text-justify">
          Our mission at{" "}
          <span className="font-medium text-gray-800">Chhoti Si Asha</span>{" "}
          is to create indigenous handicrafts-based livelihoods for women artisans. Each handmade item is a unique masterpiece, crafted with love and care using traditional techniques.
        </p>
        <p className="text-gray-600 font-light leading-[1.85] text-sm md:text-base text-justify">
          From colorful bags to home decoration accessories, our products are a testament to the skill and creativity of our artisans. We strive to be a socially responsible business that not only creates beautiful products but also makes a positive impact on the lives of our artisans and the communities in which we operate.
        </p>

        {/* CTA */}
        <button
        onClick={() => navigate("/about_us")}
        className="mt-2 h-12 px-8 bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors duration-300 hover:scale-105 transform">
          Read More
        </button>
      </div>

    </div>
  );
}

export default PhilosphyIntro;