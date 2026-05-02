import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'now',
  title: 'Now Page (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'singletonId',
      title: 'Singleton ID',
      type: 'string',
      hidden: true,
      initialValue: 'now',
      validation: (Rule) =>
        Rule.custom((value) => (value === 'now' ? true : 'This must always be "now"')),
    }),
    defineField({
      name: 'lastUpdatedDate',
      title: 'Last Updated Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Bangladesh 🇧🇩"',
    }),
    defineField({
      name: 'currentFocus',
      title: 'Current Focus (Portable Text)',
      type: 'blockContent',
      description: 'What you are currently focused on — research, projects, etc.',
    }),
    defineField({
      name: 'researchItems',
      title: 'Active Research / Building',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-point list of active research projects',
    }),
    defineField({
      name: 'learningItems',
      title: 'Learning & Development',
      type: 'array',
      of: [
        defineField({
          name: 'learningItem',
          type: 'object',
          fields: [
            { name: 'emoji', type: 'string', title: 'Emoji', validation: (Rule) => Rule.required() },
            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
            { name: 'detail', type: 'string', title: 'Detail' },
          ],
        }),
      ],
      description: 'Languages, skills, physical training, courses, etc.',
    }),
    defineField({
      name: 'reading',
      title: 'Currently Reading / Learning',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Books, papers, courses, resources',
    }),
    defineField({
      name: 'buildingToward',
      title: 'Building Toward',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Long-term goals and milestones',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '/now — Life & Work',
        subtitle: 'What you are currently working on and learning',
      }
    },
  },
})
