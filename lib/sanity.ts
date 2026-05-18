import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);

export const productQuery = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  collection,
  leatherOptions,
  sizes,
  shortDescription,
  images
}`;
