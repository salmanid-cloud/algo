'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { createWhatsAppOrderUrl } from '@/lib/checkout';
import { formatPrice, type Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  const orderUrl = createWhatsAppOrderUrl([{ name: product.name, amount: product.price, size: product.sizes[2], leather: product.leatherOptions[0] }]);

  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-ivory/[.05] shadow-luxury"
    >
      <Link href={`/product/${product.slug}`} className="relative block h-80 overflow-hidden">
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-espresso/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-brass backdrop-blur">
          {product.collection}
        </span>
      </Link>
      <div className="space-y-5 p-6">
        <div>
          <h3 className="font-display text-3xl text-ivory">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-ivory/65">{product.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs text-ivory/65">
          <div className="rounded-2xl bg-black/20 p-3">
            <span className="block uppercase tracking-[0.2em] text-brass">Sizes</span>
            {product.sizes.join(' · ')}
          </div>
          <div className="rounded-2xl bg-black/20 p-3">
            <span className="block uppercase tracking-[0.2em] text-brass">Leather</span>
            {product.leatherOptions[0]}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <strong className="font-display text-3xl text-brass">{formatPrice(product.price)}</strong>
          <a href={orderUrl} className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-espresso transition hover:bg-ivory">
            <ShoppingBag className="h-4 w-4" /> Inquire
          </a>
        </div>
      </div>
    </motion.article>
  );
}
