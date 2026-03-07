import { useState } from "react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    text: "WONDRBOX has been privileged to utilize the creative minds and craft skills of the 'Choti Si Aasha' group. A small purchase will be a step forward to encouraging skillful ladies and uplifting the lives of local artisans.",
    author: "Neha",
  },
  {
    text: "CSA is creating an army of empowered women and we at dwij, are very proud to be associated with them. The quality of their products is top-notch and the delivery seamless. I would highly recommend you to consider them for your gifting needs.",
    author: "Dwij",
  },
  {
    text: "You guys have always been great. It's such a wonderful experience working with you guys.",
    author: "Geet",
  },
  {
    text: "The craftsmanship is beyond amazing. Each product tells a story and the artisans pour their heart into every piece. I am a lifelong customer now!",
    author: "Priya",
  },
  {
    text: "Absolutely love what CSA is doing for women empowerment. The products are beautiful and every purchase feels meaningful.",
    author: "Rahul",
  },
];

function TestimonialCard({ text, author, active }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 flex flex-col justify-between min-h-48 transition-all duration-300 ${active
          ? "shadow-2xl scale-105 opacity-100"
          : "shadow-md scale-95 opacity-50"
        }`}
    >
      <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center italic">
        "{text}"
      </p>
      <p className="text-center mt-5 font-semibold text-gray-900 text-sm tracking-wide">
        — {author}
      </p>
    </div>
  );
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(1);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const left = (current - 1 + total) % total;
  const right = (current + 1) % total;

  return (
    <div className="bg-[#F5F5F5] py-14 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
        Our Happy Customers
      </h2>
      <p className="font-light text-gray-500 md:max-w-xl mx-auto text-sm leading-relaxed mb-10">
        Discover what our satisfied clients have to say about their experience
        with us. Join our community of happy customers today!
      </p>

      {/* Carousel Row */}
      <div className="flex items-center justify-center gap-2 md:gap-4 md:max-w-[64rem] mx-auto">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-gray-900 text-gray-900 flex items-center justify-center text-base flex-shrink-0 hover:bg-gray-900 hover:text-white transition-colors duration-200"
          aria-label="Previous"
        >
          ←
        </button>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-4 flex-1">
          <TestimonialCard
            text={testimonials[left].text}
            author={testimonials[left].author}
            active={false}
          />
          <TestimonialCard
            text={testimonials[current].text}
            author={testimonials[current].author}
            active={true}
          />
          <TestimonialCard
            text={testimonials[right].text}
            author={testimonials[right].author}
            active={false}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-gray-900 text-gray-900 flex items-center justify-center text-base flex-shrink-0 hover:bg-gray-900 hover:text-white transition-colors duration-200"
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full border-0 cursor-pointer transition-all duration-300 ${i === current ? "w-6 bg-gray-900" : "w-2 bg-gray-400"
              }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const imageFree =
  "https://chhotisiasha.org/cdn/shop/files/Jaswinder_1.jpg?v=1683800866&width=940";

function TalesEmpowerment() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-[#F5F5F5] flex flex-wrap items-center justify-center gap-8 px-8 py-12">
        <img
          src={imageFree}
          alt="Tales of Empowerment"
          className="w-48 md:w-72 lg:w-80 rounded-xl shadow-lg object-cover"
        />
        <div className="max-w-lg text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            Tales of Empowerment
          </h2>
          <p className="text-justify font-light text-gray-600 leading-relaxed mb-6">
            Jaswinder Aunty might be the oldest here at Chhoti Si Asha but
            surely has the youngest heart. Her incredible sense of design,
            technicalities &amp; curiosity is something which makes our products
            standout. Not only is she educated but is also vocal about her views
            on women empowerment. Fellow artists fondly call her "Dimag wali
            aunty".
          </p>
          <button
           onClick={() => navigate("/our_people")}
          className="h-12 w-40 bg-gray-900 text-white rounded-lg mx-auto flex items-center justify-center hover:scale-105 transition-transform duration-300">
            Read more
          </button>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="bg-white text-center py-8">
        <p className="text-xl font-medium text-gray-800">Instagram</p>
        <button className="h-12 w-40 border-2 border-gray-900 text-gray-900 rounded-lg mx-auto mt-4 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-300">
          Follow us
        </button>
      </div>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />
    </div>
  );
}

export default TalesEmpowerment;