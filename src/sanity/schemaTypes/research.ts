import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'research',
  title: 'Research Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pillar Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'pillarId',
      title: 'Pillar Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Pillar 1', value: 'p1' },
          { title: 'Pillar 2', value: 'p2' },
          { title: 'Pillar 3', value: 'p3' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title (for badges)',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'coreArea',
      title: 'Core Research Area',
      type: 'string',
      description: 'e.g., Computer Vision, Smart Garments, Robotics',
    }),
    defineField({
      name: 'phase',
      title: 'Timeline / Status',
      type: 'string',
      description: 'e.g., "Active — Thesis Track", "In Progress"',
    }),
    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'string',
      options: {
        list: [
          { title: 'Rust', value: 'rust' },
          { title: 'Amber', value: 'amber' },
          { title: 'Sage', value: 'sage' },
          { title: 'Steel', value: 'steel' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'One-Line Summary',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description (Portable Text)',
      type: 'blockContent',
    }),
    defineField({
      name: 'keyProblems',
      title: 'Key Problems Being Solved',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'techStack',
      title: 'Technology Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'paperTitle',
      title: 'Associated Paper Title',
      type: 'string',
      description: 'Title of the paper in preparation for this pillar',
    }),
    defineField({
      name: 'targetVenue',
      title: 'Target Publication Venue',
      type: 'string',
      description: 'e.g., "IEEE Transactions on Industrial Electronics", "CVPR"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pillar: 'pillarId',
      phase: 'phase',
    },
    prepare(selection) {
      const { title, pillar, phase } = selection
      return {
        title,
        subtitle: `${pillar} · ${phase || ''}`.trim(),
      }
    },
  },
})
