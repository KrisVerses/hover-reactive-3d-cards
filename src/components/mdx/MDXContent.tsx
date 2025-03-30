// Step 1: Add the client directive
// - This component needs to be a client component to use hooks
'use client'

// Step 2: Import necessary dependencies
// - Import useMDXComponent from next-contentlayer/hooks
import { useMDXComponent } from 'next-contentlayer/hooks'
// - Import your MDX components from MDXComponents.tsx
import { mdxComponents } from './MDXComponents'

// Step 3: Define props interface
// - Create an interface for the component props
// - Include a code property for the MDX content
interface MDXContentProps {
    code: string;
}

// Step 4: Create the MDXContent component
// - Add null check for the code prop
// - Use try/catch to handle potential rendering errors
// - Use useMDXComponent to process the MDX code
// - Return the rendered component with your MDX components
export function MDXContent({ code }: MDXContentProps) {
    if (!code) return null;

    try {
        const Component = useMDXComponent(code)
        return <Component components={mdxComponents} />
    } catch (error) {
        console.error('Error rendering MDX:', error)
        return <div>Error rendering content</div>
    }
} 