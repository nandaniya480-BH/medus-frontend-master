import React, { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import ImageTooltip from '../../../components/elements/images/ImageCircle';
import companyImagePlaceholder from '../../../assets/img/company_placeholder.png';
import { companyProfileCategories } from './utilities';
import PersonalInfoSection from '../../../components/sections/company-profile/PersonalInfoSection';
import { Link, useNavigate } from 'react-router-dom';
import CreateInseratSection from '../../../components/sections/company-profile/CreateInserSection';
import MyAccountCompanySection from '../../../components/sections/company-profile/MyAccountSection';
import SupportSection from '../../../components/sections/company-profile/SupportSection';
import InseratAndSuggestionSection from '../../../components/sections/company-profile/InseratAndSuggestionSection';
import CompanyCostSection from '../../../components/sections/company-profile/CompanyCostSection';
import { useGetCompanyDetailsQuery } from '../../../features/auth/companyApiSlice';
import { useUploadImageMutation } from '../../../features/auth/companyApiSlice';
import ImageUpload from '../../../components/elements/images/ImageUpload';
import { useForm, Controller } from 'react-hook-form';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { logout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
const MOBILE_BREAKPOINT = 768;

export default function CompanyProfilePage() {
  const { data, isLoading, isSuccess } = useGetCompanyDetailsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = data?.data;
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
  const [showModal, setShowModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryType, setCategoryType] = useState(
    companyProfileCategories[0].category
  ); // eslint-disable-line

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('image', data['image']);
    uploadImage(formData);
  };

  const companyImageProps = {
    image:
      company?.logo_url === ''
        ? companyImagePlaceholder
        : 'https://medus.work/storage/' + company?.logo_url,
    className: 'object-contain rounded-full',
    sizes: 'w-[150px] h-[150px]',
    alt: 'Profil bild',
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
                          company?.logo_url !== ''
                            ? `https://medus.work/storage/${company?.logo_url}`
                            : companyImagePlaceholder
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
      <div className="w-full text-left md:my-4 top-20 sticky my-auto">
        {companyProfileCategories.map((item, index) => {
          return (
            <button
              key={item + index}
              onClick={() => handleCategoryClick(item.category)}
              className="text-blueGray-600 cursor-pointer text-lg font-bold my-2 px-4 py-2 rounded-lg shadow-md w-full text-left"
            >
              <i className={item.icon + ' fa-lg'}></i> {' - ' + item.category}
            </button>
          );
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
      case 'Unternehmensprofil':
        return (
          <>
            <PersonalInfoSection
              isCompanyLoaded={isSuccess}
              company={company}
              categoryType={category}
            />
          </>
        );
      case 'Inserat Erstellen':
        return (
          <>
            <CreateInseratSection
              categoryType={'Neues Stellen-Inserat erfassen'}
            />
          </>
        );
      case 'Inserate & Personal Emfpehlungen':
        return (
          <>
            <InseratAndSuggestionSection categoryType={category} />
          </>
        );
      case 'Kosten':
        return (
          <>
            <CompanyCostSection categoryType={category} />
          </>
        );
      case 'Mein Account':
        return (
          <>
            <MyAccountCompanySection categoryType={category} />
          </>
        );
      case 'Support':
        return (
          <>
            <SupportSection categoryType={category} />
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
              <div className="md:w-4/12 p-4 flex flex-col items-center gap-6 text-center">
                <div className="w-full text-center">
                  {isSuccess ? (
                    <ImageTooltip {...companyImageProps} />
                  ) : (
                    imageSkeletonLoader
                  )}
                </div>

                {isSuccess ? (
                  <h2 className="text-xl font-bold">
                    {company?.name ? company.name : 'leer'}
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
