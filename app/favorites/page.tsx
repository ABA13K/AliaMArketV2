// app/favorites/page.tsx
'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart, cartCount } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1,
      oldPrice: product.oldPrice,
      category: product.category
    });
    alert(`تمت إضافة ${product.name} إلى السلة`);
  };

  const handleRemoveAllFavorites = () => {
    if (confirm('هل تريد حذف جميع المنتجات من المفضلة؟')) {
      favorites.forEach(product => toggleFavorite(product));
    }
  };

  // Mobile version
  if (isMobile) {
    return (
      <>
        <Head>
          <title dir="rtl">المفضلة - Alia Market</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        {/* Mobile Header */}
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
            
            <div className="flex-1 mx-4 text-center">
              <h1 className="text-lg font-bold">المفضلة</h1>
            </div>
            
            <Link href="/cart" className="text-white relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div dir="rtl" className="absolute top-full left-0 right-0 bg-white shadow-lg z-50">
              <div className="container mx-auto px-4 py-3">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-gray-800 font-medium" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
                  <Link href="/categories" className="text-gray-800 font-medium" onClick={() => setMenuOpen(false)}>الفئات</Link>
                  <Link href="/favorites" className="text-orange-600 font-medium" onClick={() => setMenuOpen(false)}>المفضلة</Link>
                  <Link href="/offers" className="text-gray-800 font-medium" onClick={() => setMenuOpen(false)}>العروض</Link>
                  <Link href="/account" className="text-gray-800 font-medium" onClick={() => setMenuOpen(false)}>حسابي</Link>
                  <div className="pt-4 border-t border-gray-200">
                    <Link href="/login" className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium" onClick={() => setMenuOpen(false)}>
                      تسجيل الدخول
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </header>

        <main dir="rtl" className="pb-20 min-h-screen bg-gray-50">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">لا توجد منتجات في المفضلة</h2>
              <p className="text-gray-500 mb-6">أضف منتجات إلى المفضلة لتظهر هنا</p>
              <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium">
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  منتجاتك المفضلة ({favorites.length})
                </h2>
                <button 
                  onClick={handleRemoveAllFavorites}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  حذف الكل
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {favorites.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative aspect-square">
                        <Image
                          src={product.img || "/placeholder-product.jpg"}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-product.jpg";
                          }}
                        />
                        {product.oldPrice && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                            خصم
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-sm font-bold text-orange-600">{product.price}</p>
                          {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through">{product.oldPrice}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="text-gray-700 hover:text-orange-600 p-1"
                            title="أضف إلى السلة"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => toggleFavorite(product)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="إزالة من المفضلة"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav dir="rtl" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-40">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
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
          <Link href="/favorites" className="flex flex-col items-center text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">المفضلة</span>
          </Link>
          <Link href="/account" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">حسابي</span>
          </Link>
        </nav>

        <style jsx global>{`
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

  // Desktop version
  return (
    <>
      <Head>
        <title dir="rtl">المفضلة - Alia Market</title>
      </Head>

      {/* Desktop Header */}
      <header className="sticky top-0 z-40 bg-blue-900 text-white shadow-lg">
        <div dir="rtl" className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <span className="ml-4">Alia Market</span>
          </Link>
          
          <div dir="rtl" className="flex-1 max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتجك المفضل"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <nav dir="rtl" className="hidden md:flex items-stretch space-x-8 mr-10">
            <Link href="/" className="text-white hover:text-orange-300 font-medium transition ml-5">الرئيسية</Link>
            <Link href="/categories" className="text-white hover:text-orange-300 font-medium transition">الفئات</Link>
            <Link href="/favorites" className="text-orange-300 font-medium transition">المفضلة</Link>
            <Link href="/offers" className="text-white hover:text-orange-300 font-medium transition">العروض</Link>
            <Link href="/account" className="text-white hover:text-orange-300 font-medium transition">حسابي</Link>
          </nav>
          
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

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div dir="rtl" className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">قائمة المفضلة</h1>
            <p className="text-gray-600">المنتجات التي أضفتها إلى المفضلة</p>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد منتجات في المفضلة</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                أضف منتجات إلى المفضلة لتظهر هنا. يمكنك العودة لتصفح المنتجات وإضافة ما يعجبك.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <>
              {/* Stats and Actions */}
              <div dir="rtl" className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      عدد المنتجات: <span className="text-orange-600">{favorites.length}</span>
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">يمكنك إضافة هذه المنتجات إلى السلة أو إزالتها من المفضلة</p>
                  </div>
                  <div className="flex gap-3">
                    <Link 
                      href="/"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                    >
                      متابعة التسوق
                    </Link>
                    <button 
                      onClick={handleRemoveAllFavorites}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      حذف الكل
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(product => (
                  <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={product.img || "/placeholder-product.jpg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-product.jpg";
                          }}
                        />
                        {product.oldPrice && (
                          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            خصم
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 h-14">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-orange-600 text-lg">{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          أضف للسلة
                        </button>
                        <button 
                          onClick={() => toggleFavorite(product)}
                          className="w-12 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center"
                          title="إزالة من المفضلة"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}