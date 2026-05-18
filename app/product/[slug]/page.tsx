import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { createWhatsAppOrderUrl } from '@/lib/checkout';
import { formatPrice, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image, alt: product.name }] }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  const orderUrl = createWhatsAppOrderUrl([{ name: product.name, amount: product.price, size: product.sizes[2], leather: product.leatherOptions[0] }]);

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <Navigation />
      <section className="luxury-container grid min-h-screen items-center gap-12 pt-28 lg:grid-cols-2">
        <div className="relative h-[70vh] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-luxury">
          <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="space-y-7">
          <p className="eyebrow">{product.collection}</p>
          <h1 className="font-display text-6xl font-semibold leading-none sm:text-7xl">{product.name}</h1>
          <p className="text-xl leading-8 text-ivory/70">{product.description}</p>
          <p className="font-display text-5xl text-brass">{formatPrice(product.price)}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-panel rounded-3xl p-5">
              <span className="eyebrow">Sizes</span>
              <p className="mt-3 text-lg">{product.sizes.join(' · ')}</p>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              <span className="eyebrow">Leather options</span>
              <p className="mt-3 text-lg">{product.leatherOptions.join(' · ')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href={orderUrl} className="rounded-full bg-brass px-8 py-4 text-center font-bold text-espresso transition hover:bg-ivory">WhatsApp Order</a>
            <Link href="/#featured" className="rounded-full border border-white/20 px-8 py-4 text-center font-bold transition hover:border-brass hover:text-brass">Back to Collection</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
