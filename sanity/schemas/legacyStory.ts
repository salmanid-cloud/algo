import { defineField, defineType } from 'sanity';

export const legacyStory = defineType({
  name: 'legacyStory',
  title: 'Legacy Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'origin', title: 'Origins', type: 'text', rows: 4 }),
    defineField({ name: 'generations', title: 'Generations of Expertise', type: 'text', rows: 4 }),
    defineField({ name: 'values', title: 'Family Values', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'heroImage', title: 'Workshop Image', type: 'image', options: { hotspot: true } })
  ]
});
