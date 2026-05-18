export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: 'required' },
    { name: 'collection', title: 'Collection', type: 'string' },
    { name: 'price', title: 'Price', type: 'number', validation: 'required-positive' },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'leatherOptions', title: 'Leather Options', type: 'array', of: [{ type: 'string' }] },
    { name: 'sizes', title: 'Sizes', type: 'array', of: [{ type: 'string' }] },
    { name: 'images', title: 'Product Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }
  ]
};
