import { useState } from "react";

const artisans = [
  {
    id: 1,
    name: "Sunita Devi",
    age: 38,
    craft: "Embroidery",
    years: "12 saal ka anubhav",
    story: "Sunita ne apni beti ki padhai ke liye kadhna seekha. Aaj woh 8 mahilaon ko sikhati hain.",
    img: "https://chhotisiasha.org/cdn/shop/files/1_b7dd048f-0561-4add-a0e6-570ce37f7f86.png?v=1683707240&width=533",
  },
  {
    id: 2,
    name: "Kamla Bai",
    age: 55,
    craft: "Crochet",
    years: "20 saal ka anubhav",
    story: "Kamla ji ke haath ki bunai mein unki zindagi ki kahani chupi hai — ek dhaga, ek sapna.",
    img: "https://chhotisiasha.org/cdn/shop/files/2_79c996a1-f636-4ea8-b112-b929bba3c743.png?v=1683707240&width=533",
  },
  {
    id: 3,
    name: "Rekha Sharma",
    age: 32,
    craft: "Weaving",
    years: "8 saal ka anubhav",
    story: "Project Sakhi ke zariye Rekha ne apni pehli kamai ki. Ab woh 5 nai sakhiyon ki mentor hain.",
    img: "https://chhotisiasha.org/cdn/shop/files/3_a6c3806e-d781-4924-819b-e873fd808f6b.png?v=1683707240&width=533",
  },
  {
    id: 4,
    name: "Geeta Kumari",
    age: 44,
    craft: "Stitching",
    years: "15 saal ka anubhav",
    story: "Geeta ka sapna tha apna kaam, apni pehchaan. Chhoti Si Asha ne woh sapna sach kar diya.",
    img: "https://chhotisiasha.org/cdn/shop/files/4_b08b2726-d665-4e70-9bca-60aae423cb49.png?v=1683707238&width=533",
  },
  {
    id: 5,
    name: "Parveen Akhtar",
    age: 29,
    craft: "Quilting",
    years: "6 saal ka anubhav",
    story: "Parveen ke liye yeh sirf kaam nahi — yeh azaadi hai. Ghar se kaam karke woh apne bachon ke saath bhi hain.",
    img: "https://chhotisiasha.org/cdn/shop/files/5_ea502bf8-2b1d-4ce9-9dbc-88fae24a7a5c.png?v=1683707239&width=720",
  },
  {
    id: 6,
    name: "Savitri Ben",
    age: 47,
    craft: "Block Printing",
    years: "10 saal ka anubhav",
    story: "Savitri ki har print mein ek gaon ki yaad hai. Woh apni daadi ki sikhaayi ko zinda rakhti hain.",
    img: "https://chhotisiasha.org/cdn/shop/files/6_aa98b185-cc93-473a-8876-01ecd328e9d7.png?v=1683707239&width=940",
  },
  {
    id: 7,
    name: "Meena Devi",
    age: 36,
    craft: "Embroidery",
    years: "9 saal ka anubhav",
    story: "Meena Hamara Bank ki founding member hain — woh maanti hain ki auratein milkar sab badal sakti hain.",
    img: "https://chhotisiasha.org/cdn/shop/files/Chhoti_Si_Asha.png?v=1683707782",
  },
  {
    id: 8,
    name: "Asha Rani",
    age: 52,
    craft: "Crochet & Weaving",
    years: "17 saal ka anubhav",
    story: "Asha — naam bhi, kaam bhi. Inhone hi Chhoti Si Asha ko uska pehla design diya tha.",
    img: "https://chhotisiasha.org/cdn/shop/files/1_b7dd048f-0561-4add-a0e6-570ce37f7f86.png?v=1683707240&width=533",
  },
];

function BagsScreen() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const openLightbox = (index) => setSelected(index);
  const closeLightbox = () => setSelected(null);

  const goPrev = () =>
    setSelected((prev) => (prev === 0 ? artisans.length - 1 : prev - 1));

  const goNext = () =>
    setSelected((prev) => (prev === artisans.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 gap-10 py-16">
      {/* Grid Heading */}
      <h2 className="md:text-4xl text-gray-900 mb-4" style={{ fontFamily: "Ovo" }}>
        Humlog @CSA
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] max-w-6xl mx-auto">
        {artisans.map((a, index) => (
          <div
            key={a.id}
            onClick={() => openLightbox(index)}
            className={`bg-white overflow-hidden cursor-pointer transition-all duration-300 ${
              hovered === a.id ? "scale-[1.02] shadow-2xl z-10 relative" : ""
            }`}
            onMouseEnter={() => setHovered(a.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={a.img}
                alt={a.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  hovered === a.id ? "scale-105 grayscale-0" : "grayscale"
                }`}
              />
              {/* Story Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  hovered === a.id ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-xs leading-relaxed italic" style={{ fontFamily: "Ovo" }}>
                    "{a.story}"
                  </p>
                </div>
              </div>
            </div>
            {/* Info */}
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-[10px] tracking-[3px] uppercase text-gray-400 mb-1">{a.craft}</p>
              <h3 className="text-base font-normal text-gray-900 mb-1" style={{ fontFamily: "Ovo" }}>{a.name}</h3>
              <p className="text-xs text-gray-400">{a.years}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={closeLightbox}
        >
          {/* Counter top-left */}
          <div className="absolute top-5 left-6 text-white text-sm tracking-widest">
            {selected + 1} / {artisans.length}
          </div>

          {/* Title top-center */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-sm tracking-[3px] uppercase">
            Humlog @CSA
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-5 text-white text-2xl leading-none hover:opacity-70 transition-opacity"
            onClick={closeLightbox}
          >
            ✕
          </button>

          {/* Prev Arrow */}
          <button
            className="absolute left-4 text-white text-5xl hover:opacity-70 transition-opacity z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            ‹
          </button>

          {/* Main Image */}
          <div
            className="relative mx-16 max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={artisans[selected].img}
              alt={artisans[selected].name}
              className="max-h-[80vh] max-w-[90vw] md:max-w-[50vw] object-contain grayscale"
            />
            {/* Name tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-yellow-400 px-3 py-2 rounded">
              <span className="text-lg">🌱</span>
              <span className="font-semibold text-gray-900 text-base" style={{ fontFamily: "Ovo" }}>
                {artisans[selected].name}, {artisans[selected].age}
              </span>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            className="absolute right-4 text-white text-5xl hover:opacity-70 transition-opacity z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            ›
          </button>
        </div>
      )}

    </div>
  );
}

export default BagsScreen;