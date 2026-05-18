export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  leatherOptions: string[];
  sizes: string[];
  description: string;
};

export const collections = [
  {
    name: 'Oxford Shoes',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
    copy: 'Closed-lace formality cut for boardrooms, weddings, and ceremonial evenings.'
  },
  {
    name: 'Derby Shoes',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
    copy: 'Open-lace ease with a refined profile for everyday distinction.'
  },
  {
    name: 'Loafers',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80',
    copy: 'Supple slip-ons finished for relaxed luxury and enduring comfort.'
  },
  {
    name: 'Monk Straps',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
    copy: 'Distinctive buckled silhouettes with hand-burnished depth.'
  },
  {
    name: 'Boots',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80',
    copy: 'Structured leather boots built to age beautifully through seasons.'
  },
  {
    name: 'Custom Handmade Shoes',
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=900&q=80',
    copy: 'Measured, patterned, and finished around your personal story.'
  }
];

export const products: Product[] = [
  {
    slug: 'heritage-oxford',
    name: 'The Heritage Oxford',
    collection: 'Oxford Shoes',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=85',
    leatherOptions: ['Full-grain black calf', 'Cognac crust leather', 'Dark espresso calf'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    description: 'A hand-lasted cap-toe Oxford with full-grain leather, stacked heel, and mirror-polished finish.'
  },
  {
    slug: 'founders-derby',
    name: "Founder’s Derby",
    collection: 'Derby Shoes',
    price: 16900,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85',
    leatherOptions: ['Tan pull-up leather', 'Walnut calf', 'Mahogany grain'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    description: 'A versatile Derby made with open-lace construction, cushioned leather footbed, and hand-painted patina.'
  },
  {
    slug: 'atelier-loafer',
    name: 'Atelier Loafer',
    collection: 'Loafers',
    price: 14900,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1200&q=85',
    leatherOptions: ['Cognac calf', 'Black nappa', 'Chocolate suede'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    description: 'A refined penny loafer with soft calf lining, flexible sole, and sculpted apron stitching.'
  }
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
