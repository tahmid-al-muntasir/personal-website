import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import project from './project'
import paper from './paper'
import research from './research'
import blog from './blog'
import media from './media'
import now from './now'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, project, paper, research, blog, media, now],
}
