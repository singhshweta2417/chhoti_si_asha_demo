import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

// ── Icons ──────────────────────────────
const ChevronDown = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const HeartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const MenuIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const EyeIcon = ({ show }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
    )}
  </svg>
);

const NAV_ITEMS = [
  { label: "Bags", children: [] },
  { label: "Stationery", children: ["Diaries/Journals", "Handcrafted Bookmarks", "Document Holders/File Folders", "Handcrafted Pencil tops", "Handcrafted Pen Stands", "Pencil/Brush Rolls", "Pencil Pouches"] },
  { label: "Kids Corner", children: [] },
  { label: "Home Decor", children: ["Wall Art", "Cushion Covers", "Table Runners", "Candles & Holders", "Planters"] },
  { label: "Gifting" },
  { label: "Festive Offers", children: ["Diwali Collection", "Holi Specials", "Christmas Gifts", "New Year Bundles"] },
  { label: "Accessories", children: ["Keychains", "Hair Accessories", "Jewellery", "Masks"] },
  { label: "Offers", children: ["Clearance Sale", "Buy 2 Get 1", "Bundle Deals"] },
  { label: "About Us", children: ["Our Story", "Artisans", "Sustainability", "Contact Us"] },
];

function DropdownMenu({ items, visible }) {
  return (
    <div
      className={`absolute top-full left-0 bg-white min-w-[220px] shadow-lg border-t-2 border-green-800 py-3 z-50 transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
    >
      {/* ✅ items = string array jo NAV_ITEMS ya API se Navbar ne pass kiya */}
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

// ── Login Popup ──────────────────────────────
function LoginPopup({ onClose, onAuthSuccess, onGoogleLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    countryCode: "91",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
  });
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post("https://16games.codescarts.com/api/login", {
          country_code: form.countryCode,
          identity: form.phone,
          password: form.password,
        });
        if(res.data.success){
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          onAuthSuccess(res.data.data.user);
          onClose();
        }
      } else {
        const res = await axios.post("https://16games.codescarts.com/api/register", {
          country_code: form.countryCode,
          mobile: form.phone,
          email: form.email,
          password: form.password,
          confirm_password: form.confirmPassword,
          invite_code: form.inviteCode,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          onAuthSuccess(res.data.data.user);
          onClose();
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all";
  const labelClass =
    "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" />
      <div
        ref={popupRef}
        className="fixed z-50 bg-white shadow-2xl overflow-y-auto"
        style={{
          top: "72px",
          right: "16px",
          width: "min(360px, calc(100vw - 32px))",
          maxHeight: "calc(100vh - 88px)",
          borderTop: "3px solid #010c06",
          borderRadius: "0 0 12px 12px",
          animation: "slideDown 0.2s ease",
        }}
      >
        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-600 font-semibold tracking-wider uppercase">Choti si</p>
            <h2 className="text-lg font-bold text-black font-serif leading-tight">
              {isLogin ? "Welcome back" : "Create Account"}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <CloseIcon />
          </button>
        </div>

        <div className="flex border-b border-gray-100">
          {["Login", "Sign Up"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => { setIsLogin(i === 0); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-all ${(isLogin ? i === 0 : i === 1)
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>Mobile Number</label>
            <div className="flex gap-2">
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">+</span>
                <input
                  type="text"
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className="w-16 border border-gray-200 rounded-lg pl-5 pr-2 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="91"
                />
              </div>
              <input
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`flex-1 ${inputClass}`}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" placeholder="you@email.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass} required />
            </div>
          )}

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputClass} pr-10`} required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeIcon show={showPass} />
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPass ? "text" : "password"} placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className={`${inputClass} pr-10`} required />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon show={showConfirmPass} />
                </button>
              </div>
            </div>
          )}

          {!isLogin && (
            <div>
              <label className={labelClass}>
                Invite Code{" "}
                <span className="normal-case font-normal text-gray-400">(optional)</span>
              </label>
              <input type="text" placeholder="e.g. QV62PCUV" value={form.inviteCode}
                onChange={(e) => setForm({ ...form, inviteCode: e.target.value })}
                className={inputClass} />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-xs text-black hover:underline">Forgot password?</a>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-xs text-red-600">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2">
            {loading && (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            )}
            {loading ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
          </button>

          <div className="relative flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button type="button" onClick={onGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="px-6 pb-5 text-center">
          <p className="text-xs text-gray-500">
            {isLogin ? "New here? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-black font-semibold hover:underline">
              {isLogin ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [navItems, setNavItems] = useState(NAV_ITEMS);

  useEffect(() => {
    axios.get("https://16games.codescarts.com/api/slidersAnnouncements").then((res) => {
      const sliderTitles = res.data.data.sliders.map((s) => s.title);
      setNavItems((prev) => prev.map((item) => item.label === "Bags" || item.label === "Kids Corner" ? { ...item, children: sliderTitles } : item));
    }).catch((err) => {
      console.error("Slider API failed:", err);
      setNavItems((prev) => prev.map((item) => item.label === "Bags" || item.label === "Kids Corner" ? { ...item, children: ["Tote Bags", "Sling Bags", "Duffle Bags", "Backpacks"] } : item))
    })
  }, []);
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  });
  const [userDropdown, setUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (i) => { clearTimeout(timeoutRef.current); setOpenIndex(i); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpenIndex(null), 120); };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setLoginOpen(false);
    } catch (err) {
      console.error("Google login failed:", err.message);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleAuthSuccess = (userData) => setUser(userData);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserDropdown(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 font-serif">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex flex-col shrink-0">
            <span className="text-xs font-bold text-green-500 leading-none">Choti si</span>
            <span className="text-xl font-bold text-green-800 leading-tight">ASHA</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center justify-center flex-1 gap-1 list-none">
            {/* ✅ navItems map karo — state se aata hai (NAV_ITEMS ya API data) */}
            {navItems.map((item, i) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="#"
                  className={`flex items-center gap-1 px-3 py-2 text-[13px] ${openIndex === i
                    ? "text-green-800 border-b-2 border-green-800"
                    : "text-gray-900 border-b-2 border-transparent"
                    } transition-all`}
                >
                  {item.label}
                  {item.children && <ChevronDown />}
                </a>

                {/* ✅ DropdownMenu ko sirf items prop do — koi API nahi */}
                {item.children && (
                  <DropdownMenu items={item.children} visible={openIndex === i} />
                )}
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-1.5 text-gray-900 hover:text-green-800 transition-colors">
              <SearchIcon />
            </button>

            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-green-800 text-xs font-semibold transition-colors"
                >
                  <UserIcon />
                  <span className="hidden sm:inline">{user.name?.split(" ")[0] || "User"}</span>
                </button>

                {userDropdown && (
                  <div
                    className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-gray-100 rounded-xl py-2 w-52 z-50"
                    style={{ animation: "slideDown 0.15s ease" }}
                  >
                    <style>{`
                      @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-8px); }
                        to   { opacity: 1; transform: translateY(0); }
                      }
                    `}</style>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Wallet Balance</p>
                      <p className="text-sm font-bold text-green-700">₹{user.wallet || 0}</p>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Referral Code</p>
                      <p className="text-sm font-mono font-semibold text-gray-800">
                        {user.referral_code || user.u_id}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(!loginOpen)}
                className={`p-1.5 transition-colors ${loginOpen ? "text-green-800" : "text-gray-900 hover:text-green-800"}`}
              >
                <UserIcon />
              </button>
            )}

            <button className="p-1.5 text-gray-900 hover:text-green-800 transition-colors"><HeartIcon /></button>
            <button className="p-1.5 text-gray-900 hover:text-green-800 transition-colors"><CartIcon /></button>

            <button
              className="md:hidden p-1 text-gray-900 hover:text-green-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="bg-white border-t border-gray-200 py-3 md:hidden">
            {navItems.map((item, i) => (
              <div key={item.label}>
                <div
                  className="flex justify-between items-center px-6 py-2 text-sm text-gray-900 cursor-pointer"
                  onClick={() =>
                    item.children
                      ? setMobileExpanded(mobileExpanded === i ? null : i)
                      : null
                  }
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown />}
                </div>
                {item.children && mobileExpanded === i && (
                  <div className="bg-gray-50">
                    {item.children.map((child) => (
                      <a key={child} href="#" className="block px-10 py-1.5 text-gray-600 text-sm">
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

      {loginOpen && (
        <LoginPopup
          onClose={() => setLoginOpen(false)}
          onGoogleLogin={handleGoogleLogin}
          onAuthSuccess={(userData) => {
            handleAuthSuccess(userData);
            setLoginOpen(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;