import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  { title: "Dari Weaving", img: "https://chhotisiasha.org/cdn/shop/files/IMG_1304_1024x1024_2x_a7e56d62-9da0-475d-be8d-5a95c7d6ff45.webp?v=1684569229&width=533" },
  { title: "Crochet", img: "https://chhotisiasha.org/cdn/shop/files/IMG_1494.jpg?v=1684569234&width=533" },
  { title: "Embroidery", img: "https://chhotisiasha.org/cdn/shop/files/IMG_6332.jpg?v=1684569240&width=533" },
  { title: "Bird Toran", img: "https://chhotisiasha.org/cdn/shop/products/Toran_2.jpg?v=1597992872&width=533" },
  { title: "Puppy Dog Cool-Peach", img: "https://chhotisiasha.org/cdn/shop/products/StuffToy-PuppyDogPeach2.jpg?v=1657693589&width=533" },
  { title: "Embroidered Diary - Black with Hearts", img: "https://chhotisiasha.org/cdn/shop/files/DiaryOpen_f8ec41bb-7ec7-4dd8-90e8-3d8be70b878e.jpg?v=1683532195&width=533" },
];

function OurHandicrafts() {
  const itemsPerView = 4;
  const sliderRef = useRef(null);

  // clone first 4 items
  const extendedItems = [...items, ...items.slice(0, itemsPerView)];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Reset without jump effect
  useEffect(() => {
    if (current === items.length) {
      setTimeout(() => {
        sliderRef.current.style.transition = "none";
        setCurrent(0);
      }, 700);
    } else {
      sliderRef.current.style.transition =
        "transform 0.7s ease-in-out";
    }
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current === 0) {
      setCurrent(items.length - 1);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className="md:w-full md:py-16 bg-white">

      {/* Header */}
      <div className="flex justify-between items-center md:px-12 mb-10">
        <h2 className="md:text-3xl font-semibold">Our Handicrafts</h2>

        <div className="flex gap-4">
          <button onClick={prevSlide}>
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      
<div className="overflow-hidden px-6">
  <div
    ref={sliderRef}
    className="flex gap-4" 
    style={{
      transform: `translateX(-${current * 25}%)`,
    }}
  >
    {extendedItems.map((item, index) => (
      <div
        key={index}
        className="md:w-1/4 flex-shrink-0"
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-64 object-cover rounded-lg transform transition duration-300 ease-in-out hover:scale-105"
        />
        <p className="mt-4 text-center">{item.title}</p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}

export default OurHandicrafts;