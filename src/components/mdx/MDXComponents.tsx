// This file will contain all your custom MDX components
// These components will be used to render different MDX elements

// Import necessary dependencies
import React, { ReactNode } from 'react'
import { cn } from "@/lib/utils";

// Define types for your custom components
interface CustomMDXComponents {
    h1: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    h2: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    h3: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    h4: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    p: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    a: (props: { children: ReactNode; href: string; className?: string }) => React.ReactElement;
    ul: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    ol: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    li: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    blockquote: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    hr: (props: { className?: string }) => React.ReactElement;
    img: (props: { alt?: string; src?: string; className?: string }) => React.ReactElement;
    pre: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    code: (props: { children: ReactNode; className?: string }) => React.ReactElement;
    [key: string]: any;
}

// Create custom components for MDX elements like:
// - Headings (h1, h2, h3)
// - Code blocks
// - Links
// - Lists
// - Images
// - Custom callouts or info boxes

// Export the components object that will be used by the MDX provider
export const mdxComponents: CustomMDXComponents = {
    h1: ({ className, ...props }) => (
        <h1
            className={cn("text-4xl font-bold mt-8 mb-4 text-gray-900 border-b pb-2 border-gray-200", className)}
            {...props}
        />
    ),
    h2: ({ className, ...props }) => (
        <h2
            className={cn("text-3xl font-bold mt-6 mb-3 text-gray-800", className)}
            {...props}
        />
    ),
    h3: ({ className, ...props }) => (
        <h3
            className={cn("text-2xl font-semibold mt-4 mb-2 text-gray-800", className)}
            {...props}
        />
    ),
    h4: ({ className, ...props }) => (
        <h4
            className={cn("text-xl font-medium mt-4 mb-2 text-gray-800", className)}
            {...props}
        />
    ),
    p: ({ className, ...props }) => (
        <p
            className={cn("mb-4 leading-relaxed text-gray-700", className)}
            {...props}
        />
    ),
    a: ({ className, ...props }) => (
        <a
            className={cn("text-blue-600 hover:text-blue-800 underline transition-colors duration-200", className)}
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),
    ul: ({ className, ...props }) => (
        <ul
            className={cn("mb-4 ml-6 list-disc text-gray-700 space-y-2", className)}
            {...props}
        />
    ),
    ol: ({ className, ...props }) => (
        <ol
            className={cn("mb-4 ml-6 list-decimal text-gray-700 space-y-2", className)}
            {...props}
        />
    ),
    li: ({ className, ...props }) => (
        <li
            className={cn("leading-relaxed", className)}
            {...props}
        />
    ),
    blockquote: ({ className, ...props }) => (
        <blockquote
            className={cn("border-l-4 border-gray-300 pl-4 py-2 my-4 text-gray-600 italic bg-gray-50 rounded-r", className)}
            {...props}
        />
    ),
    hr: ({ className, ...props }) => (
        <hr
            className={cn("my-8 border-t border-gray-300", className)}
            {...props}
        />
    ),
    img: ({ className, ...props }) => (
        <img
            className={cn("rounded-lg shadow-md max-w-full h-auto my-4", className)}
            loading="lazy"
            {...props}
        />
    ),
    pre: ({ className, ...props }) => (
        <pre
            className={cn("rounded-lg bg-gray-900 text-gray-100 p-4 overflow-x-auto mb-4 text-sm", className)}
            {...props}
        />
    ),
    code: ({ className, ...props }) => {
        // Inline code vs block code (handled by pre)
        if (className?.includes('language-')) {
            return <code className={className} {...props} />;
        }
        return (
            <code
                className={cn("bg-gray-100 text-pink-600 rounded px-1 py-0.5 text-sm font-mono", className)}
                {...props}
            />
        );
    }
}; 