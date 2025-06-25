

'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaBitcoin, FaMoneyBillWave } from 'react-icons/fa';

type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  category: string;
  img: string;
  rating: number;
  color?: string;
  size?: string;
  quantity: number;
};

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartCount,
    addToCart,
    applyDiscount,
    discount
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [btcRate, setBtcRate] = useState<number | null>(null);

  // بيانات المنتجات الافتراضية
  const defaultProducts: Product[] = [
 
  ];

  // جلب سعر البتكوين (محاكاة)
  useEffect(() => {
    // في التطبيق الحقيقي، ستجلب هذه القيمة من API
    setBtcRate(50000000); // 1 BTC = 50,000,000 SYP للعرض التوضيحي
  }, []);

  // إضافة منتجات افتراضية إذا كانت السلة فارغة
  useEffect(() => {
    if (cart.length === 0 && process.env.NODE_ENV === 'development') {
      defaultProducts.forEach(product => {
        addToCart(product);
      });
    }
  }, [addToCart, cart.length]);

  const handleCheckout = () => {
    if (cartCount === 0) {
      alert("سلة التسوق فارغة");
      return;
    }
    if (!selectedPayment) {
      alert("الرجاء اختيار طريقة الدفع");
      return;
    }

    switch(selectedPayment) {
      case 'paypal':
        alert("سيتم توجيهك إلى صفحة الدفع عبر PayPal");
        break;
      case 'bitcoin':
        alert("سيتم عرض عنوان محفظة البتكوين للدفع");
        break;
      default:
        alert("سيتم إتمام عملية الدفع");
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("الرجاء إدخال كود الخصم");
      return;
    }

    const validCoupons: Record<string, number> = {
      "خصم20": 20,
      "تخفيض30": 30,
      "عرض15": 15
    };

    if (validCoupons[couponCode]) {
      const discountPercentage = validCoupons[couponCode];
      applyDiscount(discountPercentage);
      setDiscountApplied(true);
      alert(`تم تطبيق خصم ${discountPercentage}% بنجاح`);
    } else {
      alert("كود الخصم غير صحيح أو منتهي الصلاحية");
    }
  };

  const handleRemoveCoupon = () => {
    applyDiscount(0);
    setDiscountApplied(false);
    setCouponCode('');
    alert("تم إزالة كود الخصم");
  };

  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  const calculateSubtotal = (): number => {
    return cart.reduce((total, item) => {
      return total + (parsePrice(item.price) * item.quantity);
    }, 0);
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const shipping = 50000;
    const discountedSubtotal = discount ? subtotal * (1 - discount / 100) : subtotal;
    return discountedSubtotal + shipping;
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ar-SY') + ' ل.س';
  };

  const calculateBtcAmount = (): string => {
    if (!btcRate) return 'جاري التحميل...';
    const total = calculateTotal();
    const btcAmount = total / btcRate;
    return btcAmount.toFixed(8) + ' BTC';
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">سلة التسوق</h1>
          <Link href="/" className="text-orange-600 hover:text-orange-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            متابعة التسوق
          </Link>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a20 11-4 0 2 2 0 014 0z" />
</svg>
</div>
<h2 className="mt-4 text-xl font-medium text-gray-900">سلة التسوق فارغة</h2>
<p className="mt-2 text-gray-500">ابدأ بإضافة بعض المنتجات من المتجر</p>
<div className="mt-6">
<Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700" >
تصفح المنتجات
</Link>
</div>
</div>
) : (
<div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
<div className="lg:col-span-8">
<div className="bg-white shadow-sm rounded-lg overflow-hidden">
<div className="px-6 py-5 border-b border-gray-200">
<h3 className="text-lg font-medium text-gray-900">
لديك {cartCount} منتج{cartCount > 1 ? 'ات' : ''} في سلة التسوق
</h3>
</div>
<ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={`${item.id}-${index}`} className="px-6 py-5">
                  <div className="flex">
                    <div className="flex-shrink-0 h-32 w-32 relative rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw, 128px"
                      />
                    </div>
                    
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                          {item.color && (
                            <div className="mt-2 flex items-center">
                              <span className="text-sm text-gray-500">اللون:</span>
                              <span className="mr-2 text-sm font-medium">{item.color}</span>
                            </div>
                          )}
                          {item.size && (
                            <div className="mt-1 flex items-center">
                              <span className="text-sm text-gray-500">المقاس:</span>
                              <span className="mr-2 text-sm font-medium">{item.size}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-600">{item.price}</p>
                          {item.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">{item.oldPrice}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${index}`} className="ml-2 text-sm text-gray-700">
                            الكمية:
                          </label>
                          <select
                            id={`quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, item.color, item.size, parseInt(e.target.value))}
                            className="mr-2 border border-gray-300 rounded-md py-1 px-2 text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <button
                          onClick={() => {
                            removeFromCart(item.id, item.color, item.size);
                            alert("تم إزالة المنتج من السلة");
                          }}
                          className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          إزالة
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 lg:mt-0 lg:col-span-4">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">ملخص الطلب</h3>
            
            {/* قسم كود الخصم */}
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                كود الخصم
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="أدخل كود الخصم"
                  disabled={discountApplied}
                />
                {discountApplied ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="mr-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                  >
                    إزالة
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="mr-2 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition"
                  >
                    تطبيق
                  </button>
                )}
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">الخصم ({discount}%)</span>
                  <span className="font-medium text-green-600">
                    -{formatPrice(calculateSubtotal() * (discount / 100))}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">تكاليف الشحن</span>
                <span className="font-medium">50,000 ل.س</span>
              </div>
              
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-medium">المجموع الكلي</span>
                <span className="text-lg font-bold text-orange-600">
                  {formatPrice(calculateTotal())}
                </span>
              </div>

              {selectedPayment === 'bitcoin' && btcRate && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>المبلغ بالبتكوين:</span>
                  <span>{calculateBtcAmount()}</span>
                </div>
              )}
            </div>
            
            {/* طرق الدفع */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">طرق الدفع المتاحة</h4>
              
              <div className="space-y-3">
                {/* بطاقات ائتمان/خصم */}
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${selectedPayment === 'credit' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPayment('credit')}
                >
                  <div className="flex space-x-3 space-x-reverse ml-3">
                    <FaCcVisa className="h-6 w-6 text-blue-800" />
                    <FaCcMastercard className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-sm font-medium">بطاقة ائتمان/خصم</span>
                </div>

                {/* باي بال */}
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${selectedPayment === 'paypal' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPayment('paypal')}
                >
                  <FaPaypal className="h-6 w-6 text-blue-500 ml-3" />
                  <span className="text-sm font-medium">باي بال</span>
                </div>

                {/* بتكوين */}
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${selectedPayment === 'bitcoin' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPayment('bitcoin')}
                >
                  <FaBitcoin className="h-6 w-6 text-orange-500 ml-3" />
                  <span className="text-sm font-medium">بتكوين</span>
                </div>

                {/* الدفع عند الاستلام */}
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${selectedPayment === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPayment('cash')}
                >
                  <FaMoneyBillWave className="h-6 w-6 text-green-500 ml-3" />
                  <span className="text-sm font-medium">الدفع عند الاستلام</span>
                </div>
              </div>
            </div>

            {selectedPayment === 'bitcoin' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p>سيتم توجيهك إلى محفظة البتكوين الخاصة بك لإتمام الدفع</p>
                {btcRate && (
                  <p className="mt-1 text-xs">1 BTC = {formatPrice(btcRate)} (سعر تقديري)</p>
                )}
              </div>
            )}

            {/* زر الدفع */}
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={!selectedPayment}
                className={`w-full bg-orange-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-orange-700 shadow-sm flex items-center justify-center ${!selectedPayment ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {selectedPayment === 'paypal' ? (
                  <>
                    <FaPaypal className="ml-2 h-5 w-5" />
                    الدفع عبر باي بال
                  </>
                ) : selectedPayment === 'bitcoin' ? (
                  <>
                    <FaBitcoin className="ml-2 h-5 w-5" />
                    الدفع بالبتكوين
                  </>
                ) : selectedPayment === 'cash' ? (
                  "تأكيد الطلب"
                ) : (
                  "المتابعة إلى الدفع"
                )}
              </button>
            </div>

            {/* زر تفريغ السلة */}
            <div className="mt-4">
            <button
  onClick={() => {
    if (window.confirm('هل أنت متأكد من رغبتك في تفريغ سلة التسوق بالكامل؟')) {
      try {
        clearCart();
        // Don't need alert here - the UI should update automatically
      } catch (error) {
        console.error('Failed to clear cart:', error);
        alert('حدث خطأ أثناء محاولة تفريغ السلة');
      }
    }
  }}
  disabled={cart.length === 0}
  className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  تفريغ السلة
</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
);
}