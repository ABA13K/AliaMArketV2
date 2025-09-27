"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    birth_date: ""
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<"name" | "email" | "password" | "password_confirmation" | "gender" | "birth_date" | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.password_confirmation) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }
    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون至少 6 أحرف");
      return false;
    }
    if (!formData.email.includes('@')) {
      setError("البريد الإلكتروني غير صحيح");
      return false;
    }
    if (!formData.name.trim()) {
      setError("الاسم مطلوب");
      return false;
    }
    if (!formData.gender) {
      setError("يرجى اختيار الجنس");
      return false;
    }
    if (!formData.birth_date) {
      setError("تاريخ الميلاد مطلوب");
      return false;
    }
    
    // Validate birth date (should be at least 13 years old)
    const birthDate = new Date(formData.birth_date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13) {
      setError("يجب أن يكون عمرك 13 سنة على الأقل");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://mahmoudmohammed.site/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Show success toast
      toast.success('تم إنشاء الحساب بنجاح!', {
        onClose: () => {
          router.push('/login');
        }
      });
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'فشل إنشاء الحساب', {
        position: "top-right",
        rtl: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Main Card with Modern Glass Effect */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                إنشاء حساب جديد
              </h1>
              <p className="text-gray-600">
                انضم إلى Alia Market واستمتع بتجربة تسوق فريدة
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  الاسم الكامل
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400 ${
                      focusedField === "name" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "name" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400 ${
                      focusedField === "email" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "email" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gender Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  الجنس
                </label>
                <div className="relative group">
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("gender")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 appearance-none ${
                      focusedField === "gender" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "gender" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Birth Date Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  تاريخ الميلاد
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    name="birth_date"
                    required
                    value={formData.birth_date}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("birth_date")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 ${
                      focusedField === "birth_date" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "birth_date" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400 ${
                      focusedField === "password" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="至少 6 أحرف"
                    dir="ltr"
                  />
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "password" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  تأكيد كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password_confirmation")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400 ${
                      focusedField === "password_confirmation" 
                        ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="أعد إدخال كلمة المرور"
                    dir="ltr"
                  />
                  <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "password_confirmation" ? "text-orange-500" : "text-gray-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-orange-600 bg-white border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 transition-all duration-200 mt-1"
                />
                <label className="text-sm text-gray-700">
                  أوافق على{' '}
                  <button type="button" className="text-orange-600 hover:text-orange-700 underline">
                    الشروط والأحكام
                  </button>{' '}
                  و{' '}
                  <button type="button" className="text-orange-600 hover:text-orange-700 underline">
                    سياسة الخصوصية
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-green-500/25 ${
                  loading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                    جاري إنشاء الحساب...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    إنشاء حساب
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mt-8 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 font-medium">أو سجل باستخدام</span>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:border-gray-300 transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:border-gray-300 transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.143-2.685-6.735-2.685-5.521 0-10 4.479-10 10s4.479 10 10 10c8.396 0 10-7.524 10-10 0-.61-.052-1.231-.149-1.849h-9.851z" />
                </svg>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{' '}
                <button 
                  onClick={() => router.push('/login')}
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 hover:underline"
                >
                  تسجيل الدخول
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}