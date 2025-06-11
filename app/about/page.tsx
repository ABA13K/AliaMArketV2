"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>من نحن - Alia Market</title>
        <meta name="description" content="تعرف على قصة Alia Market ومنهجنا في تقديم أفضل تجربة تسوق إلكتروني" />
      </Head>

      {/* Hero Section */}
      <section dir="rtl" className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">من نحن</h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto">
            قصة بدايتنا، رؤيتنا، ورسالتنا في تقديم أفضل تجربة تسوق إلكتروني
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section dir="rtl" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image
                src="/about/team.jpg"
                alt="فريق Alia Market"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2 text-right">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">قصتنا</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                بدأت رحلة Alia Market في عام 2020 كفكرة بسيطة بين مجموعة من رواد الأعمال السوريين الذين لاحظوا الحاجة إلى منصة موثوقة للتجارة الإلكترونية في المنطقة.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                اليوم، نحن فخورون بأننا أصبحنا أحد المنصات الرائدة في مجال التجارة الإلكترونية، حيث نربط آلاف البائعين بالملايين من العملاء في جميع أنحاء البلاد.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نؤمن بأن نجاحنا يعتمد على نجاح شركائنا من البائعين ورضا عملائنا، وهذا ما يدفعنا للابتكار المستمر وتحسين تجربة المستخدم يومًا بعد يوم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section dir="rtl" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-blue-900">رؤيتنا ورسالتنا</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">الأساس الذي تقوم عليه فلسفتنا في العمل</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">رؤيتنا</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                أن نكون المنصة الرائدة في مجال التجارة الإلكترونية في المنطقة، من خلال تقديم حلول مبتكرة تسهل عملية البيع والشراء وتوفر تجربة استثنائية للجميع.
              </p>
            </div>
            
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">رسالتنا</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                تمكين الأفراد والشركات من الوصول إلى أسواق جديدة، وتوفير منتجات متنوعة بجودة عالية وأسعار تنافسية، مع ضمان تجربة تسوق آمنة وسهلة للجميع.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section dir="rtl" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-blue-900">قيمنا الأساسية</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">المبادئ التي نؤمن بها ونعمل وفقًا لها</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">الجودة</h3>
              <p className="text-gray-600 text-sm">نحرص على تقديم منتجات عالية الجودة من بائعين موثوقين.</p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">الأمان</h3>
              <p className="text-gray-600 text-sm">نوفر بيئة آمنة للدفع الإلكتروني وحماية بيانات العملاء.</p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">الموثوقية</h3>
              <p className="text-gray-600 text-sm">نلتزم بوعودنا ونضمن وصول المنتجات في الوقت المحدد.</p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">خدمة العملاء</h3>
              <p className="text-gray-600 text-sm">فريق دعم على مدار الساعة لمساعدتك في أي استفسار.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section dir="rtl" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-blue-900">فريقنا</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">الخبراء الذين يعملون خلف الكواليس لضمان تجربة استثنائية</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition text-center">
              <div className="relative h-64">
                <Image
                  src="/team/member1.jpg"
                  alt="عمران ابراهيم"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 text-gray-800">عمران ابراهيم</h3>
                <p className="text-sm text-orange-600 mb-3">Backend Developer</p>
                {/* <p className="text-sm text-gray-600">مؤسس المن</p> */}
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition text-center">
              <div className="relative h-64">
                <Image
                  src="/team/member2.jpg"
                  alt="علي علي"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 text-gray-800">علي علي</h3>
                <p className="text-sm text-orange-600 mb-3">Frontend Developer </p>
                {/* <p className="text-sm text-gray-600">خبيرة في التسويق الرقمي وإدارة العلامات التجارية.</p> */}
              </div>
            </div>
            
            {/* Team Member 3 */}
            {/* <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition text-center">
              <div className="relative h-64">
                <Image
                  src="/team/member3.jpg"
                  alt="يوسف خالد"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 text-gray-800">يوسف خالد</h3>
                <p className="text-sm text-orange-600 mb-3">رئيس قسم التطوير</p>
                <p className="text-sm text-gray-600">مهندس برمجيات ومطور بخبرة واسعة في بناء المنصات الإلكترونية.</p>
              </div>
            </div> */}
            
            {/* Team Member 4 */}
            {/* <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition text-center">
              <div className="relative h-64">
                <Image
                  src="/team/member4.jpg"
                  alt="لمى حسين"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 text-gray-800">لمى حسين</h3>
                <p className="text-sm text-orange-600 mb-3">مديرة خدمة العملاء</p>
                <p className="text-sm text-gray-600">متخصصة في إدارة فرق الدعم وضمان رضا العملاء.</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section dir="rtl" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-blue-900">تواصل معنا</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">نحن هنا للإجابة على جميع استفساراتك ومساعدتك في أي وقت</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-right">أرسل رسالة</h3>
              <form className="space-y-4 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="أدخل رسالتك هنا..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 text-right">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-900">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">الهاتف</h4>
                      <p dir="ltr" className="text-gray-600">+963 123 456 789</p>
                      <p dir="ltr" className="text-gray-600">+963 987 654 321</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">البريد الإلكتروني</h4>
                      <p className="text-gray-600">info@aliamarket.com</p>
                      <p className="text-gray-600">support@aliamarket.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">العنوان</h4>
                      <p className="text-gray-600">سوريا - دمشق</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-blue-900">ساعات و أيام العمل</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">الأحد - الخميس</span>
                    <span className="font-medium text-gray-800">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">الجمعة</span>
                    <span className="font-medium text-gray-800">10:00 ص - 4:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">السبت</span>
                    <span className="font-medium text-gray-800">إجازة</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 justify-center items-center ">
                <h3 className="text-xl font-bold mb-4 text-blue-900 justify-center align-middle text-center">تابعنا</h3>
                <div className="flex gap-4 justify-center">
                  <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section dir="rtl" className="py-20 px-6 text-center bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dark.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-6">هل أنت مستعد للانضمام إلى رحلتنا؟</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            سواء كنت بائعًا تبحث عن منصة موثوقة أو عميلًا يبحث عن تجربة تسوق فريدة، نحن هنا من أجلك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup-seller"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
            >
              سجل كبائع
            </a>
            <a
              href="/signup"
              className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              سجل كمشتري
            </a>
          </div>
        </div>
      </section>

      {/* Footer (Same as Homepage) */}
      <footer dir="rtl" className="bg-blue-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Alia Market</h3>
            <p className="text-blue-200">
              منصة رائدة في التجارة الإلكترونية تقدم أفضل الحلول للبائعين والمشترين
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/" className="hover:text-white transition">الرئيسية</Link></li>
              <li><Link href="/products" className="hover:text-white transition">المنتجات</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">الفئات</Link></li>
              <li><Link href="/about" className="hover:text-white transition">عن المنصة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">خدمة العملاء</h4>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/contact" className="hover:text-white transition">اتصل بنا</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">الأسئلة الشائعة</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">سياسة الإرجاع</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">الخصوصية</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
                <span className="sr-only">فيسبوك</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
                <span className="sr-only">إنستغرام</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center transition">
                <span className="sr-only">تويتر</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
            <p className="text-blue-200">البريد الإلكتروني: info@aliamarket.com</p>
            <p className="text-blue-200">الهاتف: <span dir="ltr">+963 987 654 321</span></p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
          <p>© {new Date().getFullYear()} Alia Market. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  );
}