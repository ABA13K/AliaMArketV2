// app/product/[id]/page.tsx
'use client';

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price_after_discount: string;
  original_price: string;
  discount_percentage: number;
  total_rating: number;
  image: string;
  images?: string[];
  category_id?: number;
  stock_quantity: number;
  specifications?: { name: string; value: string }[];
  features?: string[];
  category?: {
    id: number;
    name: string;
  };
  seller?: {
    id: number;
    name: string;
    rating: number;
  };
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailLoading />}>
      <ProductDetailContent />
    </Suspense>
  );
}

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details from API
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', productId);
        
        const res = await fetch(`https://mahmoudmohammed.site/api/public/home-page/products/${productId}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
        
        const response = await res.json();
        console.log('API Response:', response);
        
        if (response.data) {
          const productData = response.data;
          
          // Transform API data to match our interface
          const transformedProduct: Product = {
            id: productData.id,
            name: productData.name,
            description: productData.description || "لا يوجد وصف متوفر لهذا المنتج",
            price_after_discount: productData.price_after_discount || productData.price,
            original_price: productData.original_price || productData.price_after_discount,
            discount_percentage: productData.discount_percentage || 0,
            total_rating: productData.total_rating || 0,
            image: productData.image || '/placeholder-product.jpg',
            stock_quantity: productData.stock_quantity || productData.quantity || 10,
            category: productData.category,
            seller: productData.seller,
            // Create multiple images array from single image for gallery
            images: productData.images && productData.images.length > 0 
              ? productData.images 
              : [productData.image || '/placeholder-product.jpg']
          };
          
          setProduct(transformedProduct);
        } else {
          throw new Error('Product data not found in response');
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'حدث خطأ في تحميل المنتج');
      } finally {
        setLoading(false);
      }
    }
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Generate features from product data
  const generateFeatures = (product: Product): string[] => {
    const features: string[] = [];
    
    if (product.discount_percentage > 0) {
      features.push(`خصم ${product.discount_percentage}%`);
    }
    
    if (product.stock_quantity > 0) {
      features.push(`متوفر ${product.stock_quantity} قطعة`);
    } else {
      features.push("غير متوفر حالياً");
    }
    
    if (product.total_rating > 0) {
      features.push(`تقييم ${product.total_rating} من 5`);
    }
    
    if (product.category) {
      features.push(`الفئة: ${product.category.name}`);
    }
    
    return features;
  };

  // Generate specifications from product data
  const generateSpecifications = (product: Product) => {
    const specs = [
      { name: "السعر الأصلي", value: product.original_price },
      { name: "السعر بعد الخصم", value: product.price_after_discount },
      { name: "نسبة الخصم", value: product.discount_percentage > 0 ? `${product.discount_percentage}%` : "لا يوجد" },
      { name: "التقييم", value: `${product.total_rating} / 5` },
      { name: "الكمية المتاحة", value: product.stock_quantity.toString() },
    ];
    
    if (product.category) {
      specs.push({ name: "الفئة", value: product.category.name });
    }
    
    if (product.seller) {
      specs.push({ name: "البائع", value: product.seller.name });
    }
    
    return specs;
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price_after_discount,
      img: product.image,
      quantity: quantity,
      oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
      category: product.category?.name || "عام"
    };

    addToCart(cartItem);
    alert(`تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`);
  };

  const buyNow = () => {
    if (!product) return;
    handleAddToCart();
    router.push('/cart');
  };

  if (loading) {
    return <ProductDetailLoading />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في تحميل المنتج</h2>
          <p className="text-gray-600 mb-4">{error || "المنتج غير موجود"}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              حاول مرة أخرى
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const features = generateFeatures(product);
  const specifications = generateSpecifications(product);
  const images = product.images || [product.image];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-orange-500 transition"
          >
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة
          </button>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={() => toggleFavorite({
                id: product.id,
                name: product.name,
                price: product.price_after_discount,
                img: product.image,
                oldPrice: product.discount_percentage > 0 ? product.original_price : undefined,
              })}
              className={`p-2 rounded-full transition ${
                isFavorite(product.id) 
                  ? "text-red-500 bg-red-50" 
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <svg className="w-6 h-6" fill={isFavorite(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("تم نسخ رابط المنتج");
                }
              }}
              className="p-2 text-gray-400 hover:text-orange-500 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-product.jpg';
                }}
              />
              
              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
              
              {/* Discount Badge */}
              {product.discount_percentage > 0 && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  خصم {product.discount_percentage}%
                </span>
              )}
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index ? "border-orange-500 scale-105" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - صورة ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-3">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.total_rating) ? "text-yellow-400" : "text-gray-300"}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.total_rating} / 5
                </span>
              </div>
            </div>
            
            {/* Price */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold text-orange-600">{product.price_after_discount}</span>
                {product.discount_percentage > 0 && product.original_price !== product.price_after_discount && (
                  <span className="text-lg text-gray-500 line-through">{product.original_price}</span>
                )}
              </div>
              {product.discount_percentage > 0 && (
                <p className="text-sm text-orange-600 mt-1">
                  وفر {product.discount_percentage}% من السعر الأصلي
                </p>
              )}
              <p className={`text-sm mt-1 ${product.stock_quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock_quantity > 0 ? `متوفر (${product.stock_quantity} قطعة)` : "غير متوفر"}
              </p>
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">الوصف</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">المميزات</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">الكمية:</h3>
              <div className="flex items-center gap-3 w-fit border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={decreaseQuantity}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                  disabled={product.stock_quantity > 0 && quantity >= product.stock_quantity}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {product.stock_quantity > 0 && (
                <p className="text-sm text-gray-500 mt-1">الحد الأقصى: {product.stock_quantity} قطعة</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                </svg>
                أضف إلى السلة
              </button>
              <button 
                onClick={buyNow}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                شراء الآن
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {specifications.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 p-6 pb-4">معلومات المنتج</h2>
            <div className="border-t border-gray-100">
              {specifications.map((spec, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <span className="w-1/3 font-medium text-gray-700">{spec.name}</span>
                  <span className="w-2/3 text-gray-600">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ProductDetailLoading() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-4 space-x-reverse">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery Skeleton */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Details Skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}