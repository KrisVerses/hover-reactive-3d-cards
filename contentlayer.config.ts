// Step 1: Import necessary dependencies
// - Import from contentlayer/source-files
// - Import rehype plugins (rehype-slug, rehype-highlight, rehype-autolink-headings)
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

// Step 2: Define your document type
// - Create a Log document type using defineDocumentType
// - Set name, filePathPattern, and contentType: "mdx"
// - Define required fields: title, date, description
// - Add computedFields for slug and url

const Log = defineDocumentType(() => ({
    name: 'Log',
    filePathPattern: 'logs/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        description: { type: 'string', required: true },
    },
    computedFields: {
        slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('logs/hover-3d-cards/', '') },
        url: { type: 'string', resolve: (doc) => `logs/${doc._raw.flattenedPath.replace('logs/hover-3d-cards/', '')}` }
    }
}))

// Step 3: Configure and export the content source
// - Use makeSource to define content configuration
// - Set contentDirPath to your content folder
// - Add documentTypes array with your Log type
// - Configure mdx with rehype plugins
export default makeSource({
    contentDirPath: "content",
    documentTypes: [Log],
    mdx: {
        rehypePlugins: [rehypeSlug, rehypeHighlight, [rehypeAutolinkHeadings, { behavior: "append" }]],
    },
})