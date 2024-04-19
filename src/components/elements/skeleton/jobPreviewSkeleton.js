function JobPreviewSkeleton({ title = 'Titel' }) {
  return (
    <div role="status" className="w-full p-4 rounded animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-16 bg-gray-200 rounded-lg w-full flex gap-1 align-items-center">
          <span className="mx-auto my-auto font-bold text-xs">{title}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 pb-2">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48"></div>
        </div>
        <div className="flex flex-col gap-2 pb-2">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-20"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-14"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-20"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-14"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-20"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-14"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-20"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center mt-4">
        <div className="h-2 bg-gray-200 rounded-lg w-full" />
        <div className="h-2 bg-gray-200 rounded-lg w-full" />
        <div className="h-2 bg-gray-200 rounded-lg w-full" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default JobPreviewSkeleton;
