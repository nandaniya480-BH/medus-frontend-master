import userImagePlaceholder from '../../../assets/img/user_placeholder.png';
import ImageTooltip from '../../../components/elements/images/ImageCircle';
import { languageLevels } from '../user-profile/utilities';

const EmployeeResume = ({
  user,
  isUserLoading = true,
  isAnnonymous = true,
}) => {
  const workTimeOptions = [
    'none',
    'Regelmässig',
    'unregelmässig',
    'Regelmässig und unregelmässig',
  ];
  const positionOptions = [
    'none',
    'mit Führungsaufgaben',
    'ohne Führungsaufgaben',
    'mit Führungsaufgaben und ohne Führungsaufgaben',
  ];
  const textSkeletonLoader = (width = 12) => (
    <div role="status" className="w-12/12 animate-pulse py-auto">
      <div className="flex justify-start items-center">
        <div
          className={`w-${
            width === 12 ? 'full' : width + '/12'
          }  h-2 bg-gray-300 rounded-full dark:bg-gray-300`}
        ></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
  const imageSkeletonLoader = (
    <div
      role="status"
      className="w-full divide-y divide-gray-200 animate-pulse dark:divide-gray-500 dark:border-gray-500"
    >
      <div className="rounded-full bg-gray-300 w-32 h-32 mx-auto"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
  return (
    <div className=" bg-white w-full flex flex-col mx-auto">
      <div id="resume-template" className="flex flex-col gap-8">
        <div className="w-full flex flex-col items-left gap-6 mb-4 text-left bg-gradient-to-r from-primary-regular to-primary-200 text-white rounded-lg">
          <div className="w-full flex md:flex-row flex-col gap-8 px-4 py-6">
            <div className="md:w-2/12 w-6/12 mx-auto text-center">
              {!isUserLoading ? (
                <ImageTooltip
                  image={
                    !isAnnonymous && user?.image_url !== ''
                      ? `https://medus.work/storage/${user?.image_url}`
                      : userImagePlaceholder
                  }
                  className={'rounded-full object-cover'}
                  sizes={'w-[150px] h-[150px]'}
                />
              ) : (
                imageSkeletonLoader
              )}
            </div>
            <div className="md:w-10/12 flex flex-col gap-2">
              {!isUserLoading ? (
                <h2 className="text-2xl font-bold place-self-start">
                  {isAnnonymous
                    ? 'medus.work User'
                    : user?.name + ' ' + user.last_name}
                </h2>
              ) : (
                textSkeletonLoader(4)
              )}

              {!isUserLoading ? (
                <h5 className="font-semibold text-lg">
                  {user?.work_experiences?.length > 0 &&
                    user.work_experiences[0].position_title}
                </h5>
              ) : (
                textSkeletonLoader(4)
              )}

              <div className="w-full flex flex-col pt-8">
                {!isUserLoading ? (
                  <>
                    <h5 key={'email'} className="font-semibold text-lg mr-8">
                      <i className="fa-solid fa-envelope mr-1" />
                      {isAnnonymous
                        ? 'Kandidat kontaktieren um E-mail Adresse zu sehen!'
                        : user?.email}
                    </h5>
                    {user?.phone && (
                      <h5 key={'phone'} className="font-semibold text-lg mr-8">
                        <i className="fa-solid fa-phone  mr-1" />
                        {user.phone}
                      </h5>
                    )}
                    <h5 key={'address'} className="font-semibold text-lg mr-8">
                      {(user?.address || user?.plz || user?.kantone) && (
                        <i className="fa-solid fa-location-pin  mr-1" />
                      )}
                      {user?.addess && user.address + ', '}
                      {user?.plz && user.plz?.plz + ' / ' + user.plz.ort}
                      {user?.kantone?.name && ' , ' + user.kantone.name}
                    </h5>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    {textSkeletonLoader(4)}
                    {textSkeletonLoader(4)}
                    {textSkeletonLoader(4)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h5 className="mt-4 text-2xl font-bold mb-2">
            <i className="fa-solid fa-circle-info"></i> Mein kurz Profil
          </h5>
          {!isUserLoading ? (
            <blockquote className="text-[15px] italic border-l-2 border-blueGray-800 mx-4 px-2 my-1">
              {user?.description}
            </blockquote>
          ) : (
            <div className="flex flex-col content-center gap-4 p-4">
              {textSkeletonLoader()}
              {textSkeletonLoader()}
              {textSkeletonLoader()}
              {textSkeletonLoader()}
            </div>
          )}
        </div>

        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h2 className="text-2xl font-bold place-self-start">
            <i className="fa-solid fa-user-graduate"></i> Ausbildung
          </h2>
          {!isUserLoading ? (
            <>
              {user?.educations?.length > 0 &&
                user?.educations?.map((item) => (
                  <div
                    key={item?.name + item?.id}
                    className="border-b-[0.5px] border-blueGray-300 mx-4 mt-4 pb-4"
                  >
                    <h5 className="font-semibold text-blueGray-700 text-lg">
                      {item?.name}
                    </h5>
                    <div className="w-full flex flex-row gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700">
                      <span className="w-full">
                        <i className="fa-solid fa-calendar-days mr-1"></i>
                        {item.start_date} -{' '}
                        {item?.end_date ? item.end_date : 'aktuell'}
                      </span>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="w-full flex flex-col gap-4 p-4">
              {textSkeletonLoader(6)}
              <div className="flex flex-row gap-4">
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h2 className="text-2xl font-bold place-self-start">
            <i className="fa-solid fa-briefcase"></i> Werdegang
          </h2>

          {!isUserLoading ? (
            <>
              {user?.work_experiences?.length > 0 &&
                user?.work_experiences?.map((item) => (
                  <div
                    key={item?.name + item?.id}
                    className="border-b-[0.5px] border-blueGray-300 mx-4 mt-4 pb-4"
                  >
                    <h2 className="font-bold text-blueGray-700 text-lg">
                      {item?.employer_name}
                    </h2>
                    <h5 className="font-semibold text-blueGray-700 text-lg">
                      {item?.position_title}
                    </h5>
                    <div className="w-full flex flex-row gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700">
                      <span className="w-full">
                        <i className="fa-solid fa-calendar-days mr-1"></i>
                        {item.start_date} -{' '}
                        {item?.end_date ? item.end_date : 'aktuell'}
                      </span>
                    </div>

                    <div
                      className="w-full flex flex-row gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700"
                      dangerouslySetInnerHTML={{
                        __html: item?.activitites,
                      }}
                    />
                  </div>
                ))}
            </>
          ) : (
            <div className="w-full flex flex-col gap-4 p-4">
              {textSkeletonLoader(6)}
              <div className="flex flex-row gap-4">
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
              </div>
              {textSkeletonLoader()}
              {textSkeletonLoader()}
            </div>
          )}
        </div>

        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h2 className="text-2xl font-bold place-self-start mb-4">
            <i className="fa-solid fa-language"></i> Sprachkenntisse
          </h2>
          {!isUserLoading ? (
            <>
              {user?.languages?.length > 0 &&
                user?.languages?.map((item) => (
                  <h5
                    key={item.name}
                    className="font-semibold text-blueGray-700 text-lg mx-4"
                  >
                    <span className="mr-4"> ● {item?.name}:</span>
                    {languageLevels[item?.level].label}
                  </h5>
                ))}
            </>
          ) : (
            <div className="w-full flex flex-col gap-4 p-4">
              <div className="flex flex-row gap-4">
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
                <div className="w-2/12">{textSkeletonLoader(12)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h2 className="text-2xl font-bold place-self-start mb-4">
            <i className="fa-solid fa-gears"></i> Job Präferenzen
          </h2>
          {!isUserLoading ? (
            <>
              <h5
                key={'contract_types'}
                className="font-semibold text-blueGray-700 text-lg border-b mx-4 pb-2 mb-1"
              >
                <span className="mr-4">Anstellungsart:</span>
                {user?.contract_types?.length > 0
                  ? user?.contract_types?.map((item) => (
                      <span key={item?.id} className=" mr-1">
                        ● {item?.name}
                      </span>
                    ))
                  : 'leer'}
              </h5>
              <h5
                key={'job_kategories'}
                className="font-semibold text-blueGray-700 text-lg border-b mx-4  pb-2 mb-1"
              >
                <span className="mr-4">Job Kategories:</span>
                {user?.job_sub_categories?.length > 0
                  ? user?.job_sub_categories?.map((item) => (
                      <span key={item?.id} className=" mr-1">
                        ● {item?.name}
                      </span>
                    ))
                  : 'leer'}
              </h5>
              <h5
                key={'pensum'}
                className="font-semibold text-blueGray-700 text-lg border-b mx-4  pb-2 mb-1"
              >
                <span className="mr-4">Pensum:</span>
                {(user?.workload_from || '0 ') +
                  '%' +
                  ' - ' +
                  (user?.workload_to || '100 ') +
                  '%'}
              </h5>
              <h5
                key={'worktime'}
                className="font-semibold text-blueGray-700 text-lg border-b mx-4  pb-2 mb-1"
              >
                <span className="mr-4">Arbeitszeiten:</span>
                {workTimeOptions[user?.work_time] || 'leer'}
              </h5>
              <h5
                key={'position'}
                className="font-semibold text-blueGray-700 text-lg border-b mx-4  pb-2 mb-1"
              >
                <span className="mr-4">Position:</span>
                {positionOptions[user?.position] || 'leer'}
              </h5>
            </>
          ) : (
            <div className="flex flex-col gap-5">
              {textSkeletonLoader(8)}
              {textSkeletonLoader(8)}
              {textSkeletonLoader(8)}
              {textSkeletonLoader(8)}
              {textSkeletonLoader(8)}
            </div>
          )}
        </div>

        <div className="w-full flex flex-col text-blueGray-700 px-4">
          <h2 className="text-2xl font-bold place-self-start mb-4">
            <i className="fa-solid fa-list-check"></i> Kompetenzen
          </h2>
          <div className="w-full flex flex-wrap gap-1 justify-start font-bold text-lg text-primary-500 mx-4">
            {!isUserLoading ? (
              user?.soft_skills?.length ? (
                user.soft_skills.map((item) => (
                  <span key={item?.name + item.id} className="py-[0.5px] px-2">
                    # {item?.name}
                  </span>
                ))
              ) : (
                'leer'
              )
            ) : (
              <div className="w-full flex flex-col gap-4 p-4">
                <div className="flex flex-row gap-4">
                  <div className="w-2/12">{textSkeletonLoader(12)}</div>
                  <div className="w-2/12">{textSkeletonLoader(12)}</div>
                  <div className="w-2/12">{textSkeletonLoader(12)}</div>
                  <div className="w-2/12">{textSkeletonLoader(12)}</div>
                  <div className="w-2/12">{textSkeletonLoader(12)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full rounded-lg shadow-lg text-center text-blueGray-700 px-4 py-4 text-sm bg-gradient-to-r from-primary-regular to-primary-200 text-white font-semibold">
          <span>Annonymes medus.work Resume</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeResume;
