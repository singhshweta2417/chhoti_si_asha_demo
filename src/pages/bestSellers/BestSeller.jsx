import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye, X, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Granny Square Charm - Hand-Crocheted Bookmark",
    price: 200.0,
    image: "https://chhotisiasha.org/cdn/shop/files/BOOKMARK-CROCHETSQUARE.jpg?v=1738747837&width=533",
  },
  {
    id: 2,
    name: "Magic Reads - Hand-Crocheted Bookmark",
    price: 525.0,
    image: "https://chhotisiasha.org/cdn/shop/products/CrochetStuffDollC6001.jpg?v=1633596222&width=533",
  },
  {
    id: 3,
    name: "Bookmark - Rainbow Circles",
    price: 525.0,
    image: "https://chhotisiasha.org/cdn/shop/files/Bookmark-rainbowcircles01.jpg?v=1738747952",
  },
  {
    id: 4,
    name: "Bookmark - Yellow Pencil Tops",
    price: 495.0,
    image: "https://chhotisiasha.org/cdn/shop/files/Stationery-PencilTops-Yellow-C10.jpg?v=1697518715&width=533",
  },
  {
    id: 5,
    name: "Bookmark - Crochet Square",
    price: 180.0,
    image: "https://chhotisiasha.org/cdn/shop/files/BOOKMARK-CROCHETSQUARE.jpg?v=1738747837&width=533",
  },
  {
    id: 6,
    name: "Bookmark - HP Scarf",
    price: 525.0,
    image: "https://chhotisiasha.org/cdn/shop/files/BOOKMAR-HP-SCARF.jpg?v=1738746867&width=533",
  },
];

const ITEMS_PER_VIEW = 4;
// Triple clone for infinite loop
const loopedProducts = [...products, ...products, ...products];
const START_OFFSET = products.length;

// ─── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product, wishlist, onToggleWishlist, onQuickAdd, onQuickView }) {
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      className="flex-shrink-0 flex flex-col px-2"
      style={{ width: `${100 / ITEMS_PER_VIEW}%` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-100 rounded-xl" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Top Right Icons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 z-10 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <button onClick={() => onToggleWishlist(product.id)} className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors duration-200">
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button onClick={() => onQuickView(product)} className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition-colors duration-200">
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Bottom Quick Add */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <button onClick={() => onQuickAdd(product)} className="w-full bg-white text-gray-900 text-sm font-medium py-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors duration-200">
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug hover:text-black transition-colors cursor-pointer">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

// ─── Quick View Modal ─────────────────────────────────────────────────────────
function QuickViewModal({ product, wishlist, onToggleWishlist, onQuickAdd, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 leading-snug">{product.name}</h3>
            <p className="text-2xl font-bold text-black">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 leading-relaxed">Handcrafted with love by skilled artisans at Chhoti Si Asha. Each piece is unique and tells a story of empowerment and craft.</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { onQuickAdd(product); onClose(); }} className="flex-1 bg-black text-white px-5 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button onClick={() => onToggleWishlist(product.id)} className="p-3 border border-gray-200 rounded-full hover:border-black transition-colors">
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ open, onClose, cartItems, onIncrease, onDecrease }) {
  const [agreed, setAgreed] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            {totalItems > 0 && <span className="bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">{totalItems}</span>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <ShoppingBag className="w-12 h-12 opacity-30" />
              <p className="text-sm">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.name}</h4>
                  <p className="text-sm font-semibold text-gray-900 mt-1">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 bg-gray-100 rounded-lg w-fit">
                    <button onClick={() => onDecrease(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">−</button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="flex items-center justify-around text-gray-500 text-xs">
            <div className="flex flex-col items-center gap-1"><span className="text-xl">✏️</span><span>Note</span></div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex flex-col items-center gap-1"><span className="text-xl">🚚</span><span>Shipping</span></div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex flex-col items-center gap-1"><span className="text-xl">🎟️</span><span>Coupon</span></div>
          </div>
          <div className="flex justify-between items-center text-base font-medium text-gray-900">
            <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-black" />
            <span className="text-xs text-gray-600 leading-relaxed">I agree with the <span className="underline cursor-pointer hover:text-gray-900">Terms & Conditions</span></span>
          </label>
          <button disabled={!agreed || cartItems.length === 0} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700">
            Checkout
          </button>
          <p className="text-center text-xs text-gray-500 underline cursor-pointer hover:text-gray-800 transition-colors">View Cart</p>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function BestSellers() {
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [offset, setOffset] = useState(START_OFFSET);
  const [animating, setAnimating] = useState(false);

  const slide = (dir) => {
    if (animating) return;
    setAnimating(true);

    setOffset((prev) => prev + dir);

    setTimeout(() => {
      setOffset((prev) => {
        const max = loopedProducts.length - ITEMS_PER_VIEW;
        if (prev >= products.length * 2) return START_OFFSET;
        if (prev < 0) return products.length - 1;
        return prev;
      });
      setAnimating(false);
    }, 420);
  };

  const handleQuickAdd = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const increaseQuantity = (id) => setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseQuantity = (id) => setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  const toggleWishlist = (id) => setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const normalizedOffset = ((offset - START_OFFSET) % products.length + products.length) % products.length;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1" />
        <h2 className="text-3xl md:text-4xl font-semibold italic text-center text-gray-900">Best Sellers</h2>
        <div className="flex-1 flex justify-end">
          <button onClick={() => setCartOpen(true)} className="relative p-2 hover:text-black transition-colors" aria-label="Open cart">
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <button
          onClick={() => slide(-1)}
          className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Overflow hidden wrapper */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${offset * (100 / ITEMS_PER_VIEW)}%)`,
              transition: animating ? "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
            }}
          >
            {loopedProducts.map((product, i) => (
              <ProductCard
                key={`${product.id}-${i}`}
                product={product}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onQuickAdd={handleQuickAdd}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => slide(1)}
          className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* View All */}
      <div className="flex justify-center mt-8">
        <button className="border border-gray-900 text-gray-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-300">
          View All Products
        </button>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onQuickAdd={handleQuickAdd}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />
    </div>
  );
}

export default BestSellers;