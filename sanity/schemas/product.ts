import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'collection', title: 'Collection', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (rule) => rule.required().positive() }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'leatherOptions', title: 'Leather Options', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'sizes', title: 'Sizes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'images', title: 'Product Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] })
  ]
});
