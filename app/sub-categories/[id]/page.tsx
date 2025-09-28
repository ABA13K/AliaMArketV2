// app/sub-categories/[id]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

interface SubCategory {
  id: number;
  name: string;
  image: string;
  products_count: number;
}

interface Product {
  id: number;
  name: string;
  original_price: string;
  discount_percentage: number;
  price_after_discount: string;
  total_rating: number;
  image: string;
  category_id: number;
}

export default function SubCategoriesPage() {
  const params = useParams();
  const mainCategoryId = params.id as string;
  
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { addToCart, toggleFavorite, isFavorite, cartCount } = useCart();

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

  // Fetch sub-categories
  useEffect(() => {
    async function fetchSubCategories() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(
          `https://mahmoudmohammed.site/api/public/home-page/main-categories/${mainCategoryId}/sub-categories`
        );
        
        if (!res.ok) {
          throw new Error(`Failed to fetch sub-categories: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setSubCategories(response.data);
          // Auto-select first sub-category if available
          if (response.data.length > 0) {
            setSelectedSubCategory(response.data[0].id);
          }
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching sub-categories:', err);
      } finally {
        setLoading(false);
      }
    }
    
    if (mainCategoryId) {
      fetchSubCategories();
    }
  }, [mainCategoryId]);

  // Fetch products when sub-category is selected
  useEffect(() => {
    async function fetchProducts() {
      if (!selectedSubCategory) return;
      
      try {
        setLoadingProducts(true);
        
        const res = await fetch(
          `https://mahmoudmohammed.site/api/public/products/sub-categories/${selectedSubCategory}`
        );
        
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        
        const response = await res.json();
        
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }
    
    fetchProducts();
  }, [selectedSubCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price_after_discount,
      img: product.image,
      quantity: 1,
      oldPrice: product.discount_percentage > 0 ? product.original_price : undefined
    });
    alert(`تمت إضافة ${product.name} إلى السلة`);
  };

  // Mobile version
  if (isMobile) {
    return (
      <>
        <Head>
          <title dir="rtl">الأقسام الفرعية - Alia Market</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        {/* Mobile Header */}
        <header dir="rtl" className="sticky top-0 z-40 bg-blue-900 text-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/categories" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            
            <div className="flex-1 mx-4 text-center">
              <h1 className="text-lg font-bold">الأقسام الفرعية</h1>
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
          {loading ? (
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="container mx-auto px-4 py-6 text-center">
              <div className="bg-white rounded-xl p-6">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  حاول مرة أخرى
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Sub-categories Tabs */}
              <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
                <div className="container mx-auto px-4">
                  <div className="flex space-x-2 overflow-x-auto py-3 hide-scrollbar">
                    {subCategories.map((subCategory) => (
                      <button
                        key={subCategory.id}
                        onClick={() => setSelectedSubCategory(subCategory.id)}
                        className={`flex flex-col items-center px-4 py-2 rounded-lg whitespace-nowrap min-w-20 ${
                          selectedSubCategory === subCategory.id
                            ? 'bg-orange-100 text-orange-600 border border-orange-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <span className="text-sm font-medium text-center">{subCategory.name}</span>
                        <span className="text-xs text-gray-500 mt-1">({subCategory.products_count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="container mx-auto px-4 py-6">
                {loadingProducts ? (
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                        <div className="aspect-square bg-gray-200"></div>
                        <div className="p-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-gray-800">
                        {subCategories.find(sc => sc.id === selectedSubCategory)?.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {products.length} منتج
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                          <Link href={`/product/${product.id}`} className="block">
                            <div className="relative aspect-square">
                              <Image
                                src={product.image || "/placeholder-product.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder-product.jpg";
                                }}
                              />
                              {product.discount_percentage > 0 && (
                                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
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
                                    oldPrice: product.discount_percentage > 0 ? product.original_price : undefined
                                  });
                                }}
                                className={`absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-white transition ${
                                  isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
                                }`}
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4" 
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
                          </Link>
                          <div className="p-2">
                            <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">{product.name}</h3>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-3 w-3 ${i < Math.floor(product.total_rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-bold text-orange-600">{product.price_after_discount} ل.س</p>
                                {product.discount_percentage > 0 && (
                                  <p className="text-xs text-gray-400 line-through">{product.original_price} ل.س</p>
                                )}
                              </div>
                              <button 
                                onClick={() => handleAddToCart(product)}
                                className="text-gray-700 hover:text-orange-600"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد منتجات</h3>
                    <p className="text-gray-500">لا توجد منتجات في هذا القسم الفرعي حالياً</p>
                  </div>
                )}
              </div>
            </>
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

        <style jsx global>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
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

  // Desktop version
  return (
    <>
      <Head>
        <title dir="rtl">الأقسام الفرعية - Alia Market</title>
      </Head>

      {/* Desktop Header */}
      <header className="sticky top-0 z-40 bg-blue-900 text-white shadow-lg">
        <div dir="rtl" className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <span className="ml-4">Alia Market</span>
          </Link>
          
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

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav dir="rtl" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-orange-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-orange-600">الفئات</Link>
            <span>/</span>
            <span className="text-gray-800">الأقسام الفرعية</span>
          </nav>

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
              <p className="text-red-500 mb-4 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
              >
                حاول مرة أخرى
              </button>
            </div>
          ) : (
            <div className="flex gap-8">
              {/* Sidebar - Sub-categories */}
              <div className="w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">الأقسام الفرعية</h2>
                  <div className="space-y-2">
                    {subCategories.map((subCategory) => (
                      <button
                        key={subCategory.id}
                        onClick={() => setSelectedSubCategory(subCategory.id)}
                        className={`w-full text-right p-3 rounded-lg transition ${
                          selectedSubCategory === subCategory.id
                            ? 'bg-orange-50 text-orange-600 border border-orange-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subCategory.name}</span>
                          <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                            {subCategory.products_count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content - Products */}
              <div className="flex-1">
                {loadingProducts ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                        <div className="h-60 bg-gray-200"></div>
                        <div className="p-5">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <>
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-800">
                            {subCategories.find(sc => sc.id === selectedSubCategory)?.name}
                          </h1>
                          <p className="text-gray-500 mt-1">
                            عرض {products.length} منتج
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            مرتب حسب: الأكثر مبيعاً
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                          <Link href={`/product/${product.id}`} className="block">
                            <div className="relative h-60 overflow-hidden">
                              <Image
                                src={product.image || "/placeholder-product.jpg"}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder-product.jpg";
                                }}
                              />
                              {product.discount_percentage > 0 && (
                                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
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
                                    oldPrice: product.discount_percentage > 0 ? product.original_price : undefined
                                  });
                                }}
                                className={`absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition ${
                                  isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
                                }`}
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-5 w-5" 
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
                          </Link>
                          <div className="p-5">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-4 w-4 ${i < Math.floor(product.total_rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-500">({product.total_rating})</span>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 h-14">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="font-bold text-orange-600 text-lg">{product.price_after_discount} ل.س</span>
                              {product.discount_percentage > 0 && (
                                <span className="text-sm text-gray-400 line-through">{product.original_price} ل.س</span>
                              )}
                            </div>
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              أضف للسلة
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد منتجات</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      لا توجد منتجات في هذا القسم الفرعي حالياً. يمكنك تجربة قسم فرعي آخر.
                    </p>
                    <Link 
                      href="/categories"
                      className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
                    >
                      العودة إلى الفئات
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}