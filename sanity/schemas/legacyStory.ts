export const legacyStory = {
  name: 'legacyStory',
  title: 'Legacy Story',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'origin', title: 'Origins', type: 'text', rows: 4 },
    { name: 'generations', title: 'Generations of Expertise', type: 'text', rows: 4 },
    { name: 'values', title: 'Family Values', type: 'array', of: [{ type: 'string' }] },
    { name: 'heroImage', title: 'Workshop Image', type: 'image', options: { hotspot: true } }
  ]
};
