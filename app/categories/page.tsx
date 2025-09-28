// app/categories/page.tsx
'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface Category {
  id: number;
  name: string;
  image: string;
  products_count: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { cartCount } = useCart();

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
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        
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
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  // Mobile version
  if (isMobile) {
    return (
      <>
        <Head>
          <title dir="rtl">الفئات - Alia Market</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        {/* Mobile Header */}
        <header dir="rtl" className="sticky top-0 z-40 bg-blue-900 text-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            
            <div className="flex-1 mx-4 text-center">
              <h1 className="text-lg font-bold">جميع الفئات</h1>
            </div>
            
            <Link href="/cart" className="text-white relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            </Link>
          </div>
        </header>

        <main dir="rtl" className="pb-20 min-h-screen bg-gray-50">
          {/* Search Section */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="container mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في الفئات..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black bg-gray-50"
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="container mx-auto px-4 py-6 text-center">
              <div className="bg-white rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">حدث خطأ</h3>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  حاول مرة أخرى
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              {/* Stats */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">جميع الفئات</h2>
                    <p className="text-gray-500 text-sm mt-1">{categories.length} فئة رئيسية</p>
                  </div>
                  <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium">الإجمالي: {categories.reduce((sum, cat) => sum + cat.products_count, 0)} منتج</span>
                  </div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/sub-categories/${category.id}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={category.image || "/placeholder-category.jpg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-category.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-sm mb-1">{category.name}</h3>
                        <p className="text-white/90 text-xs">{category.products_count} منتج</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty State */}
              {categories.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد فئات</h3>
                  <p className="text-gray-500">لا توجد فئات متاحة حالياً</p>
                </div>
              )}
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
          <Link href="/categories" className="flex flex-col items-center text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1">الفئات</span>
          </Link>
          <Link href="/favorites" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
      </>
    );
  }

  // Desktop version
  return (
    <>
      <Head>
        <title dir="rtl">الفئات - Alia Market</title>
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
                placeholder="ابحث في الفئات..."
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
            <Link href="/categories" className="text-orange-300 font-medium transition">الفئات</Link>
            <Link href="/favorites" className="text-white hover:text-orange-300 font-medium transition">المفضلة</Link>
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
          {/* Breadcrumb */}
          <nav dir="rtl" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-orange-600">الرئيسية</Link>
            <span>/</span>
            <span className="text-gray-800">الفئات</span>
          </nav>

          {/* Page Header */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">تصفح الفئات</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              اكتشف آلاف المنتجات من مختلف الفئات والتصنيفات
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{categories.length}</div>
                <div className="text-gray-500 text-sm">فئة رئيسية</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {categories.reduce((sum, cat) => sum + cat.products_count, 0).toLocaleString()}
                </div>
                <div className="text-gray-500 text-sm">منتج متاح</div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">حدث خطأ</h2>
              <p className="text-red-500 mb-6 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
              >
                حاول مرة أخرى
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/sub-categories/${category.id}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden relative cursor-pointer transform hover:-translate-y-2 duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder-category.jpg"}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-category.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-bold text-xl text-white mb-1">{category.name}</h3>
                      <p className="text-gray-200 text-sm">{category.products_count.toLocaleString()} منتج</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium">تصفح القسم</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && categories.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد فئات</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                لا توجد فئات متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
              >
                العودة إلى الرئيسية
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}