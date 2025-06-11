import Link from 'next/link';
import '@/app/ui/global.css';
import Navbar from './Componets/navbar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <div>
         {/* <Navbar/> */}
        </div>
        {children}</body>
    </html>
  );
}
