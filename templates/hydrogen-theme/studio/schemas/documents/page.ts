import {defineField, defineType} from 'sanity'

import {SlugInt, validateIntSlug} from '../../utils/slug'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
    }),
    defineField({
      name: 'sections',
      type: 'sections',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'slug',
      type: 'internationalizedArraySlug',
      title: 'Slug',
      validation: (Rule) =>
        Rule.required().custom((slugArray: SlugInt[], context) =>
          validateIntSlug({slugArray, context})
        ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value || 'No title',
      }
    },
  },
})
