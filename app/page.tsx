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
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { cartCount } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const { addToCart } = useCart();
  interface ApiCategory {
    id: number;
    name: string;
    img: string;
    products_count: number;
  }
  interface Category {
    id: string;
    name: string;
    icon?: string;
    img?: string;
    count?: string;
  }
  // Combine all products for search
 
  // Search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://mahmoudmohammed.site/api/public/home-page/main-categorical");
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }
        const result = await res.json();
        // Extract array from "data" field
        const apiCats: ApiCategory[] = result.data;
        if (!Array.isArray(apiCats)) {
          throw new Error("Invalid categories format");
        }
        // Map to our local Category shape
        const cats: Category[] = apiCats.map(cat => ({
          id: cat.id.toString(),
          name: cat.name,
          img: cat.img,
          count: `${cat.products_count} منتج`,
        }));
        console.log(cats)
        setCategories(cats);
      } catch (err: any) {
        setErrorCategories(err.message);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
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
      price: product.price,
      img: product.img,
      quantity: 1,
      oldPrice: product.oldPrice,
      category: product.category
    });
    alert(`تمت إضافة ${product.name} إلى السلة`);
  };

  // بيانات الفئات للموبايل
  const mobileCategories = [
    { id: "all", name: "الكل", icon: "🛍️" },
    { id: "clothing", name: "ملابس", icon: "👕" },
    { id: "electronics", name: "إلكترونيات", icon: "📱" },
    { id: "home", name: "منزلية", icon: "🏠" },
    { id: "beauty", name: "تجميل", icon: "💄" },
    { id: "sports", name: "رياضة", icon: "⚽" }
  ];

  // بيانات الفئات للديسكتوب
  const desktopCategories = [
    { name: "ملابس", img: "/categories/clothing.jpg", count: "1,245 منتج" },
    { name: "إلكترونيات", img: "/categories/electronics.jpg", count: "892 منتج" },
    { name: "مستلزمات منزلية", img: "/categories/home.jpg", count: "1,532 منتج" },
    { name: "تجميل", img: "/categories/beauty.jpg", count: "756 منتج" },
    { name: "رياضة", img: "/categories/sports.jpg", count: "634 منتج" },
    { name: "كتب", img: "/categories/books.jpg", count: "423 منتج" },
    { name: "ألعاب", img: "/categories/toys.jpg", count: "567 منتج" },
    { name: "مجوهرات", img: "/categories/jewelry.jpg", count: "298 منتج" },
    { name: "أحذية", img: "/categories/shoes.jpg", count: "834 منتج" },
    { name: "حقائب", img: "/categories/bags.jpg", count: "445 منتج" },
    { name: "هواتف", img: "/categories/phones.jpg", count: "312 منتج" },
    { name: "أثاث", img: "/categories/furniture.jpg", count: "678 منتج" }
  ];

  // بيانات المنتجات للموبايل
  const mobileProducts = [
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
    },
    { 
      id: 5,
      name: "سجادة صلاة", 
      price: "185,000 ل.س",
      category: "home",
      img: "/products/prayer-rug.jpg",
      rating: 4.3
    },
    { 
      id: 6,
      name: "كرة قدم", 
      price: "275,000 ل.س",
      category: "sports",
      img: "/products/football.jpg",
      rating: 4.6
    }
  ];

  // منتجات عشوائية للموبايل
  const mobileRandomProducts = [
    { 
      id: 7,
      name: "لابتوب جيمنغ", 
      price: "4,500,000 ل.س",
      category: "electronics",
      img: "/products/laptop.jpg",
      rating: 4.7
    },
    { 
      id: 8,
      name: "فستان سهرة", 
      price: "750,000 ل.س",
      category: "clothing",
      img: "/products/dress.jpg",
      rating: 4.2
    },
    { 
      id: 9,
      name: "مكواة شعر", 
      price: "285,000 ل.س",
      category: "beauty",
      img: "/products/hair-iron.jpg",
      rating: 4.1
    },
    { 
      id: 10,
      name: "كاميرا رقمية", 
      price: "1,850,000 ل.س",
      category: "electronics",
      img: "/products/camera.jpg",
      rating: 4.6
    }
  ];

  // تصفية المنتجات حسب الفئة (موبايل)
  const filteredMobileProducts = activeCategory === "all" 
    ? mobileProducts 
    : mobileProducts.filter(product => product.category === activeCategory);

  // المنتجات الأكثر مبيعاً للديسكتوب
  const desktopBestsellingProducts = [
    { 
      name: "ساعة ذكية", 
      price: "875,000 ل.س", 
      oldPrice: "1,050,000 ل.س",
      img: "/products/watch.jpg",
      rating: 4.5
    },
    { 
      name: "سماعات بلوتوث", 
      price: "630,000 ل.س",
      img: "/products/headphones.jpg",
      rating: 4.2
    },
    { 
      name: "جاكيت شتوي", 
      price: "1,120,000 ل.س",
      oldPrice: "1,400,000 ل.س",
      img: "/products/jacket.jpg",
      rating: 4.7
    },
    { 
      name: "كريم عناية", 
      price: "332,500 ل.س",
      img: "/products/skincare.jpg",
      rating: 4.0
    },
    { 
      name: "حذاء رياضي", 
      price: "945,000 ل.س",
      oldPrice: "1,180,000 ل.س",
      img: "/products/sneakers.jpg",
      rating: 4.6
    },
    { 
      name: "هاتف ذكي", 
      price: "2,850,000 ل.س",
      img: "/products/smartphone.jpg",
      rating: 4.8
    },
    { 
      name: "حقيبة ظهر", 
      price: "425,000 ل.س",
      img: "/products/backpack.jpg",
      rating: 4.3
    },
    { 
      name: "عطر فاخر", 
      price: "680,000 ل.س",
      oldPrice: "850,000 ل.س",
      img: "/products/perfume.jpg",
      rating: 4.4
    }
  ];

  // منتجات عشوائية للديسكتوب
  const desktopRandomProducts = [
    { name: "لابتوب جيمنغ", price: "4,500,000 ل.س", img: "/products/laptop.jpg", rating: 4.7 },
    { name: "فستان سهرة", price: "750,000 ل.س", img: "/products/dress.jpg", rating: 4.2 },
    { name: "مكواة شعر", price: "285,000 ل.س", img: "/products/hair-iron.jpg", rating: 4.1 },
    { name: "كاميرا رقمية", price: "1,850,000 ل.س", img: "/products/camera.jpg", rating: 4.6 },
    { name: "مصباح LED", price: "165,000 ل.س", img: "/products/led-lamp.jpg", rating: 4.0 },
    { name: "كتاب طبخ", price: "95,000 ل.س", img: "/products/cookbook.jpg", rating: 4.5 },
    { name: "لعبة تركيب", price: "320,000 ل.س", img: "/products/puzzle.jpg", rating: 4.3 },
    { name: "قلادة ذهبية", price: "1,250,000 ل.س", img: "/products/necklace.jpg", rating: 4.8 }
  ];
  const allProducts = [
    ...mobileProducts,
    ...mobileRandomProducts,
    ...desktopBestsellingProducts.map(p => ({...p, id: Math.random()})),
    ...desktopRandomProducts.map(p => ({...p, id: Math.random()}))
  ];

  // عرض نسخة الموبايل
  if (isMobile) {
    return (
      <>
        <Head>
          <title dir="rtl">Alia Market - منصة تسوق إلكترونية</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="description" content="اكتشف أحدث المنتجات من أفضل البائعين ضمن فئات متنوعة" />
        </Head>

        {/* نافذة منبثقة للجوال */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-end z-50 p-4">
            <div className="bg-white rounded-t-2xl shadow-2xl w-full p-6 text-center relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 left-4 text-gray-500 hover:text-orange-600 text-xl"
                aria-label="إغلاق الإعلان"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-3 text-gray-800">عرض خاص!</h2>
              <p className="mb-4 text-gray-600">
                احصل على خصم 15% على أول عملية شراء عند التسجيل اليوم
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium"
                >
                  لاحقاً
                </button>
                <a
                  href="/signup"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
                >
                  تسجيل
                </a>
              </div>
            </div>
          </div>
        )}

        {/* هيدر الجوال */}
        <header dir="rtl" className="sticky top-0 z-40 bg-blue-900 text-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex-1 mx-4">
              <input
                type="text"
                placeholder="ابحث..."
                className="w-full px-3 py-1 rounded-lg text-black text-sm"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <Link href="/cart" className="text-white relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            </Link>
          </div>

          {/* Mobile search results */}
          {isSearching && isMobile && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map(product => (
                  <Link 
                    key={product.id} 
                    href={`/product/${product.id}`}
                    className="flex items-center p-3 hover:bg-gray-100 border-b border-gray-100"
                    onClick={() => {
                      setIsSearching(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 mr-3">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                      <p className="text-sm text-orange-600 font-bold">{product.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  لا توجد نتائج لبحثك
                </div>
              )}
            </div>
          )}

          {/* قائمة الجوال */}
          {menuOpen && (
            <div dir="rtl" className="absolute top-full left-0 right-0 bg-white shadow-lg z-50">
              <div className="container mx-auto px-4 py-3">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-gray-800 font-medium">الرئيسية</Link>
                  <Link href="/categories" className="text-gray-800 font-medium">الفئات</Link>
                  <Link href="/offers" className="text-gray-800 font-medium">العروض</Link>
                  <Link href="/account" className="text-gray-800 font-medium">حسابي</Link>
                  <div className="pt-4 border-t border-gray-200">
                    <Link href="/login" className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium">
                      تسجيل الدخول
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </header>

        <main dir="rtl" className="pb-20">
          {/* بانر الهيرو للجوال */}
          <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white pt-16 pb-12 px-4">
            <div className="container mx-auto">
              <h1 dir="ltr" className="text-2xl font-bold mb-3 text-right">Alia Market مرحباً بكم في</h1>
              <p className="mb-5">منصة متكاملة للبيع والشراء</p>
              <Link href="/categories" className="inline-block bg-white text-orange-600 font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                تصفح الآن
              </Link>
            </div>
          </section>

          {/* تصفح الفئات */}
          <section dir="ltr" className="py-4 px-4 bg-white sticky top-14 z-30 shadow-sm">
            <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
              {mobileCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center justify-center px-6 py-2 rounded-lg whitespace-nowrap ${activeCategory === category.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  <span className="text-xl mb-1">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* شبكة المنتجات */}
          <section dir="rtl" className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {activeCategory === "all" ? "أحدث المنتجات" : mobileCategories.find(c => c.id === activeCategory)?.name}
              </h2>
              <Link href="/categories" className="text-orange-600 text-sm hover:text-orange-700">
                عرض الكل
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredMobileProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                      {product.oldPrice && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                          خصم
                        </span>
                      )}
                      <button className="absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-orange-600">{product.price}</p>
                          {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through">{product.oldPrice}</p>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }} 
                          className="text-gray-700 hover:text-orange-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* قسم المنتجات العشوائية للجوال */}
          <section dir="rtl" className="container mx-auto px-4 py-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">اكتشف منتجات جديدة</h2>
              <Link href="/products" className="text-orange-600 text-sm hover:text-orange-700">
                عرض الكل
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {mobileRandomProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                      <button className="absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-orange-500">{product.price}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="text-gray-700 hover:text-orange-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* تنقل سفلي للجوال */}
          <nav dir="rtl" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-40">
            <Link href="/" className="flex flex-col items-center text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">الرئيسية</span>
            </Link>
            <Link href="/categories" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-xs mt-1">الفئات</span>
            </Link>
            <Link href="/offers" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
              <span className="text-xs mt-1">العروض</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">حسابي</span>
            </Link>
          </nav>
        </main>

        {/* أنماط عامة للجوال */}
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
        `}</style>
      </>
    );
  }

  // عرض نسخة الديسكتوب
  return (
    <>
      <Head>
        <title dir="rtl">Alia Market - منصة تسوق إلكترونية</title>
        <meta name="description" content="اكتشف أحدث المنتجات من أفضل البائعين ضمن فئات متنوعة" />
      </Head>

      {/* هيدر الديسكتوب */}
      <header className="sticky top-0 z-40 bg-blue-900 text-white shadow-lg">
        <div dir="rtl" className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <span className="ml-4">Alia Market</span>
          </Link>
          
          {/* شريط البحث */}
          <div dir="rtl" className="flex-1 max-w-xl relative search-container">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتجك المفضل"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search results dropdown */}
              {isSearching && (
                <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        className="flex items-center p-3 hover:bg-gray-100 border-b border-gray-100"
                        onClick={() => {
                          setIsSearching(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="w-12 h-12 flex-shrink-0 mr-3">
                          <Image
                            src={product.img}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                          <p className="text-sm text-orange-600 font-bold">{product.price}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      لا توجد نتائج لبحثك
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* التنقل */}
          <nav dir="rtl" className="hidden md:flex items-stretch space-x-8 mr-10">
            <Link href="/" className="text-white hover:text-orange-300 font-medium transition ml-5">الرئيسية</Link>
            <Link href="/categories" className="text-white hover:text-orange-300 font-medium transition">الفئات</Link>
            <Link href="/offers" className="text-white hover:text-orange-300 font-medium transition">العروض</Link>
            <Link href="/account" className="text-white hover:text-orange-300 font-medium transition">حسابي</Link>
          </nav>
          
          {/* سلة التسوق */}
          <div className="flex items-center">
            <Link href="/cart" className="relative text-white hover:text-orange-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            </Link>
            <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-md ml-8">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </header>

      {/* نافذة منبثقة للديسكتوب */}
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

      {/* إعلان جانبي عائم */}
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
        <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 dir="rtl" className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              مرحباً بكم في <span className="text-orange-200">Alia Market</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto">
              منصة رائدة في التجارة الإلكترونية تقدم أفضل الحلول للبائعين والمشترين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#categories"
                className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              >
                اكتشف المنتجات
              </a>
              <a
                href="/signup"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition"
              >
                انضم إلينا
              </a>
            </div>
          </div>
        </section>

        {/* قسم الفئات */}
        <section dir="rtl" id="categories" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">تصفح حسب الفئة</h2>
            <p className="mt-2 text-gray-500">
              اكتشف آلاف المنتجات من مختلف الفئات
            </p>
          </div>

          {loadingCategories ? (
            <p className="text-center">جاري تحميل الفئات...</p>
          ) : errorCategories ? (
            <p className="text-center text-red-600">{errorCategories}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categories.map(cat => (
                <Link key={cat.id} href={`/categories/${cat.id}`}>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                    { 
                    cat.img &&  (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={cat.img}
                          alt={cat.name}
                          width={320}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {cat.name}
                      </h3>
                      {cat.count && (
                        <p className="text-sm text-gray-500">
                          {cat.count}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* قسم المنتجات الأكثر مبيعاً */}
        <section dir="rtl" id="products" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3 text-blue-900">الأكثر مبيعاً</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">المنتجات الأكثر طلباً من عملائنا</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {desktopBestsellingProducts.map((product, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                  <Link href="/product" className="block">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.oldPrice && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          خصم {Math.round(((parseFloat(product.oldPrice.replace(/[^\d]/g, '')) - parseFloat(product.price.replace(/[^\d]/g, ''))) / parseFloat(product.oldPrice.replace(/[^\d]/g, '')) * 100))}
                        </span>
                      )}
                      <button className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500">({product.rating})</span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-600">{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        أضف للسلة
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم المنتجات العشوائية */}
        <section dir="rtl" className="py-20 px-6 bg-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3 text-blue-900">اكتشف منتجات متنوعة</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">مجموعة مختارة من منتجات متنوعة لتلبية جميع احتياجاتك</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {desktopRandomProducts.map((product, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                  <Link               href="/product" className="block">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500">({product.rating})</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-500">{product.price}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    أضف للسلة
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* قسم الدعوة للعمل */}
    <section className="py-20 px-6 text-center bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dark.svg')] bg-repeat"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 dir="rtl" className="text-3xl font-bold mb-6">جاهز لبدء رحلتك مع Alia Market؟</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          سجل الآن واحصل على خصم 10% على أول عملية شراء
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
          >
            إنشاء حساب جديد
          </a>
          <a
            href="/login"
            className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl transition"
          >
            تسجيل الدخول
          </a>
        </div>
      </div>
    </section>

    {/* الفوتر */}
    <footer className="bg-blue-900 text-white py-12 px-6">
      <div dir="rtl" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Alia Market</h3>
          <p className="text-blue-200">
            منصة رائدة في التجارة الإلكترونية تقدم أفضل الحلول للبائعين والمشترين
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-blue-200">
            <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
            <li><a href="/products" className="hover:text-white transition">المنتجات</a></li>
            <li><a href="/categories" className="hover:text-white transition">الفئات</a></li>
            <li><a href="/about" className="hover:text-white transition">عن المنصة</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">خدمة العملاء</h4>
          <ul className="space-y-2 text-blue-200">
            <li><a href="/contact" className="hover:text-white transition">اتصل بنا</a></li>
            <li><a href="/faq" className="hover:text-white transition">الأسئلة الشائعة</a></li>
            <li><a href="/returns" className="hover:text-white transition">سياسة الإرجاع</a></li>
            <li><a href="/privacy" className="hover:text-white transition">الخصوصية</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <div className="flex gap-4 mb-4">
            <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
              <span className="sr-only">فيسبوك</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
              <span className="sr-only">إنستغرام</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
              <span className="sr-only">تويتر</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
          </div>
          <p dir="rtl" className="text-blue-200">البريد الإلكتروني: info@aliamarket.com</p>
          <p dir="rtl" className="text-blue-200">الهاتف: <span dir="ltr">+963 123 456 789</span></p>
        </div>
      </div>
      <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
        <p dir="rtl">© {new Date().getFullYear()} Alia Market. جميع الحقوق محفوظة</p>
      </div>
    </footer>
  </main>
        
</>);
        }