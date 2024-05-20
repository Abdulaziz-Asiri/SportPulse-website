import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-bounce">
          <TriangleAlertIcon className="h-16 w-16 text-red-500 dark:text-red-400" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Oops, something went wrong!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We're sorry, but there seems to be an issue with the request. Please try again later.
          </p>
        </div>
        <a>
          <Button className="flex items-center gap-2" variant="outline">
            <RefreshCwIcon className="h-4 w-4" />
            Retry
          </Button>
        </a>
      </div>
    </div>
  )
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
