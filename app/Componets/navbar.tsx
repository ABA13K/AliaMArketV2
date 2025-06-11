"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rtl rounded-lg">
        {/* الشعار */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">ALIA-Market</Link>
        </div>

        {/* روابط القائمة للكمبيوتر */}
        <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
          <Link
            href="/contact"
            className="text-gray-700 hover:text-blue-600 font-semibold transition"
          >
            اتصل بنا
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-semibold transition"
          >
            من نحن
          </Link>
          <Link
            href="#products"
            className="text-gray-700 hover:text-blue-600 font-semibold transition"
          >
            المنتجات
          </Link>
          <Link
            href="#categories"
            className="text-gray-700 hover:text-blue-600 font-semibold transition"
          >
            الفئات
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-semibold transition"
          >
            الرئيسية
          </Link>
        </div>

        {/* زر القائمة للهواتف */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* القائمة المنسدلة للهواتف */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 rtl:text-right space-y-2 rounded-b-lg">
          <Link
            href="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            اتصل بنا
          </Link>
          <Link
            href="/about"
            className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            من نحن
          </Link>
          <Link
            href="#products"
            className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            المنتجات
          </Link>
          <Link
            href="#categories"
            className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            الفئات
          </Link>
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            href="/login"
            className="mt-3 block bg-blue-600 text-white text-center py-2 rounded font-semibold hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            تسجيل الدخول
          </Link>
        </div>
      )}
    </nav>
  );
}
