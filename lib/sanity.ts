export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
  };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2025-01-01';

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

export async function fetchSanity<T>(query: string, params: Record<string, string | number | boolean> = {}): Promise<T | null> {
  if (!projectId) {
    return null;
  }

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(`$${key}`, JSON.stringify(value)));

  const response = await fetch(url, { next: { revalidate: 300 } } as RequestInit & { next: { revalidate: number } });

  if (!response.ok) {
    throw new Error(`Sanity request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
}

export function sanityImageUrl(image: SanityImage, width = 1200) {
  if (image.asset?.url) return image.asset.url;
  if (!projectId || !image.asset?._ref) return null;

  const [, id, dimensions, format] = image.asset._ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/) || [];
  if (!id || !dimensions || !format) return null;

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}
