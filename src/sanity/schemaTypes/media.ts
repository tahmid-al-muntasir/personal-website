import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Media Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Interview', value: 'interview' },
          { title: 'Feature', value: 'feature' },
          { title: 'Talk / Presentation', value: 'talk' },
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'platform',
      title: 'Platform / Source',
      type: 'string',
      description: 'e.g., YouTube, Medium, LinkedIn, etc.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'mediaType',
      date: 'publishedDate',
    },
    prepare(selection) {
      const { title, type, date } = selection
      return {
        title,
        subtitle: `${type} · ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      }
    },
  },
})
