import React, { useState } from 'react';

const FileInput = ({
  description = 'Dokumente hochladen ... (.PDF max 5MB)',
  isMultiple = true,
}) => {
  const [selectedFile, setSelectedFile] = useState([]);

  function handleRemoveFile(file) {
    const newFiles = Array.from(selectedFile).filter((item) => item !== file);
    setSelectedFile(newFiles);
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <input
          type="file"
          id="custom-input"
          onChange={(e) => setSelectedFile(e.target.files)}
          hidden
          multiple={isMultiple}
        />
        <label
          htmlFor="custom-input"
          className="block  w-6/12 text-md text-center py-3 px-6
                            rounded-full border-0 text-sm font-semibold bg-blue-50
                            text-primary-500 hover:bg-blue-50 cursor-pointer"
        >
          <i className="fa-solid fa-file"></i> Durchsuchen
        </label>
        <label className=" w-full text-sm text-slate-500 ">
          {!selectedFile.length
            ? description
            : Array.from(selectedFile).map((item) => {
                return (
                  <div
                    key={item.name}
                    className="w-full flex flex-row p-2 border-b-[0.5px] justify-between"
                  >
                    <span className="w-8/12">
                      <i className="fa-solid fa-file"></i> {item.name} <br />
                    </span>
                    <span
                      onClick={() => handleRemoveFile(item)}
                      className="w-4/12 text-md text-right font-bold text-red-500 cursor-pointer"
                    >
                      <i className="fa-solid fa-times"></i> Entfernen
                    </span>
                  </div>
                );
              })}
        </label>
      </div>
    </>
  );
};

export default FileInput;
