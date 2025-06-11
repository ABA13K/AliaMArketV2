"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف يجب أن يحتوي على أرقام فقط";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("تم إنشاء الحساب بنجاح!");
      }, 1500);
    }
  };

  return (
    <>
      <Head>
        <title>إنشاء حساب جديد - منصة تسوق</title>
        <meta
          name="description"
          content="انضم إلى منصتنا وابدأ رحلة التسوق أو البيع"
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-800 to-purple-700 text-white py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              أنشئ حسابك الآن
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              انضم إلى آلاف البائعين والمشترين في منصتنا المتكاملة
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:p-10 w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  معلومات التسجيل
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 text-right">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 text-right">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">+963</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 pl-16`}
                        placeholder="123 456 789"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 text-right">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      كلمة المرور
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 text-right">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 text-right">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required
                      />
                    </div>
                    <label htmlFor="terms" className="mr-2 text-sm text-gray-700">
                      أوافق على{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        الشروط والأحكام
                      </a>{" "}
                      و{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        سياسة الخصوصية
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري الإنشاء...
                      </span>
                    ) : (
                      "إنشاء حساب"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    لديك حساب بالفعل؟{" "}
                    <Link
                      href="/login"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-blue-500 to-purple-600 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Image
                    src="/signup-illustration.svg"
                    alt="Signup Illustration"
                    width={300}
                    height={300}
                    className="mx-auto mb-6"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">
                    انضم إلى مجتمعنا
                  </h3>
                  <p className="text-blue-100">
                    سواء كنت بائعاً أو مشترياً، نحن نوفر لك الأدوات اللازمة لأفضل تجربة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              لماذا تنضم إلينا؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ),
                  title: "مدفوعات آمنة",
                  description: "أنظمة دفع متعددة مع أعلى معايير الأمان",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "حماية المشتري",
                  description: "ضمان استرداد الأموال إذا لم يكن المنتج كما هو موصوف",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "توصيل سريع",
                  description: "شبكة توصيل تغطي جميع أنحاء البلاد",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="mb-4">
              © {new Date().getFullYear()} منصة تسوق - جميع الحقوق محفوظة
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                الشروط والأحكام
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                اتصل بنا
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
