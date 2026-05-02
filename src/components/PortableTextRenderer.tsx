import { PortableText, PortableTextComponents } from '@portabletext/react'

export function renderPortableText(content: any) {
  if (!content) return null
  return <PortableText value={content} components={portableTextComponents} />
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure style={{ margin: '1rem 0' }}>
        <img
          src={value.asset.url}
          alt={value.alt || 'Content image'}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    code: ({ value }: any) => (
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
        <code>{value.code}</code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}
