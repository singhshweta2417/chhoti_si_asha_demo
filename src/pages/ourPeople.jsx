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

function OurPeople() {
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

      {/* Top Intro */}
      <div className="max-w-full flex flex-col items-center text-center gap-5">
        <span className="md:text-4xl text-black" style={{ fontFamily: "Ovo" }}>
          Hum Log | People & Stories of Chhoti Si Asha
        </span>
        <p className="md:text-2sm text-gray-800 font-light leading-[1.8]" style={{ fontFamily: "Ovo" }}>
          Welcome to our team of creative minds, a diverse and talented group of local artisans,
          photographers, and designers who work closely with traditional crafts to create beautiful handicraft products.
          Our team is built on a foundation of collaboration, brainstorming, and open communication,
          and we are committed to bringing a unique mix of desi and modern design to our customers.
        </p>
        <span className="md:text-3sm text-gray-800 font-light leading-[1.8]" style={{ fontFamily: "Ovo" }}>
          At the heart of our team is a passion for traditional crafts and the desire to preserve these techniques for
          future generations. Our team of skilled artisans brings a wealth of knowledge and expertise to the table,
          and we work closely with them to develop new and innovative designs that incorporate traditional techniques
          with modern styles.
        </span>
        <span className="md:text-3sm text-gray-800 font-light leading-[1.8]" style={{ fontFamily: "Ovo" }}>
          Central to our team's success is our collaborative approach.
          We believe that by working together and sharing our ideas,
          we can create something truly special. Our team members come from a variety of backgrounds and
          bring a diverse range of skills and experiences to the table. We believe that this diversity is
          our strength and helps us to create truly unique and innovative products.
          We are proud to be a mix of desi and modern, and
          we believe that this fusion of traditional and contemporary styles is what sets us apart.
          Our team is always exploring new ideas and experimenting with different techniques to create beautiful
          and unique handicraft products that reflect our cultural heritage while also embracing modern design.
        </span>
      </div>

      {/* Liza */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full" style={{ fontFamily: "Ovo" }}>
        <div className="flex-shrink-0">
          <img src="https://chhotisiasha.org/cdn/shop/files/1_f45bccf0-3ae7-4bf3-b8eb-aeaf3af22061.png?v=1683708298&width=533" alt="craft" className="lg:w-[328px] md:h-[510px] object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="md:text-5xl text-gray-900 mb-4">Liza</h2>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            Liza has been an IT professional in her first avatar – working both in India and
            Silicon Valley with Fortune 500 companies including Johnson & Johnson and Siebel Systems.
            She and her husband quit their corporate jobs in 2005 and relocated from California to India to do things "closer to their heart".
            Chhoti Si Asha was incepted in 2006 and entitized in 2009 as a non-profit with
            the objective to build sustainable livelihoods for underprivileged women living in slum communities of Chandigarh.
          </p>
        </div>
      </div>

      {/* Jatinder */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full" style={{ fontFamily: "Ovo" }}>
        <div className="flex flex-col items-start">
          <h2 className="md:text-5xl text-gray-900 mb-4">Jatinder</h2>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            Jatinder is an Assistant Professor at the Panjab University's department of Laws and
            also a passionate Co-Founder at CSA. Jatinder arrived in Chandigarh from Barnala in
            Punjab as a young student with satiable curiosity and has been working with CSA since
            the Non Profit was initiated as a hub for empowering migrant artisans and families.
            Jatinder has a passion for working in this sector and has played a pivotal role in
            the agencies coming of age. Jatinder is selfless, self effacing, hardworking,
            industrious person who is loved and appreciated at the agency by the participants,
            stakeholders and fellow colleagues. Jatinder designs training programs for Interns,
            students doing fieldwork, manages projects and is at the helm of affairs.
          </p>
        </div>
        <div className="flex-shrink-0">
          <img src="https://chhotisiasha.org/cdn/shop/files/2_0c721ed5-2154-46f5-ad3a-0a083b9f086c.png?v=1683708297&width=533" alt="craft" className="lg:w-[328px] md:h-[510px] object-cover" />
        </div>
      </div>

      {/* Swaran */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full" style={{ fontFamily: "Ovo" }}>
        <div className="flex-shrink-0">
          <img src="https://chhotisiasha.org/cdn/shop/files/5_8a7ace72-0d47-4372-a635-8c348afa0a14.png?v=1683708297&width=533" alt="craft" className="lg:w-[328px] md:h-[510px] object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="md:text-5xl text-gray-900 mb-4">Swaran Didi | Artisan</h2>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            Swaran didi, with a smiling face she always keeps her team members and
            people around her joyful. She has the ability to empower other ladies who
            come to work at Chhoti Si Asha. She came all her way from Rajpura to settle
            here in Chandigarh when she started working with us. She picked up the craft of
            bag-making quickly. She is an extremely fast learner and is quite motivated.
            She also started a small team in her village Mohe. The members of the village make
            daris and do phulkari work.
          </p>
        </div>
      </div>

      {/* Jaswinder */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full" style={{ fontFamily: "Ovo" }}>
        <div className="flex flex-col items-start">
          <h2 className="md:text-5xl text-gray-900 mb-4">Jaswinder Aunty | Artisan</h2>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            She might be the oldest here at Chhoti Si Asha but surely has the youngest heart.
            Her incredible sense of design, technicalities & curiosity is something which makes our products standout.
            Not only is she educated but is also vocal about her views on women empowerment.
          </p>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            Fellow artists fondly call her <span className="italic font-semibold">"Dimag wali aunty".</span>
          </p>
        </div>
        <div className="flex-shrink-0">
          <img src="https://chhotisiasha.org/cdn/shop/files/4_695387e1-d34d-4047-b7cb-25ea65f3f93a.png?v=1683708298&width=533" alt="craft" className="lg:w-[328px] md:h-[510px] object-cover" />
        </div>
      </div>

      {/* Manju */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full" style={{ fontFamily: "Ovo" }}>
        <div className="flex-shrink-0">
          <img src="https://chhotisiasha.org/cdn/shop/files/3_6035da15-ed90-4720-a33f-6cc7363baa69.png?v=1683708297&width=533" alt="craft" className="lg:w-[328px] md:h-[450px] object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="md:text-5xl text-gray-900 mb-4">Manju Didi | Artisan</h2>
          <p className="text-gray-700 leading-7 mb-4 text-sm md:text-base">
            Her big red bindi, a wrist full of colorful bangles, magical & unapologetic
            smile-a face & laugh you'll surely never miss. She is one of the oldest members
            of our CSA family and is known for her outspoken, vibrant & magnetic personality.
            Her sheer presence can light up the energy of the room. She is one brave woman and
            has a beautiful voice. Did we tell you she loves to sing folk songs?
          </p>
        </div>
      </div>

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

export default OurPeople;