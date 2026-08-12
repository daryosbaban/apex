import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { Providers } from '@/contexts/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Toaster } from '@/components/Toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'APEX LTD | Technology at Its Apex',
    template: '%s | APEX LTD',
  },
  description:
    'APEX LTD is a premium technology and electronics retailer offering smartphones, laptops, tablets, gaming devices, monitors, audio, smartwatches, cameras and accessories from trusted global brands.',
  keywords: [
    'APEX LTD',
    'electronics store',
    'buy smartphones',
    'buy laptops',
    'gaming devices',
    'consumer electronics',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-dark-radial bg-obsidian-950 min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
