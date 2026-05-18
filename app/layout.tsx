import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['500', '600', '700']
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://heritage-leather-shoes.example.com'),
  title: {
    default: 'Heritage Leather Shoes | Crafted Through Generations',
    template: '%s | Heritage Leather Shoes'
  },
  description:
    'Premium handcrafted genuine leather shoes from a family-owned shoemaking house built on generations of tradition, precision, and timeless style.',
  keywords: [
    'handmade leather shoes',
    'family shoemakers',
    'premium leather footwear',
    'bespoke shoes',
    'Oxford shoes',
    'Derby shoes',
    'custom handmade shoes'
  ],
  openGraph: {
    title: 'Heritage Leather Shoes | Crafted Through Generations',
    description: 'Family-owned handcrafted leather footwear with timeless heritage and premium craftsmanship.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1600&q=80',
        width: 1600,
        height: 900,
        alt: 'Craftsman handmaking premium leather shoes in a traditional workshop'
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
