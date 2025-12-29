import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DealsHub - Best Deals & Discounts on Electronics, Software, Fashion & More',
  description: 'Find the best deals and discounts on electronics, software, fashion, food, and services. Save money with our curated affiliate deals and offers.',
  keywords: 'deals, discounts, affiliate, electronics, software, fashion, food, services, coupons, offers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}