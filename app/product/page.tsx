// app/product/[id]/page.tsx
'use client';

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface ProductImage {
  id: number;
  image_path: string;
}

interface ProductProperty {
  id_properties: number;
  key: string;
  value: string;
}

interface ProductVariant {
  id: number;
  name: string;
  price: string;
}

interface Product {
  id_product: number;
  name: string;
  description: string;
  main_image: string;
  original_price: string;
  discount_percentage: number;
  price_after_discount: string;
  quantity: number;
  total_rating: number;
  sales_count: number;
  is_active: number;
  vendor_id: number;
  sub_category_id: number;
  sub_category_name: string;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  properties: ProductProperty[];
  variants: ProductVariant[];
}

interface SimilarProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
}

interface ApiResponse {
  message: string;
  data: {
    product: Product;
    similar_products: SimilarProduct[];
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
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
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
        
        const res = await fetch(`https://mahmoudmohammed.site/api/public/products/${productId}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
        
        const response: ApiResponse = await res.json();
        console.log('API Response:', response);
        
        if (response.data && response.data.product) {
          setProduct(response.data.product);
          setSimilarProducts(response.data.similar_products || []);
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

  // Get all product images including main image
  const getAllImages = (product: Product): string[] => {
    const images: string[] = [];
    
    // Add main image if available
    if (product.main_image) {
      images.push(product.main_image);
    }
    
    // Add additional images from images array
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img.image_path && !images.includes(img.image_path)) {
          images.push(img.image_path);
        }
      });
    }
    
    // If no images, add placeholder
    if (images.length === 0) {
      images.push('/placeholder-product.jpg');
    }
    
    return images;
  };

  // Format price with currency
  const formatPrice = (price: string): string => {
    try {
      const numericPrice = parseFloat(price);
      return new Intl.NumberFormat('ar-SY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numericPrice) + ' ل.س';
    } catch {
      return price + ' ل.س';
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id_product,
      name: product.name,
      price: formatPrice(product.price_after_discount),
      img: product.main_image || '/placeholder-product.jpg',
      quantity: quantity,
      oldPrice: product.discount_percentage > 0 ? formatPrice(product.original_price) : undefined,
      category: product.sub_category_name
    };

    addToCart(cartItem);
    
    // Show success message in Arabic
    const successMessage = `تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`;
    alert(successMessage);
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
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  const images = getAllImages(product);
  const hasDiscount = product.discount_percentage > 0;
  const isOutOfStock = product.quantity === 0;
  const hasImages = images.length > 0 && images[0] !== '/placeholder-product.jpg';

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
                id: product.id_product,
                name: product.name,
                price: formatPrice(product.price_after_discount),
                img: product.main_image || '/placeholder-product.jpg',
                oldPrice: hasDiscount ? formatPrice(product.original_price) : undefined,
              })}
              className={`p-2 rounded-full transition ${
                isFavorite(product.id_product) 
                  ? "text-red-500 bg-red-50" 
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <svg className="w-6 h-6" fill={isFavorite(product.id_product) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
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
              {hasImages ? (
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
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>لا توجد صورة للمنتج</p>
                  </div>
                </div>
              )}
              
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
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  خصم {product.discount_percentage}%
                </span>
              )}
              
              {/* Out of Stock Badge */}
              {isOutOfStock && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  غير متوفر
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
            {/* Title and Category */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-right">{product.name}</h1>
              <div className="flex items-center mt-2 justify-end">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.sub_category_name}
                </span>
              </div>
            </div>
            
            {/* Rating and Sales */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-500">{product.sales_count} مبيعات</span>
              <span className="text-sm text-gray-400 mx-3">•</span>
              <span className="text-sm text-gray-500">
                {product.total_rating > 0 ? `${product.total_rating} / 5` : "لا توجد تقييمات بعد"}
              </span>
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
            </div>
            
            {/* Price */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-right">
              <div className="flex items-end gap-3 justify-end">
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(product.price_after_discount)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-orange-600 mt-1 text-right">
                  وفر {product.discount_percentage}% من السعر الأصلي
                </p>
              )}
              <p className={`text-sm mt-1 text-right ${!isOutOfStock ? "text-green-600" : "text-red-600"}`}>
                {!isOutOfStock ? `متوفر (${product.quantity} قطعة)` : "غير متوفر"}
              </p>
            </div>
            
            {/* Description */}
            <div className="text-right">
              <h3 className="text-lg font-medium text-gray-800 mb-2">الوصف</h3>
              <p className="text-gray-700 leading-relaxed text-right">
                {product.description || "لا يوجد وصف متوفر لهذا المنتج"}
              </p>
            </div>
            
            {/* Quantity */}
            {!isOutOfStock && (
              <div className="text-right">
                <h3 className="text-lg font-medium text-gray-800 mb-2">الكمية:</h3>
                <div className="flex items-center gap-3 w-fit border border-gray-300 rounded-lg overflow-hidden mr-auto">
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                    disabled={quantity >= product.quantity}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">الحد الأقصى: {product.quantity} قطعة</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                </svg>
                أضف إلى السلة
              </button>
              <button 
                onClick={buyNow}
                disabled={isOutOfStock}
                className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                شراء الآن
              </button>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden text-right">
          <h2 className="text-xl font-bold text-gray-800 p-6 pb-4">معلومات المنتج</h2>
          <div className="border-t border-gray-100">
            <div className="flex items-center p-4 bg-gray-50">
              <span className="w-1/3 font-medium text-gray-700 min-w-[120px]">رقم المنتج</span>
              <span className="w-2/3 text-gray-600">{product.id_product}</span>
            </div>
            <div className="flex items-center p-4 bg-white">
              <span className="w-1/3 font-medium text-gray-700 min-w-[120px]">الفئة</span>
              <span className="w-2/3 text-gray-600">{product.sub_category_name}</span>
            </div>
            <div className="flex items-center p-4 bg-gray-50">
              <span className="w-1/3 font-medium text-gray-700 min-w-[120px]">الحالة</span>
              <span className="w-2/3 text-gray-600">{product.is_active ? "نشط" : "غير نشط"}</span>
            </div>
            <div className="flex items-center p-4 bg-white">
              <span className="w-1/3 font-medium text-gray-700 min-w-[120px]">تاريخ الإضافة</span>
              <span className="w-2/3 text-gray-600">
                {new Date(product.created_at).toLocaleDateString('ar-SY')}
              </span>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12 text-right">
            <h2 className="text-xl font-bold text-gray-800 mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map(similarProduct => (
                <div key={similarProduct.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
                  <Link href={`/product/${similarProduct.id}`} className="block">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={similarProduct.image || '/placeholder-product.jpg'}
                        alt={similarProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4 text-right">
                      <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{similarProduct.name}</h3>
                      <div className="flex items-center mb-2 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(similarProduct.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="font-bold text-orange-600">{formatPrice(similarProduct.price)}</p>
                    </div>
                  </Link>
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