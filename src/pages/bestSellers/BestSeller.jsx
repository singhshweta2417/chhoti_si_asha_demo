import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Granny Square Charm - Hand-Crocheted Bookmark",
    price: 200.0,
    image:
      "https://chhotisiasha.org/cdn/shop/files/BOOKMARK-CROCHETSQUARE.jpg?v=1738747837&width=533",
  },
  {
    id: 2,
    name: "Magic Reads - Hand-Crocheted Bookmark",
    price: 525.0,
    image:
      "https://chhotisiasha.org/cdn/shop/products/CrochetStuffDollC6001.jpg?v=1633596222&width=533",
  },
  {
    id: 3,
    name: "Bookmark - Rainbow Circles",
    price: 525.0,
    image:
      "https://chhotisiasha.org/cdn/shop/files/Bookmark-rainbowcircles01.jpg?v=1738747952",
  },
  {
    id: 4,
    name: "Bookmark - Yellow Pencil Tops",
    price: 495.0,
    image:
      "https://chhotisiasha.org/cdn/shop/files/Stationery-PencilTops-Yellow-C10.jpg?v=1697518715&width=533",
  },
  {
    id: 5,
    name: "Boookmark - Crochet Square",
    price: 180.0,
    image:
      "https://chhotisiasha.org/cdn/shop/files/BOOKMARK-CROCHETSQUARE.jpg?v=1738747837&width=533",
  },
  {
    id: 6,
    name: "Bookmark - HP Scarf",
    price: 525.0,
    image:
      "https://chhotisiasha.org/cdn/shop/files/BOOKMAR-HP-SCARF.jpg?v=1738746867&width=533",
  },
];

function BestSellers() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
   const[cartOpen,setCartOpen] = useState(false);
   const [cartItems,setCartItems]= useState([]);
   const [agreed, setAgreed] = useState(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const subtotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

 const handleQuickAdd =(product)=> {
  setCartItems((prev) => {
    const existingItem = prev.find((item)=> item.id===product.id);
    if(existingItem){
      return prev.map((item)=>item.id=== product.id?{...item,quantity: item.quantity+1}:item);
    }
    return [...prev,{...product,quantity:1}];
  });
  setCartOpen(true);
 }

 const increaseQuantity =(id)=>{
  setCartItems((prev)=>prev.map((item)=>item.id===id?{...item,quantity: item.quantity+1}:item))
 }
const decreaseQuantity=(id)=>{
  setCartItems((prev)=>prev.map((item)=>item.id===id?{...item,quantity:item.quantity -1}:item).filter((item)=>item.quantity>0))
}
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const displayedProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-semibold italic text-center mb-10">
        Best Sellers
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={prevPage}
          className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Left Icons */}
                <div
                  className={`absolute top-3 right-3 flex flex-col gap-2 z-10 transition-all duration-300 ${
                    hoveredProduct === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-green-600 hover:text-white transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-green-600 hover:text-white transition"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Bottom Quick Add */}
                <div
                  className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${
                    hoveredProduct === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <button 
                  onClick={()=>handleQuickAdd(product)}
                  className="w-full bg-white py-2 rounded-full shadow-md hover:bg-green-600 hover:text-white transition">
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <h3 className="text-sm font-medium line-clamp-2 hover:text-green-600">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold mt-1">
                  Rs. {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextPage}
          className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-gray-500"
            >
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-semibold">
                  {quickViewProduct.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 mt-3">
                  Rs. {quickViewProduct.price.toFixed(2)}
                </p>
                <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cart Drawer */}
<div
  className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-500 flex flex-col ${
    cartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-6 flex justify-between items-center">
    <h2 className="text-xl font-semibold">Shopping Cart</h2>
    <button onClick={() => setCartOpen(false)}>✕</button>
  </div>
  <div className="flex-1 p-6 space-y-6 overflow-y-auto">
    {cartItems.length === 0 ? (
      <p className="text-center">Your cart is empty.</p>
    ) : (
      cartItems.map((item, index) => (
        <div key={index} className="flex gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-25 object-cover rounded"
          />
          <div>
            <h4 className="text-sm font-medium">{item.name}</h4>
            <p className="text-black-600 font-semibold">
              Rs. {item.price.toFixed(2)}
            </p>
              <div className="flex items-center mt-2 bg-gray-100 rounded-lg w-fit">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 text-lg"
                    >
                      −
                    </button>

                    <span className="px-3">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>
          </div>
        </div>
      ))
    )}
   </div>
 <div className="p-6 bg-gray-100 space-y-6">

  {/* Top Options */}
  <div className="flex items-center justify-between text-center text-gray-700 text-sm">

    <div className="flex-1 flex flex-col items-center">
      <span className="text-lg">✏️</span>
      <p className="mt-1">Note</p>
    </div>

    <div className="h-8 w-px bg-gray-300"></div>

    <div className="flex-1 flex flex-col items-center">
      <span className="text-lg">🚚</span>
      <p className="mt-1">Shipping</p>
    </div>

    <div className="h-8 w-px bg-gray-300"></div>

    <div className="flex-1 flex flex-col items-center">
      <span className="text-lg">🎟️</span>
      <p className="mt-1">Coupon</p>
    </div>

  </div>

  {/* Subtotal */}
  <div className="flex justify-between text-lg font-medium">
    <span>Subtotal</span>
    <span>Rs. {subtotal.toFixed(2)}</span>
  </div>

  {/* Terms Checkbox */}
  <div className="flex items-start gap-2 text-sm text-gray-700">
    <input type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="mt-1 w-4 h-4" />
    <p>
      I agree with the{" "}
      <span className="underline cursor-pointer">
        Terms & conditions
      </span>
    </p>
  </div>

  <button
    disabled={!agreed}
    className={`w-full bg-black rounded-md py-3 text-white ${!agreed ? "opacity-50 cursor-not-allowed" : "hover:bg-black-700"}`}
  >
    Check out
  </button>

  {/* View Cart */}
  <p className="text-center underline cursor-pointer text-sm">
    View Cart
  </p>

</div>
</div>
    </div>
  );
}

export default BestSellers;