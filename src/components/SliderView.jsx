import { useState, useEffect } from "react";

const slides = [
  {
    url: "https://static.vecteezy.com/system/resources/thumbnails/049/855/871/small/stunning-high-resolution-nature-and-landscape-backgrounds-breathtaking-scenery-in-hd-photo.jpg",
    alt: "Beautiful landscape 1"
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBqeYS1uuI390bRFD3bD893b2qFge0CO3Yg&s",
    alt: "Beautiful landscape 2"
  },
  {
    url: "https://static.vecteezy.com/system/resources/thumbnails/049/671/177/small/tiger-amazing-background-hd-wallpaper-photo.jpeg",
    alt: "Beautiful landscape 3"
  },
  {
    url: "https://static.vecteezy.com/system/resources/thumbnails/052/248/075/small/peacock-feather-wallpaper-hd-wallpaper-photo.jpeg",
    alt: "Beautiful landscape 4"
  }
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('right');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = 30; 
    const slideDuration = 3000; 
    
    const timer = setInterval(() => {
      setCurrent((prev) => {
        setDirection('right');
        setProgress(0);
        return (prev + 1) % slides.length;
      });
    }, slideDuration);
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (slideDuration / progressInterval));
      });
    }, progressInterval);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isAutoPlaying]);


  const goToSlide = (index) => {
    setDirection(index > current ? 'right' : 'left');
    setCurrent(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setDirection('right');
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div 
      className="relative w-full max-w-auto mx-auto overflow-hidden h-64 md:h-180 group"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        const slideClass = isActive 
          ? 'opacity-100 translate-x-0 z-10'
          : direction === 'right'
            ? 'opacity-0 -translate-x-full z-0'
            : 'opacity-0 translate-x-full z-0';

        return (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${slideClass}`}
          >
            <img 
              src={slide.url} 
              alt={slide.alt} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
          </div>
        );
      })}

    <div className="absolute bottom-50 left-60 z-20 max-w-xl text-white">
  
  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-bold mb-4">
    Discover Nature’s Beauty
  </h2>

  {/* Paragraph */}
  <p className="text-lg md:text-xl mb-6 text-white/90">
    Explore breathtaking landscapes and wildlife photography 
    captured in stunning high definition.
  </p>

  {/* Button */}
  <button
    className="bg-black text-white 
               px-8 py-4 text-lg 
               rounded-lg font-semibold 
               shadow-lg
               transition-all duration-300 
               transform hover:scale-105"
  >
    Shop Now
  </button>

     </div>
     
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
      {slides.map((_, idx) => {
  const isActive = idx === current;
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      key={idx}
      onClick={() => goToSlide(idx)}
      className="relative w-10 h-10 flex items-center justify-center"
    >
      {/* Progress Circle */}
      {isActive && (
        <svg className="absolute w-10 h-10 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#ffffff"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear"
          />
        </svg>
      )}

      {/* Inner Dot */}
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-white" : "bg-white/50"
        }`}
      />
    </button>
  );
})}
      </div>  
      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 p-3 border border-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-20 opacity-0 group-hover:opacity-100"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>   
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 p-3 border border-white/90  backdrop-blur-sm rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-20 opacity-0 group-hover:opacity-100"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Slider;