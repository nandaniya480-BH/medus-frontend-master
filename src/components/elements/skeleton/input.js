function InputSkeleton() {
  return (
    <div
      role="status"
      className="p-4 space-y-4 max-w-md rounded divide-y divide-gray-200 animate-pulse dark:divide-gray-500 md:p-6 dark:border-gray-500"
    >
      <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-2.5"></div>
          <div className="w-full h-2 bg-gray-300 rounded-full dark:bg-gray-300"></div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default InputSkeleton;
