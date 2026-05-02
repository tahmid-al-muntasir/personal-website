import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description (Portable Text)',
      type: 'blockContent',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
      validation: (Rule) =>
        Rule.custom((url) => {
          if (!url) return true
          return url.includes('github.com')
            ? true
            : 'Please provide a valid GitHub URL'
        }),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'pillar',
      title: 'Research Pillar',
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
      name: 'phase',
      title: 'Project Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Thesis Track', value: 'thesis' },
          { title: 'Applied Vision', value: 'applied' },
          { title: 'Robotics Track', value: 'robotics' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Paused', value: 'paused' },
        ],
      },
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Brief bullet points of achievements or features',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pillar: 'pillar',
      status: 'status',
    },
    prepare(selection) {
      const { title, pillar, status } = selection
      return {
        title,
        subtitle: `${pillar ? `[${pillar.toUpperCase()}]` : ''} ${status || ''}`.trim(),
      }
    },
  },
})
