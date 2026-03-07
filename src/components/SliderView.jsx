import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Slider() {
  // ✅ STEP 1: State banao — slides aur loading ke liye
  const [slides, setSlides] = useState([]);
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);
  const DURATION = 5000;

  // ✅ STEP 2: useEffect me API call — [] matlab sirf component mount hone par ek baar
  useEffect(() => {
    axios
      .get("https://16games.codescarts.com/api/slidersAnnouncements")
      .then((res) => {
        // ✅ STEP 3: Response ka sahi path — res.data.data.sliders
        // res           = axios wrapper
        // res.data      = { success, message, data }
        // res.data.data = { sliders: [...], announcement: {...} }
        setSlides(res.data.data.sliders);
        setAnnouncement(res.data.data.announcement);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Slides load nahi ho sake.");
        setLoading(false);
      });
  }, []); // ← empty array = sirf ek baar chalega

  const goTo = useCallback(
    (index) => {
      if (animating || index === current || slides.length === 0) return;
      setPrevIndex(current);
      setAnimating(true);
      setCurrent(index);
      setProgress(0);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating, current, slides.length]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length]
  );

  // Auto-play — slides load hone ke baad hi chalega
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(next, DURATION);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  // Progress bar
  useEffect(() => {
    if (slides.length === 0) return;
    setProgress(0);
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed < DURATION) requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [current, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [next, prev]);

  // ✅ Loading state
  if (loading) {
    return (
      <div
        className="relative w-full flex items-center justify-center bg-black"
        style={{ height: "100svh", maxHeight: "720px", minHeight: "360px" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/50 text-sm tracking-widest uppercase">Loading...</span>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div
        className="relative w-full flex items-center justify-center bg-black"
        style={{ height: "100svh", maxHeight: "720px", minHeight: "360px" }}
      >
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  // ✅ No slides
  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-black group"
      style={{ height: "100svh", maxHeight: "720px", minHeight: "360px" }}
    >
      {/* ✅ STEP 4: API data se slides render karo */}
      {/* slide.image   = image URL (API field)       */}
      {/* slide.title   = heading text (API field)    */}
      {/* slide.description = subtext (API field)     */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prevIndex;
        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 10 : isPrev ? 5 : 0,
              transform: isActive ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* ✅ slide.image — API se aaya image URL */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </div>
        );
      })}

      {/* Announcement Banner — API se aaya */}
      {announcement && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-sm border-b border-white/10 px-6 py-2 flex items-center gap-3">
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase shrink-0">
            {announcement.title}
          </span>
          <span className="text-white/70 text-xs truncate">{announcement.content}</span>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-20 px-6 sm:px-10 md:px-16 lg:px-24">
        {/* Slide number badge */}
        <div className="mb-3 md:mb-4">
          <span className="inline-block border border-white/50 text-white/80 text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full backdrop-blur-sm">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ✅ slide.title — API se aaya title */}
        <h1
          className="text-white font-bold leading-none mb-3 md:mb-5"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
            fontFamily: "'Georgia', serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            letterSpacing: "-0.02em",
          }}
        >
          {slides[current]?.title}
        </h1>

        {/* ✅ slide.description — API se aaya description */}
        <p
          className="text-white/75 mb-6 md:mb-8 max-w-sm md:max-w-md"
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            fontFamily: "sans-serif",
            fontWeight: 300,
            lineHeight: 1.65,
          }}
        >
          {slides[current]?.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-xl">
            Shop Now
          </button>
          <button className="text-white/80 text-sm tracking-wide flex items-center gap-2 hover:text-white transition-colors duration-200">
            Explore
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute z-20 right-6 sm:right-10 md:right-12 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col items-center gap-3 md:gap-4">
        {slides.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative flex items-center justify-center"
              style={{ width: 32, height: 32 }}
              aria-label={`Slide ${i + 1}`}
            >
              {isActive && (
                <svg className="absolute w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="11" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
                  <circle
                    cx="16" cy="16" r="11"
                    stroke="white" strokeWidth="2" fill="none"
                    strokeDasharray={2 * Math.PI * 11}
                    strokeDashoffset={2 * Math.PI * 11 * (1 - progress / 100)}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>
              )}
              <div className={`rounded-full transition-all duration-300 ${isActive ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
            </button>
          );
        })}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-16 md:right-24 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 z-30 bg-white/10">
        <div className="h-full bg-white/60 transition-none" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default Slider;