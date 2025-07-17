import Link from 'next/link';
import '@/app/ui/global.css';
import Navbar from './Componets/navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Providers } from './providers';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body >
        <CartProvider>
          <Providers>
          {children}
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
