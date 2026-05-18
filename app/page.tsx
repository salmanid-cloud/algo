import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, Gem, Hammer, HeartHandshake, MapPin, Ruler, Search, ShieldCheck, Sparkles, Star, Timer, Wand2 } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { MotionArticle, MotionDiv } from '@/components/Motion';
import { Navigation } from '@/components/Navigation';
import { ProductCard } from '@/components/ProductCard';
import { collections, products } from '@/lib/products';

const craftSteps = ['Leather Selection', 'Pattern Design', 'Hand Cutting', 'Stitching', 'Lasting & Shaping', 'Finishing & Polishing', 'Final Quality Check'];

const reasons: Array<[LucideIcon, string, string]> = [
  [Gem, 'Genuine Premium Leather', 'Full-grain hides selected for depth, suppleness, and graceful aging.'],
  [Hammer, 'Handcrafted Excellence', 'Every pattern, stitch, welt, and polish is guided by experienced hands.'],
  [HeartHandshake, 'Family Heritage', 'A family atelier preserving techniques taught at the workbench for generations.'],
  [ShieldCheck, 'Built to Last', 'Durable construction, repairable soles, and careful quality checks.'],
  [Sparkles, 'Timeless Design', 'Elegant silhouettes that outlive trends and become personal signatures.'],
  [Ruler, 'Precision Fit', 'Balanced lasts and made-to-order options for confident all-day comfort.']
];

export default function Home() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <Navigation />

      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <Image
          src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=2200&q=85"
          alt="Craftsman handmaking leather shoes in a traditional workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(201,163,91,.25),transparent_28%),linear-gradient(90deg,rgba(18,11,7,.96),rgba(18,11,7,.55),rgba(18,11,7,.88))]" />
        <MotionDiv initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="luxury-container relative z-10 py-24">
          <p className="eyebrow mb-6">Family-owned leather shoemakers</p>
          <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[.88] text-balance sm:text-7xl lg:text-8xl">Crafted Through Generations.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ivory/78 sm:text-xl">
            Our family’s shoemaking legacy lives in every pair—premium handcrafted leather shoes built with tradition, precision, and timeless style.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="#collection" className="rounded-full bg-brass px-8 py-4 text-center font-bold text-espresso transition hover:bg-ivory">
              Explore Collection
            </Link>
            <Link href="#legacy" className="rounded-full border border-ivory/30 px-8 py-4 text-center font-bold text-ivory transition hover:border-brass hover:text-brass">
              Our Legacy
            </Link>
          </div>
        </MotionDiv>
      </section>

      <section id="legacy" className="relative overflow-hidden bg-ivory py-24 text-espresso">
        <div className="luxury-container grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr]">
          <MotionDiv initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="leather-border relative min-h-[560px] overflow-hidden rounded-[2.5rem] shadow-luxury">
            <Image src="https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=1400&q=85" alt="Traditional shoe workshop with leather tools" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-7">
            <p className="eyebrow text-cognac">The family legacy story</p>
            <h2 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">A workshop promise, passed from hand to hand.</h2>
            <p className="text-lg leading-8 text-espresso/72">
              What began as a small family bench grew into an atelier where sons, daughters, and master craftsmen learned the same quiet discipline: respect the leather, honor the customer, and never rush the final polish.
            </p>
            <p className="text-lg leading-8 text-espresso/72">
              Our origins are rooted in decades of traditional shoemaking—measuring, patterning, cutting, lasting, stitching, and burnishing by hand. Each pair carries family values of honesty, patience, and pride in a product made to be repaired, worn, and remembered.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Decades of expertise', 'Handmade process', 'Lifetime quality mindset'].map((item) => (
                <div key={item} className="rounded-3xl border border-cognac/15 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-cognac" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      <section id="collection" className="bg-leather-grain py-24">
        <div className="luxury-container">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Signature collection</p>
              <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">Classic forms. Modern luxury.</h2>
            </div>
            <div className="flex max-w-md items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5 py-3 text-ivory/55">
              <Search className="h-5 w-5 text-brass" /> Search by style, leather, fit, or occasion
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection, index) => (
              <MotionArticle
                key={collection.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <Image src={collection.image} alt={collection.name} fill sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-4xl font-semibold">{collection.name}</h3>
                  <p className="mt-3 leading-7 text-ivory/70">{collection.copy}</p>
                </div>
              </MotionArticle>
            ))}
          </div>
        </div>
      </section>

      <section id="craft" className="bg-espresso py-24">
        <div className="luxury-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Craftsmanship journey</p>
            <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">Seven deliberate stages. One enduring pair.</h2>
            <p className="mt-6 text-lg leading-8 text-ivory/68">From hide selection to final inspection, each step is designed to preserve structure, comfort, character, and the unmistakable feel of handmade footwear.</p>
          </div>
          <div className="space-y-4">
            {craftSteps.map((step, index) => (
              <MotionDiv key={step} initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel flex items-center gap-5 rounded-[1.6rem] p-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brass font-display text-2xl font-bold text-espresso">{index + 1}</span>
                <div>
                  <h3 className="font-display text-3xl">{step}</h3>
                  <p className="text-sm text-ivory/60">Inspected by senior craftsmen before moving to the next bench.</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 text-espresso">
        <div className="luxury-container">
          <p className="eyebrow text-cognac">Why choose us</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">Luxury is not loud. It is the confidence of something made correctly.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(([Icon, title, copy]) => (
              <div key={String(title)} className="rounded-[2rem] border border-cognac/15 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Icon className="mb-6 h-9 w-9 text-cognac" />
                <h3 className="font-display text-3xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-espresso/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="bg-espresso py-24">
        <div className="luxury-container">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">Ready-to-order icons.</h2>
            </div>
            <p className="max-w-xl text-ivory/65">Each featured style includes quick inquiry, product details, size selection cues, leather options, and an ecommerce-ready path for Razorpay checkout.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-saddle py-24">
        <div className="luxury-container grid gap-6 lg:grid-cols-3">
          {[
            ['The finishing is exceptional. My Oxfords feel substantial, elegant, and deeply personal.', 'Arjun M.'],
            ['You can sense the family pride in the consultation and the shoe itself. Worth every rupee.', 'Rohan S.'],
            ['The leather aged beautifully within weeks. These are the shoes I wear for important days.', 'Vikram D.']
          ].map(([quote, name]) => (
            <div key={name} className="glass-panel rounded-[2rem] p-7">
              <div className="mb-5 flex gap-1 text-brass">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
              <p className="font-display text-3xl leading-tight">“{quote}”</p>
              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-ivory/55">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bespoke" className="relative overflow-hidden bg-espresso py-24">
        <Image src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1800&q=85" alt="Bespoke leather choices and measuring tools" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="luxury-container relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Bespoke & custom orders</p>
            <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">A pair made around your measure, your leather, your occasion.</h2>
            <p className="mt-6 text-lg leading-8 text-ivory/68">Book a private consultation for size customization, leather selection, silhouette refinement, patina direction, monogramming, and comfort preferences.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {([[Ruler, 'Size customization'], [Wand2, 'Style customization'], [Gem, 'Leather choices'], [Timer, 'Consultation request']] as Array<[LucideIcon, string]>).map(([Icon, label]) => (
              <div key={String(label)} className="glass-panel rounded-[1.5rem] p-6">
                <Icon className="mb-5 h-8 w-8 text-brass" />
                <h3 className="font-display text-3xl">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ivory py-24 text-espresso">
        <div className="luxury-container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-cognac">Contact / Visit us</p>
            <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">Visit the atelier or begin on WhatsApp.</h2>
            <div className="mt-8 space-y-4 text-espresso/70">
              <p className="flex gap-3"><MapPin className="h-6 w-6 text-cognac" /> 18 Artisan Lane, Leather Market District, Kanpur, India</p>
              <p>Phone: +91 99999 99999</p>
              <p>Email: atelier@veyraandsons.example</p>
              <a href="https://wa.me/919999999999" className="inline-flex rounded-full bg-cognac px-6 py-3 font-bold text-ivory transition hover:bg-espresso">Order on WhatsApp</a>
            </div>
            <iframe
              title="Atelier map"
              className="mt-8 h-72 w-full rounded-[2rem] border-0 grayscale"
              loading="lazy"
              src="https://www.google.com/maps?q=Kanpur%20Leather%20Market&output=embed"
            />
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-espresso py-10">
        <div className="luxury-container flex flex-col justify-between gap-4 text-sm text-ivory/55 md:flex-row">
          <p>© 2026 Veyra & Sons. Family leather shoemakers.</p>
          <p>SEO optimized · CMS ready · Razorpay checkout · WhatsApp ordering · Search and filters</p>
        </div>
      </footer>
    </main>
  );
}
