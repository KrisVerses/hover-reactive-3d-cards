// Step 1: Import necessary dependencies
// - Import notFound from next/navigation
// - Import allLogs from @contentlayer/generated
// - Import date formatting utilities
// - Import your MDXContent component

// Step 2: Define the PageProps interface
// - Create an interface for the component props
// - Define the params object with slug property

// Step 3: Create the page component
// - Make it an async server component
// - Find the log based on the slug parameter
// - Handle the case when a log is not found with notFound()

// Step 4: Return the formatted log content
// - Create an article container with appropriate styling
// - Add the log title, date, and other metadata
// - Use MDXContent to render the MDX body

import { notFound } from 'next/navigation'
import { allLogs } from '@contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { MDXContent } from '@/components/mdx/MDXContent'

interface PageProps {
    params: {
        slug: string
    }
}

export default async function LogPage({ params }: PageProps) {
    // Access the slug directly - Next.js handles the Promise resolution
    const log = allLogs.find((log) => log.slug === params.slug)

    if (!log) {
        notFound()
    }

    return (
        <article className="prose prose-lg max-w-4xl mx-auto py-8 px-4">
            <h1>{log.title}</h1>
            <div className="mb-8 text-gray-500">
                <time dateTime={log.date}>
                    {format(parseISO(log.date), 'MMMM d, yyyy')}
                </time>
            </div>
            <MDXContent code={log.body.code} />
        </article>
    )
}
