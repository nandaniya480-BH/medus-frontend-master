import React from 'react';
import UserProfileJobCard from '../../elements/cards/UserProfileJobCard';
import {
  useGetUserDetailsQuery,
  useGetSuggestedJobsQuery,
} from '../../../features/auth/userApiSlice';

const JobRecommendationSection = ({ categoryType }) => {
  const { data, isLoading } = useGetSuggestedJobsQuery();
  const recommendations = data?.data;
  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      {isLoading && (
        <div className="w-full py-10 flex flex-col">
          <div className="mx-auto my-auto flex flex-col items-center container gap-4">
            <div
              className="w-12 h-12 rounded-full animate-spin
                    border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
            <span className="font-semibold text-sm">wird geladen...</span>
          </div>
        </div>
      )}
      {!isLoading && recommendations?.length === 0 && (
        <div className="w-full flex flex-col gap-8 items-end py-8">
          <h2 className="mx-auto font-bold text-blueGray-700 text-xl">
            <i className="fa-solid fa-magic text-2xl mr-1"></i> Keine
            Empfehlungen vorhanden!
          </h2>
        </div>
      )}
      {!isLoading && recommendations?.length > 0 && (
        <div className="w-full flex md:flex-row flex-col gap-3 py-4">
          {recommendations?.map((recommendation, index) => (
            <UserProfileJobCard
              key={index}
              type="Empfehlung"
              extraCardClasses={'md:w-4/12 w-full'}
              job={recommendation}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default JobRecommendationSection;
