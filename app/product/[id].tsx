"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // 🔹 جلب id من الرابط
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // أول مرة يكون undefined
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://mahmoudmohammed.site/api/public/product/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">جارٍ تحميل المنتج...</p>;
  if (!product) return <p className="text-center py-10 text-red-600">لم يتم العثور على المنتج</p>;

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* الصورة الرئيسية */}
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />

          {/* التفاصيل */}
          <div className="flex-1">
            <p className="text-gray-700">{product.description}</p>
            <p className="mt-2 text-lg font-bold text-orange-600">
              {product.price} ل.س
            </p>

            <button
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              onClick={() => alert("تمت الإضافة إلى السلة")}
            >
              أضف إلى السلة
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
