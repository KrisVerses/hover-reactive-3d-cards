// Step 1: Import required dependencies
// - Import clsx for conditional class names
// - Import tailwind-merge to handle Tailwind class conflicts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Step 2: Create a utility function for merging class names
// - Create a function named cn that accepts ClassValue arguments
// - Use twMerge and clsx to merge the class names
// - Export the function for use in components
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 