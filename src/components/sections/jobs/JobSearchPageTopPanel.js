import React from 'react';
import Button from '../../elements/buttons/Button';
import Input from '../../elements/input/Input';

function JobSearchPageTopPanel() {
  const titleProps = { placeholder: 'Job', leftIcon: 'fas fa-search' };
  const searchBtn = {
    color: 'primary',
    children: 'Suchen',
    fullWidth: true,
    roundedSize: 'full',
  };

  return (
    <div className="sm:rounded-lg justify-items-center">
      <div className="bg-white p-3 md:p-3 md:w-8/12 mx-auto">
        <h1 className="text-xl font-bold ml-4 mb-4 leading-tight text-blueGray-800">
          Nach was suchen Sie?
        </h1>
        <div className="flex flex-wrap items-start">
          <div className="w-full md:w-4/5 px-3 mb-6 md:mb-0">
            <Input {...titleProps} />
          </div>
          <div className="w-full md:w-1/5 px-3 md:mb-0">
            <Button {...searchBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchPageTopPanel;
