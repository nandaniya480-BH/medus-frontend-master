import React from 'react';
import UserProfileJobCard from '../../elements/cards/UserProfileJobCard';
import {
  useGetContactRequestsQuery,
  useAcceptOrDeclineRequestMutation,
} from '../../../features/auth/userApiSlice';

const JobRequestSection = ({ categoryType }) => {
  const { data: contactRequests, isLoading } = useGetContactRequestsQuery();
  const [acceptOrDeclineRequest, { isLoading: isRequestLoading }] =
    useAcceptOrDeclineRequestMutation();
  const handleAcceptOrDeclineRequest = (contactId, employeeResponse) => {
    return acceptOrDeclineRequest({
      id: contactId,
      employee_response: employeeResponse,
    });
  };
  return (
    <>
      {isLoading && isRequestLoading && (
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
      {!isLoading && !isRequestLoading && (
        <>
          <div className="flex md:flex-row flex-col justify-start">
            <h2
              dangerouslySetInnerHTML={{ __html: categoryType }}
              className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
            />
          </div>

          <div className="w-full flex md:flex-row flex-col gap-3 py-4">
            {!isLoading && contactRequests?.data?.length === 0 && (
              <div className="w-full flex flex-col gap-8 items-end py-8">
                <h2 className="mx-auto font-bold text-blueGray-700 text-xl">
                  <i className="fa-solid fa-bell text-2xl mr-1"></i> Noch keine
                  Anfragen!
                </h2>
              </div>
            )}
            {contactRequests?.data?.length > 0 &&
              contactRequests.data.map((contact, index) => (
                <UserProfileJobCard
                  key={index}
                  type="Anfrage"
                  extraCardClasses={'md:w-4/12 w-full'}
                  job={contact}
                  handleRequest={handleAcceptOrDeclineRequest}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobRequestSection;
