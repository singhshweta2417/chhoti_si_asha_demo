import { useState } from "react";
import { ChevronRight, Heart, ShoppingBag, Eye, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Phulkari Pop Journal - Kukad and Ullu",
    price: 525.00,
    originalPrice: 525.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-h9pgR6cNP_Kj3AwptOL-BrplLvaoHaZZQ&s",
    category: "Journals",
    isNew: true,
  },
  {
    id: 2,
    name: "Seema Zip Pouch Journal",
    price: 525.00,
    originalPrice: 525.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-JournlPouch-Maroon01.jpg?v=1771660293&width=533",
    category: "Journals",
    isNew: true,
  },
  {
    id: 3,
    name: "Asha Pocket Journal",
    price: 525.00,
    originalPrice: 525.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-JournalEmbroidery-BluePhulkariMagenta01_46421270-72d5-4c84-a33d-444f67881d77.jpg?v=1771661739&width=360",
    category: "Journals",
    isNew: true,
  },
  {
    id: 4,
    name: "Bobby Kantha Journal",
    price: 495.00,
    originalPrice: 495.00,
    image: "https://houseofheritage.in/cdn/shop/files/BACK_TO_SCHOOL_14_a5674fad-7a78-4bd3-8694-677391c314ce.png?v=1740999938",
    category: "Journals",
    isNew: false,
  },
  {
    id: 5,
    name: "Grounded in Green - Leaf Stem",
    price: 180.00,
    originalPrice: 180.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-Crochet-Leaf-4Colours.jpg?v=1770390268&width=823",
    category: "Journals",
    isNew: true,
  },
  {
    id: 6,
    name: "Munna-manju Attache Classic Maroon",
    price: 525.00,
    originalPrice: 525.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-LaptopBag-AttacheBag-Maroon-01.jpg?v=1771411363&width=533",
    category: "Journals",
    isNew: true,
  },
  {
    id: 7,
    name: "Sahiba Laptop Sleeves",
    price: 1250.00,
    originalPrice: 1250.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-LaptopBag-Sahiba-DariGraphic-01.jpg?v=1771415918&width=533",
    category: "Journals",
    isNew: true,
  },
  {
    id: 8,
    name: "Bobby Patch Journal",
    price: 395.00,
    originalPrice: 395.00,
    image: "https://chhotisiasha.org/cdn/shop/files/C18-JournalBobbyVerticalPatch-Green02.jpg?v=1771657558&width=533",
    category: "Journals",
    isNew: false,
  }
];

function NewArrivals() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
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
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl md:text-4xl items-center font-semibold italic tracking-wide text-gray-900">
          New Arrivals
        </h2>
      
      </div>

      <div className="relative">
        <button
          onClick={prevPage}
          className="absolute -left-18 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red disabled:hover:text-gray-400"
          disabled={currentPage === 0}
          aria-label="Previous products"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Card */}
              <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4]">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* New Arrival Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    New
                  </div>
                )}

                {/* Quick Action Buttons - Visible on Hover */}
                <div className={`absolute inset-x-4 bottom-4 flex justify-center gap-2 transition-all duration-300 transform ${
                  hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="bg-white p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${
                      wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`} />
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-2">
                <h3 className="text-sm md:text-base text-gray-800 font-medium line-clamp-2 hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg md:text-xl font-semibold text-gray-900">
                  Rs. {product.price.toFixed(2)}
                </p>
                
                {/* Rating Placeholder */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={nextPage}
          className="absolute -right-18 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red disabled:hover:text-gray-400"
          disabled={currentPage === totalPages - 1}
          aria-label="Next products"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentPage === index 
                  ? 'w-8 bg-green-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="relative p-6">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    Rs. {quickViewProduct.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        toggleWishlist(quickViewProduct.id);
                      }}
                      className="p-3 border border-gray-300 rounded-full hover:border-green-600 hover:text-green-600 transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${
                        wishlist.includes(quickViewProduct.id) ? 'fill-red-500 text-red-500' : ''
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewArrivals;