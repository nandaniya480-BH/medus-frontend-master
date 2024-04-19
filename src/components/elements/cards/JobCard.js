import React from 'react';
import img from '../../../assets/img/pvermittlung.jpg';
import Button from '../buttons/Button';
const JobCard = () => {
  return (
    <div className="w-full rounded-md bg-white drop-shadow-md  my-4 flex">
      <div className="w-3/12 lg:block hidden  rounded-md bg-gray-300">
        <img
          src={img}
          className="w-full h-full opacity-80 rounded-md object-cover hover:object-contain"
        />
      </div>
      <div className="flex-1 px-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Company name</h2>
          <span className="text-gray-400 text-sm">
            <i className={'fa-solid fa-calendar-days mr-1 opacity-75'}></i>{' '}
            21/12/2024
          </span>
        </div>

        <h1 className="text-xl font-semibold text-gray-500">
          Product designer needed
        </h1>
        <div className="flex gap-3 text-sm">
          <span className="text-gray-400">
            <i className={'fas fa-location-pin mr-1 opacity-75'}></i>{' '}
            Kantone/ort
          </span>
          <span className="text-gray-400">
            <i className="fa-regular fa-calendar"></i> 40%-60%
          </span>
          <span className="text-gray-400">
            <i className="fa-regular fa-clock"></i> Temporar
          </span>
        </div>
        <p className="font-light text-md py-2">
          this is job description part this is job description part this is job
          description part this is job description part ....
        </p>
        <div className="pb-2 flex justify-between">
          <span className="text-xl">
            <i className="fa-regular fa-heart"></i>
          </span>
          <Button size="sm">Read more</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
