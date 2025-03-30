// Step 1: Import necessary dependencies
// - Import Link from next/link
// - Import ArrowLeftIcon from Heroicons
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Step 2: Create the layout component
// - Define the component props with children
// - Create a consistent layout for all log pages
// - Add navigation back to the logs index
const LogLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <header>
                <Link href="/logs">
                    <ArrowLeftIcon className="w-6 h-6 m-4" />
                </Link>
            </header>
            {children}
        </div>
    )
}

// Step 3: Export the layout component
export default LogLayout;