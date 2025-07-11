import Link from 'next/link';
import '@/app/ui/global.css';
import Navbar from './Componets/navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
