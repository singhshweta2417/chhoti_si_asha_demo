import { useState, useRef } from "react";

// ── Icons ──────────────────────────────
const ChevronDown = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const UserIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const HeartIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const CartIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const MenuIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const NAV_ITEMS = [
  { label: "Bags", children: ["Tote Bags", "Sling Bags", "Duffel Bags", "Gift and Utility Bags", "Laptop Bags", "Backpacks"] },
  { label: "Stationery", children: ["Diaries/Journals","Handcrafted Bookmarks","Document Holders/File Folders","Handcrafted Pencil tops","Handcrafted Pen Stands","Pencil/Brush Rolls","Pencil Pouches"] },
  { label: "Kids Corner", children: ["Story Books","Activity Kits","Soft Toys","Educational Toys"] },
  { label: "Home Decor", children: ["Wall Art","Cushion Covers","Table Runners","Candles & Holders","Planters"] },
  { label: "Gifting" },
  { label: "Festive Offers", children: ["Diwali Collection","Holi Specials","Christmas Gifts","New Year Bundles"] },
  { label: "Accessories", children: ["Keychains","Hair Accessories","Jewellery","Masks"] },
  { label: "Offers", children: ["Clearance Sale","Buy 2 Get 1","Bundle Deals"] },
  { label: "About Us", children: ["Our Story","Artisans","Sustainability","Contact Us"] },
];

function DropdownMenu({ items, visible }) {
  return (
    <div className={`absolute top-full left-0 bg-white min-w-[240px] shadow-lg border-t-2 border-green-800 py-3 z-50 transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
      {items.map((item) => (
        <a
          key={item}
          href="#"
          className="block px-6 py-2 text-sm text-gray-800 hover:text-green-800 hover:bg-green-50 transition-colors"
        >
          {item}
        </a>
      ))}
    </div>
  );
}

function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (i) => {
    clearTimeout(timeoutRef.current);
    setOpenIndex(i);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 font-serif">
      <div className="max-w-auto mx-auto px-6 flex items-center justify-between h-18">
        <a href="#" className="flex flex-col shrink-0">
          <span className="text-xs font-bold text-green-500">Choti si</span>
          <span className="text-xl font-bold text-green-800">ASHA</span>
        </a>
        <ul className="hidden md:flex items-center justify-center flex-1 gap-2 list-none">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className={`flex items-center gap-1 px-3 py-2 text-[13.5px] ${openIndex === i ? "text-green-800 border-b-2 border-green-800" : "text-gray-900 border-b-2 border-transparent"} transition-all`}
              >
                {item.label} {item.children && <ChevronDown />}
              </a>
              {item.children && <DropdownMenu items={item.children} visible={openIndex === i} />}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 shrink-0">
          {[SearchIcon, UserIcon, HeartIcon, CartIcon].map((Icon, i) => (
            <button key={i} className="p-1 text-gray-900 hover:text-green-800 transition-colors">
              <Icon />
            </button>
          ))}
          <button
            className="md:hidden p-1 text-gray-900 hover:text-green-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="bg-white border-t border-gray-200 py-3 md:hidden">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.label}>
              <div
                className="flex justify-between items-center px-6 py-2 text-sm text-gray-900 cursor-pointer"
                onClick={() => item.children ? setMobileExpanded(mobileExpanded === i ? null : i) : null}
              >
                <span>{item.label}</span>
                {item.children && <ChevronDown />}
              </div>
              {item.children && mobileExpanded === i && (
                <div className="bg-gray-50">
                  {item.children.map((child) => (
                    <a key={child} href="#" className="block px-10 py-1 text-gray-600 text-sm">
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;