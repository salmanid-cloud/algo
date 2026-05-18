import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'heritage_leather_shoes',
  title: 'Heritage Leather Shoes CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: { types: schemaTypes }
});
