import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const ITEMS_PER_VIEW = 4;

function GameCard({ game }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 flex flex-col px-2"
      style={{ width: `${100 / ITEMS_PER_VIEW}%` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-100 rounded-xl" style={{ aspectRatio: "3/4" }}>
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Game"; }}
        />

        {/* Trending Badge */}
        {game.trending && (
          <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow ${game.trending === "Hot" ? "bg-red-500" : "bg-green-600"}`}>
            {game.trending}
          </span>
        )}

        {/* Hover Play Button */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <button className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="text-sm text-gray-800 font-medium line-clamp-1 leading-snug hover:text-black transition-colors cursor-pointer">
          {game.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5 capitalize">{game.route}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 flex flex-col px-2 animate-pulse" style={{ width: `${100 / ITEMS_PER_VIEW}%` }}>
      <div className="bg-gray-200 rounded-xl" style={{ aspectRatio: "3/4" }} />
      <div className="mt-3 space-y-2 px-0.5">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("https://16games.codescarts.com/api/games_list");
        if (res.data.success) {
          setGames(res.data.data);
          setOffset(res.data.data.length); 
        } else {
          setError("Failed to load games.");
        }
      } catch {
        setError("Could not connect to server.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const loopedGames = games.length > 0 ? [...games, ...games, ...games] : [];

  const slide = (dir) => {
    if (animating || games.length === 0) return;
    setAnimating(true);
    setOffset((prev) => prev + dir);
    setTimeout(() => {
      setOffset((prev) => {
        if (prev >= games.length * 2) return games.length;
        if (prev < 0) return games.length - 1;
        return prev;
      });
      setAnimating(false);
    }, 420);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold italic tracking-wide text-gray-900">All Games</h2>
        <p className="text-sm text-gray-400 mt-2 font-light">Pick your game and start playing</p>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 text-sm py-10">{error}</div>
      )}

      {/* Carousel */}
      {!error && (
        <div className="relative">
          <button
            onClick={() => slide(-1)}
            disabled={loading}
            className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            {loading ? (
              // Skeleton Loading
              <div className="flex">
                {[...Array(ITEMS_PER_VIEW)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div
                className="flex"
                style={{
                  transform: `translateX(-${offset * (100 / ITEMS_PER_VIEW)}%)`,
                  transition: animating ? "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                }}
              >
                {loopedGames.map((game, i) => (
                  <GameCard key={`${game.id}-${i}`} game={game} />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => slide(1)}
            disabled={loading}
            className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* View All */}
      {!loading && !error && (
        <div className="flex justify-center mt-8">
          <button className="border border-gray-900 text-gray-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-300">
            View All Games
          </button>
        </div>
      )}
    </div>
  );
}

export default GamesList;