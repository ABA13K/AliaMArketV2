"use client";

import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

// Custom SVG icons
const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg className="w-6 h-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ProductDetailPage = () => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Mock product data - replace with API call using productId
  const product = {
    id: productId || "apple-watch-series-7",
    name: "ساعة ذكية ماركة أبل - الجيل السابع",
    description: "ساعة ذكية متطورة بشاشة Retina دقيقة توفر تتبعًا متقدمًا للصحة واللياقة البدنية مع مقاومة للماء حتى 50 متراً.",
    price: "1,250,000 ل.س",
    oldPrice: "1,500,000 ل.س",
    discount: 15,
    rating: 4.5,
    reviews: 124,
    isNew: true,
    colors: [
      { name: "أسود", code: "bg-gray-900" },
      { name: "فضي", code: "bg-gray-300" },
      { name: "ذهبي", code: "bg-amber-300" },
      { name: "أزرق", code: "bg-blue-500" }
    ],
    sizes: ["38mm", "40mm", "42mm", "44mm"],
    images: [
      "/categories/clothing.jpg",
      "/categories/phones.jpg",
      "/categories/clothing.jpg",
      "/categories/clothing.jpg",
      "/categories/clothing.jpg"     
    ],
    features: [
      "شاشة Retina دقيقة",
      "مقاومة الماء حتى 50م",
      "تتبع اللياقة والنوم",
      "بطارية تدوم 18 ساعة",
      "شاحن سريع متضمن"
    ],
    specifications: [
      { name: "الماركة", value: "أبل" },
      { name: "الموديل", value: "Series 7" },
      { name: "حجم الشاشة", value: "1.9 بوصة" },
      { name: "الدقة", value: "396x484 بيكسل" },
      { name: "مقاومة الماء", value: "50 متر" },
      { name: "مدة البطارية", value: "18 ساعة" },
      { name: "نظام التشغيل", value: "watchOS 8" },
      { name: "المعالج", value: "Apple S7" },
      { name: "التخزين", value: "32GB" },
      { name: "الوزن", value: "32 جرام" }
    ],
    relatedProducts: [
      {
        id: 3,
        name: "سماعات لاسلكية",
        price: "450,000 ل.س",
        image: "/categories/clothing.jpg",
        rating: 4.7,
      },
      {
        id: 7,
        name: "هاتف ذكي جديد",
        price: "3,500,000 ل.س",
        image: "/categories/clothing.jpg",
        rating: 4.6,
      },
      {
        id: 6,
        name: "حذاء رياضي",
        price: "620,000 ل.س",
        image: "/categories/clothing.jpg",
        rating: 4.4,
      },
    ]
  };

  // Image navigation
  const handlePrevImage = () => {
    setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  // Slider drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNextImage();
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrevImage();
    }
  };

  // Auto-scroll to selected thumbnail
  useEffect(() => {
    if (sliderRef.current) {
      const thumb = sliderRef.current.children[selectedImage] as HTMLElement;
      if (thumb) {
        const containerWidth = sliderRef.current.offsetWidth;
        const thumbLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
       
        sliderRef.current.scrollTo({
          left: thumbLeft - (containerWidth / 2) + (thumbWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedImage]);

  // Quantity controls
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("يرجى اختيار اللون والمقاس قبل الإضافة للسلة");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.images[0],
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      oldPrice: product.oldPrice || "",
      category: "electronics"
    };

    addToCart(cartItem);
    alert(`تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`);
  };

  // Buy now
  const buyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert("يرجى اختيار اللون والمقاس قبل الشراء");
      return;
    }
    alert("جاري التوجه لصفحة الدفع...");
  };

  // Share product
  const shareProduct = () => {
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
  };

  return (
    <>
      <Head>
        <title>{product.name} - Alia Market</title>
        <meta name="description" content={product.description} />
      </Head>

      <div dir="rtl" className="bg-gray-50 min-h-screen">
        {/* Top navigation */}
        <nav className="bg-blue-800 shadow-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-orange-300 transition"
            >
              <ArrowLeftIcon />
              العودة
            </button>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                onClick={shareProduct}
                className="p-2 text-white hover:text-orange-300 transition transform hover:scale-110"
                aria-label="مشاركة المنتج"
              >
                <ShareIcon />
              </button>
              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className="p-2 text-white hover:text-orange-300 transition transform hover:scale-110"
                aria-label="إضافة للمفضلة"
              >
                <HeartIcon filled={isWishlist} />
              </button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image gallery with enhanced slider */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Main image with swipe support */}
              <div 
                className="relative aspect-square overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Navigation buttons */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition"
                  aria-label="الصورة السابقة"
                >
                  <ChevronLeftIcon />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition"
                  aria-label="الصورة التالية"
                >
                  <ChevronRightIcon />
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage + 1} / {product.images.length}
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-medium">جديد</span>
                  )}
                  {product.discount && (
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      خصم {product.discount}%
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail slider with drag support */}
              <div className="p-4 border-t border-gray-100">
                <div 
                  ref={sliderRef}
                  className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index ? "border-orange-500 scale-105" : "border-gray-200"
                      } ${isDragging ? 'pointer-events-none' : ''}`}
                      aria-label={`عرض الصورة ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - صورة ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="space-y-6">
              {/* Title and rating */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center mt-3">
                  <div className="flex items-center mr-2" role="img" aria-label={`تقييم ${product.rating} من 5 نجوم`}>
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews} تقييم)
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="bg-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-end gap-3">
                  <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">{product.oldPrice}</span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-sm text-orange-600 mt-1">
                    وفر {product.discount}% من السعر الأصلي
                  </p>
                )}
              </div>
              
              {/* Colors */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  اختر اللون: {selectedColor && <span className="text-orange-600">({selectedColor})</span>}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${color.code} ${
                        selectedColor === color.name ? "ring-2 ring-offset-2 ring-orange-500" : "border-gray-200"
                      }`}
                      title={color.name}
                      aria-label={`اختر اللون ${color.name}`}
                    >
                      {selectedColor === color.name && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  اختر المقاس: {selectedSize && <span className="text-orange-600">({selectedSize})</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition ${
                        selectedSize === size
                          ? "bg-blue-700 text-white border-blue-700"
                          : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                      }`}
                      aria-label={`اختر المقاس ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">الكمية:</h3>
                <div className="flex items-center gap-3 w-fit border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                    disabled={quantity <= 1}
                    aria-label="تقليل الكمية"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-1 text-lg font-medium" aria-label={`الكمية: ${quantity}`}>{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="زيادة الكمية"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Features */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">المميزات:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedColor || !selectedSize}
                >
                  <ShoppingCartIcon />
                  أضف إلى السلة
                </button>
                <button 
                  onClick={buyNow}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedColor || !selectedSize}
                >
                  شراء الآن
                </button>
              </div>
            </div>
          </div>

          {/* Additional sections */}
          <div className="mt-16">
            {/* Detailed description */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">وصف المنتج</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <h2 className="text-xl font-bold text-gray-800 p-6 pb-4">المواصفات الفنية</h2>
              <div className="border-t border-gray-100">
                {product.specifications.map((spec, index) => (
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
            
            {/* Related products */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">منتجات ذات صلة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.relatedProducts.map(related => (
                  <div key={related.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <Link href={`/product?id=${related.id}`} className="block">
                      <div className="relative aspect-square bg-gray-100">
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{related.name}</h3>
                        <div className="flex items-center mb-2" role="img" aria-label={`تقييم ${related.rating} من 5 نجوم`}>
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ${i < Math.floor(related.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="font-bold text-orange-600">{related.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetailPage;