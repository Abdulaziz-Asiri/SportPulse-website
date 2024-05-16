// import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
      </div>
      <a
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Go back home
      </a>
    </div>
  )
}
