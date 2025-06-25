"use client";

import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ل.س";
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("سلة التسوق فارغة");
      return;
    }
    
    // Here you would typically send the order to your backend
    toast.success("تم تقديم الطلب بنجاح!");
    clearCart();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">إتمام الطلب</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">تفاصيل الطلب</h3>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="px-4 py-5 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        {item.color && <p className="text-sm text-gray-500">اللون: {item.color}</p>}
                        {item.size && <p className="text-sm text-gray-500">المقاس: {item.size}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-orange-600">{item.price}</p>
                        <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">المجموع</h3>
              <p className="text-xl font-bold text-orange-600">
                {formatPrice(cartTotal)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">معلومات الشحن</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="full-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  العنوان
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  ملاحظات (اختياري)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </form>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">طريقة الدفع</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="cash-on-delivery"
                  name="payment-method"
                  type="radio"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  defaultChecked
                />
                <label htmlFor="cash-on-delivery" className="mr-3 block text-sm font-medium text-gray-700">
                  الدفع عند الاستلام
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="payment-method"
                  type="radio"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <label htmlFor="credit-card" className="mr-3 block text-sm font-medium text-gray-700">
                  بطاقة ائتمان
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link
            href="/cart"
            className="mr-4 bg-gray-100 border border-gray-300 rounded-md py-3 px-6 text-base font-medium text-gray-700 hover:bg-gray-200"
          >
            العودة للسلة
          </Link>
          <button
            onClick={handlePlaceOrder}
            className="bg-orange-600 border border-transparent rounded-md py-3 px-6 text-base font-medium text-white hover:bg-orange-700"
          >
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  );
}