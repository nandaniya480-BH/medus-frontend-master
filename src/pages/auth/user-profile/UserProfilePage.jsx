import React, { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import ImageTooltip from '../../../components/elements/images/ImageCircle';
import userImagePlaceholder from '../../../assets/img/user_placeholder.png';
import { userProfileCategories } from './utilities';
import PersonalInfoSection from '../../../components/sections/user-profile/PersonalInfoSection';
import MyAccountSection from '../../../components/sections/user-profile/MyAccountSection';
import MyDocumentsSection from '../../../components/sections/user-profile/MyDocumentsSection';
import JobRecommendationSection from '../../../components/sections/user-profile/JobRecommendationSection';
import JobRequestSection from '../../../components/sections/user-profile/JobRequestSection';
import AcceptedJobRequestSection from '../../../components/sections/user-profile/AcceptedJobRequestSection';
import JobFavoriteSection from '../../../components/sections/user-profile/JobFavoriteSection';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useUploadImageMutation } from '../../../features/auth/userApiSlice';
import { useGetUserDetailsQuery } from '../../../features/auth/userApiSlice';
import ImageUpload from '../../../components/elements/images/ImageUpload';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';

const MOBILE_BREAKPOINT = 768;

export default function UserProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [
    uploadImage,
    {
      data: uploadDataResponse,
      isLoading: isUploadLoading,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
    },
  ] = useUploadImageMutation();
  const [isMobile, setIsMobile] = useState(false);
  const [categoryType, setCategoryType] = useState(
    userProfileCategories[0].category
  ); // eslint-disable-line
  const { data, isLoading, isSuccess } = useGetUserDetailsQuery();
  const user = data?.data;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('image', data['image']);
    uploadImage(formData);
  };

  const imgProps = {
    name: 'image',
    changeButton: {
      children: 'Hochladen',
      type: 'button',
      className:
        'w-10/12 mx-auto py-3 px-auto border border-dashed rounded-lg border-blueGray-300 font-semibold',
    },
    removeButton: {
      children: 'bild zurücksetzen',
      type: 'button',
      className: 'w-full text-center text-red-500 font-semibold mt-2 text-sm',
    },
  };

  const textSkeletonLoader = (
    <div
      role="status"
      className="w-10/12 p-4 space-y-4 max-w-md rounded divide-y divide-gray-200 animate-pulse dark:divide-gray-500 md:p-6 dark:border-gray-500"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="w-1/2 h-2 bg-gray-300 rounded-full dark:bg-gray-300"></div>
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

  const userImageProps = {
    image:
      user?.image_url === ''
        ? userImagePlaceholder
        : 'https://medus.work/storage/' + user?.image_url,
    className: 'object-contain rounded-full',
    sizes: 'w-[150px] h-[150px]',
    alt: 'Profil bild',
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategoryClick = (item) => {
    setShowModal(false);
    setCategoryType(item);
  };

  const RenderImageUploadModal = () => {
    return (
      <>
        <div className="justify-center opacity-95 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-6/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6 bg-white text-blueGray-700">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">
                  {'Profil bild bearbeiten'}
                </h5>

                <button
                  className="font-semibold text-red-500 -mt-1"
                  onClick={() => setShowUploadImageModal(false)}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              {isUploadError && (
                <div className="w-full h-full text-center pt-2">
                  <span className="text-red-500 font-semibold text-lg">
                    <i className="fa-solid fa-circle-xmark" /> Etwas is schief
                    gelaufen.
                  </span>
                </div>
              )}
              {isUploadLoading && (
                <div className="w-full py-10 flex flex-col">
                  <div className="mx-auto my-auto flex flex-col items-center container gap-4">
                    <div
                      className="w-12 h-12 rounded-full animate-spin
                              border-[2px] border-dashed border-primary-500 border-t-transparent"
                    ></div>
                    <span className="font-semibold text-sm">
                      wird geladen...
                    </span>
                  </div>
                </div>
              )}
              {!isUploadLoading && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4 justify-center items-center"
                >
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'Please upload an image' }}
                    render={({ field }) => (
                      <ImageUpload
                        {...field}
                        {...imgProps}
                        placeholder={
                          user?.image_url !== ''
                            ? `https://medus.work/storage/${user?.image_url}`
                            : userImagePlaceholder
                        }
                      />
                    )}
                  />
                  {errors.image && <p>{errors.image.message}</p>}
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary-200 to-primary-regular rounded-full px-6 py-2 text-white font-semibold text-[14px] place-self-end"
                  >
                    <i className="fa-solid fa-save"></i> Speichern
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="opacity-15 fixed inset-0 z-40 bg-black blur-sm"></div>
      </>
    );
  };

  const renderCategories = () => {
    return (
      <div className="w-full flex flex-col text-left md:my-4 top-20 sticky my-auto">
        {userProfileCategories.map((item, index) => {
          const itemToRender = !item.to ? (
            <button
              key={item + index}
              onClick={() => handleCategoryClick(item.category)}
              className="text-blueGray-600 cursor-pointer text-lg font-bold my-2 px-4 py-2 rounded-lg shadow-md w-full text-left"
            >
              <i className={item.icon + ' fa-lg'}></i> {' - ' + item.category}
            </button>
          ) : (
            <Link
              to={item.to}
              key={item + index}
              className="min-w-[100%] w-full text-blueGray-600 cursor-pointer text-lg font-bold my-2 px-4 py-2 rounded-lg shadow-md text-left"
            >
              <i className={item.icon + ' fa-lg'}></i> {' - ' + item.category}
            </Link>
          );
          return itemToRender;
        })}
        <button
          key={'logout'}
          onClick={() => {
            navigate('/login');
            dispatch(logout());
          }}
          className="w-full text-blueGray-600 cursor-pointer text-lg font-bold my-2 px-4 py-2 rounded-lg shadow-md text-left"
        >
          <i className="fa-solid fa-right-from-bracket"></i> - Abmelden
        </button>
      </div>
    );
  };

  const renderCategorieTemplate = (category) => {
    switch (category) {
      case 'Mein Profil':
        return (
          <>
            <PersonalInfoSection
              user={user}
              isUserLoaded={isSuccess}
              categoryType={
                category +
                '<small style="color: grey; font-weight: 500"> Lebenslauf (CV)</small>'
              }
            />
          </>
        );
      case 'Job Anfragen':
        return (
          <>
            <JobRequestSection categoryType={category} />
          </>
        );
      case 'Akzeptierte Anfragen':
        return (
          <>
            <AcceptedJobRequestSection categoryType={category} />
          </>
        );
      case 'Job Empfehlungen':
        return (
          <>
            <JobRecommendationSection categoryType={category} />
          </>
        );
      case 'Meine Favoriten':
        return (
          <>
            <JobFavoriteSection categoryType={category} />
          </>
        );
      case 'Meine Dokumente':
        return (
          <>
            <MyDocumentsSection categoryType={category} />
          </>
        );
      case 'Mein Account':
        return (
          <>
            <MyAccountSection categoryType={category} />
          </>
        );
      default:
        return <>Nothing to show here</>;
    }
  };

  return (
    <>
      <Page>
        <PageContent>
          <ToastMessage
            isSuccess={isUploadSuccess}
            isError={isUploadError}
            successMessage="Bild erfolgreich hochgeladen!"
          />
          {showUploadImageModal && <RenderImageUploadModal />}
          <div
            className={`container mx-auto mt-10 mb-20 ${
              showUploadImageModal && 'blur-sm'
            }`}
          >
            <div className="flex md:flex-row flex-col">
              <div
                className={`md:w-4/12 p-4 flex flex-col items-center gap-4 text-center`}
              >
                <div className={`w-full text-center`}>
                  {isSuccess ? (
                    <ImageTooltip {...userImageProps} />
                  ) : (
                    imageSkeletonLoader
                  )}
                </div>
                {isSuccess ? (
                  <h2 className="text-xl font-bold">
                    {(user?.name || '') + ' ' + (user?.last_name || '')}
                    {!user?.name && !user?.last_name && 'leer'}
                  </h2>
                ) : (
                  textSkeletonLoader
                )}
                <button
                  onClick={() => setShowUploadImageModal(true)}
                  className="text-blueGray-500 font-semibold text-[16px]"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Profil bild
                  bearbeiten
                </button>

                {isMobile && (
                  <div className="w-full text-left">
                    <button
                      className="text-blueGray-600 cursor-pointer text-lg font-bold my-2 px-4 py-3 rounded-lg shadow-md w-full"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="fa-solid fa-bars text-primary-500"></i>{' '}
                      Profil Kategorien
                    </button>
                  </div>
                )}
                {showModal && (
                  <>
                    <div className="justify-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-full">
                        <div className="border-0 shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none px-6 py-4 pb-8">
                          {isMobile && (
                            <>
                              <div className="w-full text-right mb-4 mt-4">
                                <button
                                  className="text-lg font-bold text-red-500"
                                  onClick={() => setShowModal(false)}
                                >
                                  <i className="fa-solid fa-times"></i>{' '}
                                  Schliessen
                                </button>
                              </div>
                              {renderCategories()}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}

                {!isMobile && renderCategories()}
              </div>

              <div className="md:w-8/12 p-4">
                {renderCategorieTemplate(categoryType)}
              </div>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
}
