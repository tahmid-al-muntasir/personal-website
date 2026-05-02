import { client } from './client'
import { groq } from 'next-sanity'

/**
 * GROQ Query Fragments - Reusable query blocks
 */

export const projectFields = groq`
  _id,
  title,
  slug,
  "coverImage": coverImage.asset->url,
  description,
  techStack,
  githubUrl,
  demoUrl,
  pillar,
  phase,
  status,
  highlights,
  _updatedAt
`

export const paperFields = groq`
  _id,
  title,
  authors,
  publicationStatus,
  venue,
  pillar,
  abstract,
  "pdfUrl": pdfFile.asset->url,
  arxivUrl,
  publishedDate,
  keywords,
  _updatedAt
`

export const researchFields = groq`
  _id,
  title,
  pillarId,
  shortTitle,
  coreArea,
  phase,
  color,
  summary,
  description,
  keyProblems,
  techStack,
  paperTitle,
  targetVenue,
  _updatedAt
`

export const blogFields = groq`
  _id,
  title,
  slug,
  publishedDate,
  "coverImage": coverImage.asset->url,
  excerpt,
  body,
  category,
  pillar,
  tags,
  readTime,
  _updatedAt
`

export const mediaFields = groq`
  _id,
  title,
  mediaType,
  externalUrl,
  "thumbnail": thumbnail.asset->url,
  description,
  publishedDate,
  platform,
  tags,
  _updatedAt
`

export const nowFields = groq`
  _id,
  lastUpdatedDate,
  location,
  currentFocus,
  researchItems,
  learningItems,
  reading,
  buildingToward,
  _updatedAt
`

/**
 * PROJECT QUERIES
 */

export const getAllProjects = async () => {
  return client.fetch<any[]>(
    groq`*[_type == "project"] | order(_updatedAt desc) {
      ${projectFields}
    }`,
    {},
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )
}

export const getProjectBySlug = async (slug: string) => {
  return client.fetch<any>(
    groq`*[_type == "project" && slug.current == $slug][0] {
      ${projectFields}
    }`,
    { slug },
    { next: { revalidate: 3600 } }
  )
}

export const getProjectsByPillar = async (pillar: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "project" && pillar == $pillar] | order(_updatedAt desc) {
      ${projectFields}
    }`,
    { pillar },
    { next: { revalidate: 3600 } }
  )
}

/**
 * PAPER QUERIES
 */

export const getAllPapers = async () => {
  return client.fetch<any[]>(
    groq`*[_type == "paper"] | order(publishedDate desc) {
      ${paperFields}
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

export const getPapersByPillar = async (pillar: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "paper" && pillar == $pillar] | order(publishedDate desc) {
      ${paperFields}
    }`,
    { pillar },
    { next: { revalidate: 3600 } }
  )
}

export const getPapersByStatus = async (status: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "paper" && publicationStatus == $status] | order(publishedDate desc) {
      ${paperFields}
    }`,
    { status },
    { next: { revalidate: 3600 } }
  )
}

/**
 * RESEARCH QUERIES
 */

export const getAllResearch = async () => {
  return client.fetch<any[]>(
    groq`*[_type == "research"] | order(_updatedAt desc) {
      ${researchFields}
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

export const getResearchByPillar = async (pillarId: string) => {
  return client.fetch<any>(
    groq`*[_type == "research" && pillarId == $pillarId][0] {
      ${researchFields}
    }`,
    { pillarId },
    { next: { revalidate: 3600 } }
  )
}

/**
 * BLOG QUERIES
 */

export const getAllBlogPosts = async () => {
  return client.fetch<any[]>(
    groq`*[_type == "blog"] | order(publishedDate desc) {
      ${blogFields}
    }`,
    {},
    { next: { revalidate: 1800 } } // Cache for 30 minutes
  )
}

export const getBlogPostBySlug = async (slug: string) => {
  return client.fetch<any>(
    groq`*[_type == "blog" && slug.current == $slug][0] {
      ${blogFields}
    }`,
    { slug },
    { next: { revalidate: 3600 } }
  )
}

export const getBlogPostsByCategory = async (category: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "blog" && category == $category] | order(publishedDate desc) {
      ${blogFields}
    }`,
    { category },
    { next: { revalidate: 1800 } }
  )
}

export const getBlogPostsByPillar = async (pillar: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "blog" && pillar == $pillar] | order(publishedDate desc) {
      ${blogFields}
    }`,
    { pillar },
    { next: { revalidate: 1800 } }
  )
}

/**
 * MEDIA QUERIES
 */

export const getAllMedia = async () => {
  return client.fetch<any[]>(
    groq`*[_type == "media"] | order(publishedDate desc) {
      ${mediaFields}
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

export const getMediaByType = async (mediaType: string) => {
  return client.fetch<any[]>(
    groq`*[_type == "media" && mediaType == $mediaType] | order(publishedDate desc) {
      ${mediaFields}
    }`,
    { mediaType },
    { next: { revalidate: 3600 } }
  )
}

/**
 * NOW PAGE QUERY
 */

export const getNowPage = async () => {
  return client.fetch<any>(
    groq`*[_type == "now" && singletonId == "now"][0] {
      ${nowFields}
    }`,
    {},
    { next: { revalidate: 10 } }
  )
}

/**
 * COMPOSITE QUERIES - Multiple content types
 */

export const getHomepageData = async () => {
  return Promise.all([
    client.fetch<any[]>(
      groq`*[_type == "project"] | order(_updatedAt desc)[0...3] {
        ${projectFields}
      }`,
      {},
      { next: { revalidate: 3600 } }
    ),
    client.fetch<any[]>(
      groq`*[_type == "research"] | order(pillarId asc) {
        ${researchFields}
      }`,
      {},
      { next: { revalidate: 3600 } }
    ),
    client.fetch<any>(
      groq`*[_type == "now" && singletonId == "now"][0] {
        ${nowFields}
      }`,
      {},
      { next: { revalidate: 3600 } }
    ),
  ]).then(([projects, research, now]) => ({
    projects,
    research,
    now,
  }))
}
