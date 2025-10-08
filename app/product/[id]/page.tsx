// app/product/[id]/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../context/CartContext";

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
  images: any[];
  properties: any[];
  variants: any[];
}

export default function ProductDetailPage() {
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
        
        const res = await fetch(`https://mahmoudmohammed.site/api/public/products/${productId}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
        
        const response = await res.json();
        console.log('API Response:', response);
        
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          throw new Error('Product data not found in response');
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'حدث خطأ في تحميل المنتج');
        
        // Fallback to mock data for testing
        const mockProduct: Product = {
          id_product: parseInt(productId),
          name: "مرتديلا هنا",
          description: "مرتديلا هنا  قياس وسط",
          main_image: "https://mahmoudmohammed.site/products/01vGIL83NCffDgyAcUiPFFXagshEcdOCytNKUvlj.webp",
          original_price: "120.00",
          discount_percentage: 0,
          price_after_discount: "120.00",
          quantity: 21,
          total_rating: 0,
          sales_count: 0,
          is_active: 1,
          vendor_id: 1,
          sub_category_id: 18,
          sub_category_name: "معلبات",
          created_at: "2025-09-28T11:10:51.000000Z",
          updated_at: "2025-09-28T11:10:51.000000Z",
          images: [],
          properties: [],
          variants: []
        };
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    }
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (price: string): string => {
    try {
      const numericPrice = parseFloat(price);
      return new Intl.NumberFormat('ar-SY').format(numericPrice) + ' ل.س';
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
      img: product.main_image,
      quantity: quantity,
      oldPrice: product.discount_percentage > 0 ? formatPrice(product.original_price) : undefined,
      category: product.sub_category_name
    };

    addToCart(cartItem);
    alert(`تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`);
  };

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في تحميل المنتج</h2>
          <p className="text-gray-600 mb-4">{error || "المنتج غير موجود"}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discount_percentage > 0;
  const isOutOfStock = product.quantity === 0;

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
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src={product.main_image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-product.jpg';
                }}
              />
              
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
                {product.description}
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
          </div>
        </div>
      </main>
    </div>
  );
}