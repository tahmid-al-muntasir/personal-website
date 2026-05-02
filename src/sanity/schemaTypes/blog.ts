import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Article Body (Portable Text)',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Research', value: 'research' },
          { title: 'Devlog / Errors', value: 'devlog' },
          { title: 'Math & ML', value: 'math' },
          { title: 'Language Learning', value: 'language' },
          { title: 'Notes', value: 'note' },
          { title: 'LinkedIn Posts', value: 'linkedin' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Research Pillar (optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Pillar 1: Smart Thermal Garments', value: 'p1' },
          { title: 'Pillar 2: Fabric Defect Detection', value: 'p2' },
          { title: 'Pillar 3: Robotic Fabric Manipulation', value: 'p3' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g., "8 min", "12 min"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedDate',
      category: 'category',
    },
    prepare(selection) {
      const { title, date, category } = selection
      return {
        title,
        subtitle: `${category} · ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      }
    },
  },
})
