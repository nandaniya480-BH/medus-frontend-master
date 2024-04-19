function JobSkeleton() {
  return (
    <div
      role="status"
      className="w-full rounded-lg divide-y divide-gray-200 animate-pulse dark:divide-gray-500 p-2 dark:border-gray-500 shadow-lg my-6"
    >
      <div className="flex items-center">
        <div className="w-3/12">
          <div className="w-24 h-24 bg-gray-300 m-2 rounded-full  dark:bg-gray-300"></div>
        </div>
        <div className="w-9/12">
          <div className="w-full flex flex-row justify-between">
            <div className="w-24 h-2 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
            <div className="w-24 h-2 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-24 h-2 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
            <div className="w-24 h-2 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-8/12 h-3 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
          </div>
          <div className="w-full flex flex-row justify-end">
            <div className="w-24 h-2 bg-gray-300 m-2 rounded-full dark:bg-gray-300"></div>
          </div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default JobSkeleton;
