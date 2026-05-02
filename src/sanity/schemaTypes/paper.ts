import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'paper',
  title: 'Paper / Preprint',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paper Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Under Review', value: 'under-review' },
          { title: 'Published', value: 'published' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'In Preparation', value: 'in-preparation' },
          { title: 'Accepted', value: 'accepted' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue / Journal Name',
      type: 'string',
      description: 'Conference, journal, or preprint server (e.g., "IEEE TIE", "arXiv")',
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
      name: 'abstract',
      title: 'Abstract (Portable Text)',
      type: 'blockContent',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'arxivUrl',
      title: 'arXiv URL',
      type: 'url',
      validation: (Rule) =>
        Rule.custom((url) => {
          if (!url) return true
          return url.includes('arxiv.org')
            ? true
            : 'Please provide a valid arXiv URL'
        }),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published / Submitted Date',
      type: 'datetime',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'publicationStatus',
      venue: 'venue',
    },
    prepare(selection) {
      const { title, status, venue } = selection
      return {
        title,
        subtitle: `${status ? `[${status}]` : ''} ${venue || ''}`.trim(),
      }
    },
  },
})
