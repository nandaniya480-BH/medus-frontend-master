import React from 'react';

function PageContent({ children }) {
  return (
    <div className="w-full min-h-full flex flex-col flex-1">{children}</div>
  );
}

export default PageContent;
