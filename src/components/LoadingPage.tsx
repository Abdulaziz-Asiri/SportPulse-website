import "../style/loading.css"

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate">
          <DribbbleIcon className="h-16 w-16 text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center">Page is Loading...</p>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          &quot;Push yourself because no one else is going to do it for you.&quot;
        </p>
      </div>
    </div>
  )
}

function DribbbleIcon(props:any) {
  return (
    <svg
      {...props}
      className="LoadingContainer"
      x="0px"
      y="0px"
      viewBox="0 0 50 31.25"
      height="31.25"
      width="50"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        className="LoadingTrack"
        strokeWidth="4"
        fill="none"
        pathLength="100"
        d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
      />
      <path
        className="LoadingCar"
        strokeWidth="4"
        fill="none"
        pathLength="100"
        d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
      />
    </svg>
  )
}
