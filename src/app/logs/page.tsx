// Step 1: Import necessary dependencies
// - Import Link from next/link
// - Import allLogs from @contentlayer/generated
// - Import date formatting utilities
import Link from "next/link";
import { allLogs } from "@contentlayer/generated";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

// Step 2: Create a sort function for logs
// - Place outside component to prevent recreation on each render
// - Sort logs by date (newest first)
const sortLogs = (logs: typeof allLogs) => {
    return logs.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
};

const LogsPage = () => {
    // Step 3: Create the LogsPage component
    // - Get and sort the logs
    const logs = sortLogs(allLogs);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Development Logs</h1>

            {logs.length === 0 ? (
                <p className="text-gray-500 text-center">No logs found.</p>
            ) : (
                <div className="space-y-6">
                    {logs.map((log) => (
                        <Link
                            key={log.slug}
                            href={log.url}
                            className="block group"
                        >
                            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all duration-300 bg-white">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {log.title}
                                    </h2>
                                    <time className="text-sm text-gray-500">
                                        {formatInTimeZone(parseISO(log.date), 'UTC', "MMM d, yyyy")}
                                    </time>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {log.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LogsPage;