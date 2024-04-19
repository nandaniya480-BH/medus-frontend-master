import React from 'react';

function PageContainer({ children }) {
  return (
    <div
      tabIndex={0}
      className="relative flex flex-col items-center flex-1 w-full min-h-full"
    >
      {children}
    </div>
  );
}

export default PageContainer;
