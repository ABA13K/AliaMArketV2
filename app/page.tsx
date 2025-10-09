'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./context/CartContext";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showSidebarAd, setShowSidebarAd] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { cartCount } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [bestsellingProducts, setBestsellingProducts] = useState<BestsellingProduct[]>([]);
  const [latestProducts, setlatestProducts] = useState<LatestProduct[]>([]);
  const { toggleFavorite, isFavorite } = useCart();
  const [loadingBestselling, setLoadingBestselling] = useState(true);
  const [loadinglastet, setLoadinglastet] = useState(true);
  const [errorBestselling, setErrorBestselling] = useState<string | null>(null);
  const [errorlastest, setErrorlastest] = useState<string | null>(null);
  const [randomProducts, setRandomProducts] = useState<any[]>([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [errorRandom, setErrorRandom] = useState<string | null>(null);
  
  // Search states
  const [apiSearchResults, setApiSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  interface Category {
    id: number;
    name: string;
    image: string;
    products_count: number;
  }

  interface BestsellingProduct {
    id: number;
    name: string;
    original_price: string;
    discount_percentage: number;
    price_after_discount: string;
    total_rating: number;
    image: string;
  }

  interface LatestProduct {
    id: number;
    name: string;
    original_price: string;
    discount_percentage: number;
    price_after_discount: string;
    total_rating: number;
    image: string;
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  // Search function with API integration
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      setApiSearchResults([]);
      setSearchError(null);
      return;
    }
    
    setIsSearching(true);
    setSearchLoading(true);
    setSearchError(null);

    try {
      // First search in local products as fallback
      const localResults = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(localResults);

      // Then search via API
      const response = await fetch(`https://mahmoudmohammed.site/api/public/products/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`فشل في البحث: ${response.statusText}`);
      }
      
      const apiResponse = await response.json();
      
      if (apiResponse.data && Array.isArray(apiResponse.data)) {
        setApiSearchResults(apiResponse.data);
      } else {
        throw new Error('تنسيق البيانات غير صالح من API');
      }
    } catch (err: any) {
      setSearchError(err.message);
      console.error('Error searching products:', err);
      setApiSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Combine local and API search results for display
  const displaySearchResults = searchLoading ? [] : [...apiSearchResults, ...searchResults];

  // Helper functions for product data
  const getProductImage = (product: any) => {
    return product.image || product.img || '/placeholder-product.jpg';
  };

  const getProductPrice = (product: any) => {
    return product.price_after_discount || product.price || '0 ل.س';
  };

  const getProductOriginalPrice = (product: any) => {
    return product.original_price || product.oldPrice;
  };

  const getProductDiscount = (product: any) => {
    return product.discount_percentage || 0;
  };

  const getProductRating = (product: any) => {
    return product.total_rating || product.rating || 0;
  };

  // Existing useEffect hooks
  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        setLoadingRandom(true);
        setErrorRandom(null);
        
        const res = await fetch('https://mahmoudmohammed.site/api/public/home-page/products/random');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch random products: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setRandomProducts(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setErrorRandom(err.message);
        console.error('Error fetching random products:', err);
      } finally {
        setLoadingRandom(false);
      }
    }
    
    fetchRandomProducts();
  }, []);

  useEffect(() => {
    async function fetchlatestgProducts() {
      try {
        setLoadinglastet(true);
        setErrorlastest(null);
        
        const res = await fetch('https://mahmoudmohammed.site/api/public/home-page/products/latest');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch latest products: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setlatestProducts(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setErrorlastest(err.message);
        console.error('Error fetching latest products:', err);
      } finally {
        setLoadinglastet(false);
      }
    }
    
    fetchlatestgProducts();
  }, []);

  useEffect(() => {
    async function fetchBestsellingProducts() {
      try {
        setLoadingBestselling(true);
        setErrorBestselling(null);
        
        const res = await fetch('https://mahmoudmohammed.site/api/public/home-page/products/top-rated');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch bestselling products: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setBestsellingProducts(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setErrorBestselling(err.message);
        console.error('Error fetching bestselling products:', err);
      } finally {
        setLoadingBestselling(false);
      }
    }
    
    fetchBestsellingProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        setErrorCategories(null);
        
        const res = await fetch('https://mahmoudmohammed.site/api/public/home-page/main-categorical');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setErrorCategories(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    }
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("hideSidebarAd");
    if (saved === "true") {
      setShowSidebarAd(false);
    }
  }, []);

  function closeSidebarAd() {
    setShowSidebarAd(false);
    localStorage.setItem("hideSidebarAd", "true");
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id || Math.random(),
      name: product.name,
      price: getProductPrice(product),
      img: getProductImage(product),
      quantity: 1,
      oldPrice: getProductOriginalPrice(product),
      category: product.category
    });
    alert(`تمت إضافة ${product.name} إلى السلة`);
  };

  // Responsive categories for mobile
  const responsiveCategories = [
    { id: "all", name: "الكل", icon: "🛍️" },
    { id: "clothing", name: "ملابس", icon: "👕" },
    { id: "electronics", name: "إلكترونيات", icon: "📱" },
    { id: "home", name: "منزلية", icon: "🏠" },
    { id: "beauty", name: "تجميل", icon: "💄" },
    { id: "sports", name: "رياضة", icon: "⚽" }
  ];

  // Sample products data
  const sampleProducts = [
    { 
      id: 1, 
      name: "ساعة ذكية", 
      price: "875,000 ل.س", 
      oldPrice: "1,050,000 ل.س",
      category: "electronics",
      img: "/products/watch.jpg",
      rating: 4.5
    },
    { 
      id: 2,
      name: "جاكيت شتوي", 
      price: "1,120,000 ل.س",
      category: "clothing",
      img: "/products/jacket.jpg",
      rating: 4.7
    },
    { 
      id: 3,
      name: "كريم عناية", 
      price: "332,500 ل.س",
      category: "beauty",
      img: "/products/skincare.jpg",
      rating: 4.0
    },
    { 
      id: 4,
      name: "سماعات بلوتوث", 
      price: "630,000 ل.س",
      category: "electronics",
      img: "/products/headphones.jpg",
      rating: 4.2
    }
  ];

  const allProducts = [...sampleProducts];

  // Search Results Component
  const SearchResults = () => (
    <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto border border-gray-200">
      {searchLoading ? (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">جاري البحث...</p>
        </div>
      ) : searchError ? (
        <div className="p-4 text-center text-red-500">
          <p className="text-sm">{searchError}</p>
          <p className="text-xs text-gray-500 mt-1">سيتم عرض نتائج البحث المحلية فقط</p>
        </div>
      ) : displaySearchResults.length > 0 ? (
        <>
          <div className="p-3 bg-gray-50 border-b">
            <p className="text-sm text-gray-600">
              تم العثور على {displaySearchResults.length} منتج
            </p>
          </div>
          {displaySearchResults.map((product, index) => (
            <Link 
              key={product.id || index} 
              href={`/product/${product.id}`}
              className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
            >
              <div className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={getProductImage(product)}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.jpg';
                  }}
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-orange-600 font-bold">{getProductPrice(product)}</p>
                    {getProductOriginalPrice(product) && (
                      <p className="text-xs text-gray-400 line-through">{getProductOriginalPrice(product)}</p>
                    )}
                  </div>
                  {getProductDiscount(product) > 0 && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      خصم {getProductDiscount(product)}%
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>لا توجد نتائج لبحثك</p>
          <p className="text-sm mt-1">حاول استخدام كلمات بحث مختلفة</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title dir="rtl">Alia Market - منصة تسوق إلكترونية</title>
        <meta name="description" content="اكتشف أحدث المنتجات من أفضل البائعين ضمن فئات متنوعة" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* هيدر متجاوب */}
      <header className="sticky top-0 z-40 bg-blue-900 text-white shadow-lg">
        <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <span className="ml-2 sm:ml-4">Alia Market</span>
          </Link>
          
          {/* شريط البحث */}
          <div dir="rtl" className="flex-1 max-w-lg mx-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتجك المفضل"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search results dropdown */}
              {isSearching && <SearchResults />}
            </div>
          </div>
          
          {/* التنقل - مخفي على الجوال */}
          <nav dir="rtl" className="hidden lg:flex items-stretch space-x-6 xl:space-x-8 mr-4">
            <Link href="/" className="text-white hover:text-orange-300 font-medium transition">الرئيسية</Link>
            <Link href="/categories" className="text-white hover:text-orange-300 font-medium transition">الفئات</Link>
            <Link href="/offers" className="text-white hover:text-orange-300 font-medium transition">العروض</Link>
            <Link href="/account" className="text-white hover:text-orange-300 font-medium transition">حسابي</Link>
            <Link href="/favorites" className="flex items-center gap-2 text-white hover:text-orange-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden xl:inline">المفضلة</span>
            </Link>
          </nav>
          
          {/* سلة التسوق وأزرار */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/cart" className="relative text-white hover:text-orange-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            </Link>
            <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition shadow-md text-sm sm:text-base">
              تسجيل الدخول
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div dir="rtl" className="lg:hidden bg-blue-800 border-t border-blue-700">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-white hover:text-orange-300 font-medium transition">الرئيسية</Link>
              <Link href="/categories" className="block text-white hover:text-orange-300 font-medium transition">الفئات</Link>
              <Link href="/offers" className="block text-white hover:text-orange-300 font-medium transition">العروض</Link>
              <Link href="/account" className="block text-white hover:text-orange-300 font-medium transition">حسابي</Link>
              <Link href="/favorites" className="block text-white hover:text-orange-300 font-medium transition">المفضلة</Link>
            </div>
          </div>
        )}

        {/* Mobile Categories Scroll */}
        <div dir="ltr" className="lg:hidden py-3 px-4 bg-blue-800 border-t border-blue-700">
          <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
            {responsiveCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id ? 'bg-orange-500 text-white' : 'bg-blue-700 text-white'
                }`}
              >
                <span className="text-lg mb-1">{category.icon}</span>
                <span className="text-xs">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* نافذة منبثقة */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center relative border border-gray-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-orange-500 text-2xl font-light transition-colors"
              aria-label="إغلاق الإعلان"
            >
              &times;
            </button>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">فرصة استثمارية!</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              استثمر أموالك الآن في المشاريع الصغيرة وحقق أرباحًا مستدامة مع
              شركائنا المعتمدين.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                لاحقاً
              </button>
              <a
                href="/invest"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-md hover:shadow-lg"
              >
                اكتشف المزيد
              </a>
            </div>
          </div>
        </div>
      )}

      {/* إعلان جانبي عائم - مخفي على الجوال */}
      {showSidebarAd && (
        <aside className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-xl rounded-l-2xl w-80 p-5 z-40 hidden lg:block border-l-4 border-orange-500">
          <button
            onClick={closeSidebarAd}
            className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-xl transition-colors"
            aria-label="إغلاق الإعلان الجانبي"
          >
            &times;
          </button>
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg text-gray-800">كيف تفتح متجرك؟</h3>
              <p className="text-sm text-gray-600 mt-1">
                افتح متجرك على منصتنا بخطوات بسيطة وابدأ البيع بسرعة وأمان.
              </p>
            </div>
          </div>
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image
              src="/ads/open-store.png"
              alt="فتح متجر"
              width={320}
              height={180}
              className="w-full h-auto object-cover transition-transform hover:scale-105"
            />
          </div>
          <a
            href="/open-store"
            className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md hover:shadow-lg font-medium"
          >
            ابدأ الآن
          </a>
        </aside>
      )}

      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* قسم الهيرو */}
        <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16 sm:py-20 lg:py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 dir="rtl" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              مرحباً بكم في <span className="text-orange-200">Alia Market</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto">
              منصة رائدة في التجارة الإلكترونية تقدم أفضل الحلول للبائعين والمشترين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#categories"
                className="bg-white text-orange-600 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl hover:bg-gray-100 transition shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                اكتشف المنتجات
              </a>
              <a
                href="/signup"
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl hover:bg-white/10 transition text-sm sm:text-base"
              >
                انضم إلينا
              </a>
            </div>
          </div>
        </section>

        {/* قسم الفئات */}
        <section dir="rtl" id="categories" className="py-12 sm:py-16 lg:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-900">تصفح حسب الفئة</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">اكتشف آلاف المنتجات من مختلف الفئات</p>
            </div>

            {loadingCategories ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                    <div className="h-32 sm:h-48 bg-gray-200"></div>
                    <div className="p-4 sm:p-5">
                      <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : errorCategories ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{errorCategories}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  حاول مرة أخرى
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {categories.slice(0, 8).map((category, index) => (
                    <Link
                      key={category.id}
                      href={`/sub-categories/${category.id}`}
                      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2"
                    >
                      <div className="relative h-32 sm:h-48 overflow-hidden">
                        <Image
                          src={category.image || '/placeholder-category.jpg'}
                          alt={category.name}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-category.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute inset-0 bg-orange-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 sm:mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-medium text-xs sm:text-sm">تصفح القسم</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 sm:p-5">
                        <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 line-clamp-1">{category.name}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">{category.products_count} منتج</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {categories.length > 8 && (
                  <div className="text-center">
                    <Link
                      href="/categories"
                      className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      عرض جميع الفئات
                      <span className="bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs sm:text-sm">
                        ({categories.length})
                      </span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* قسم المنتجات الحديثة */}
        <section dir="rtl" id="products" className="py-12 sm:py-16 lg:py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-900">المنتجات الحديثة</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">المنتجات المضافة مؤخراً</p>
            </div>

            {loadinglastet ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 sm:h-60 bg-gray-200"></div>
                    <div className="p-4 sm:p-5">
                      <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : errorlastest ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{errorlastest}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  حاول مرة أخرى
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {latestProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-48 sm:h-60 overflow-hidden">
                        <Image
                          src={product.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.jpg';
                          }}
                        />
                        {product.discount_percentage > 0 && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            خصم {product.discount_percentage}%
                          </span>
                        )}
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite({
                              id: product.id,
                              name: product.name,
                              price: product.price_after_discount,
                              img: product.image,
                              oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
                            });
                          }}
                          className={`absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-sm transition ${
                            isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
                          }`}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 sm:h-5 sm:w-5" 
                            fill={isFavorite(product.id) ? "currentColor" : "none"} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-2 line-clamp-2 h-12 sm:h-14">{product.name}</h3>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.total_rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs sm:text-sm text-gray-500 mr-2">({product.total_rating})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg sm:text-xl font-bold text-orange-600">
                              {product.price_after_discount} ل.س
                            </p>
                            {product.discount_percentage > 0 && (
                              <p className="text-xs sm:text-sm text-gray-400 line-through">
                                {product.original_price} ل.س
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price_after_discount,
                                img: product.image,
                                quantity: 1,
                                oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
                              });
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition shadow hover:shadow-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* قسم المنتجات الأكثر تقييماً */}
        <section dir="rtl" id="products" className="py-12 sm:py-16 lg:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-900">الأكثر تقييماً</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">المنتجات الأكثر تقييماً من عملائنا</p>
            </div>

            {loadingBestselling ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 sm:h-60 bg-gray-200"></div>
                    <div className="p-4 sm:p-5">
                      <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : errorBestselling ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{errorBestselling}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  حاول مرة أخرى
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {bestsellingProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-48 sm:h-60 overflow-hidden">
                        <Image
                          src={product.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.jpg';
                          }}
                        />
                        {product.discount_percentage > 0 && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            خصم {product.discount_percentage}%
                          </span>
                        )}
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite({
                              id: product.id,
                              name: product.name,
                              price: product.price_after_discount,
                              img: product.image,
                              oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
                            });
                          }}
                          className={`absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-sm transition ${
                            isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
                          }`}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 sm:h-5 sm:w-5" 
                            fill={isFavorite(product.id) ? "currentColor" : "none"} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-2 line-clamp-2 h-12 sm:h-14">{product.name}</h3>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.total_rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs sm:text-sm text-gray-500 mr-2">({product.total_rating})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg sm:text-xl font-bold text-orange-600">
                              {product.price_after_discount} ل.س
                            </p>
                            {product.discount_percentage > 0 && (
                              <p className="text-xs sm:text-sm text-gray-400 line-through">
                                {product.original_price} ل.س
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price_after_discount,
                                img: product.image,
                                quantity: 1,
                                oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
                              });
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition shadow hover:shadow-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* قسم الدعوة للعمل */}
        <section className="py-12 sm:py-16 lg:py-20 px-6 text-center bg-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dark.svg')] bg-repeat"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 dir="rtl" className="text-2xl sm:text-3xl font-bold mb-6">جاهز لبدء رحلتك مع Alia Market؟</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              سجل الآن واحصل على خصم 10% على أول عملية شراء
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                إنشاء حساب جديد
              </a>
              <a
                href="/login"
                className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition text-sm sm:text-base"
              >
                تسجيل الدخول
              </a>
            </div>
          </div>
        </section>

        {/* الفوتر */}
        <footer className="bg-blue-900 text-white py-8 sm:py-12 px-6">
          <div dir="rtl" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Alia Market</h3>
              <p className="text-blue-200 text-sm sm:text-base">
                منصة رائدة في التجارة الإلكترونية تقدم أفضل الحلول للبائعين والمشترين
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">روابط سريعة</h4>
              <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
                <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
                <li><a href="/products" className="hover:text-white transition">المنتجات</a></li>
                <li><a href="/categories" className="hover:text-white transition">الفئات</a></li>
                <li><a href="/about" className="hover:text-white transition">عن المنصة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">خدمة العملاء</h4>
              <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
                <li><a href="/contact" className="hover:text-white transition">اتصل بنا</a></li>
                <li><a href="/faq" className="hover:text-white transition">الأسئلة الشائعة</a></li>
                <li><a href="/returns" className="hover:text-white transition">سياسة الإرجاع</a></li>
                <li><a href="/privacy" className="hover:text-white transition">الخصوصية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">تواصل معنا</h4>
              <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                <a href="#" className="bg-blue-800 hover:bg-orange-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-800 hover:bg-orange-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-800 hover:bg-orange-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
              <p dir="rtl" className="text-blue-200 text-sm sm:text-base">البريد الإلكتروني: info@aliamarket.com</p>
              <p dir="rtl" className="text-blue-200 text-sm sm:text-base">الهاتف: <span dir="ltr">+963 123 456 789</span></p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-blue-300 text-sm sm:text-base">
            <p dir="rtl">© {new Date().getFullYear()} Alia Market. جميع الحقوق محفوظة</p>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav dir="rtl" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-40 lg:hidden">
        <Link href="/" className="flex flex-col items-center text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">الرئيسية</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-xs mt-1">الفئات</span>
        </Link>
        <Link href="/offers" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
          <span className="text-xs mt-1">العروض</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">حسابي</span>
        </Link>
      </nav>

      {/* أنماط عامة */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}