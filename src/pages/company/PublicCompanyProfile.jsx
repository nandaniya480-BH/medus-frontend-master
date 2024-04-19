import React from 'react';
import Page from '../../anatomy/Page';
import PageContent from '../../components/containers/PageContent';
import companyImage from '../../assets/img/company_placeholder.png';
import ImageTooltip from '../../components/elements/images/ImageCircle';
import JobTeaserFullWidth from '../../components/elements/cards/JobTeaserFullWidth';
import { useGetPublicCompanyDetailsQuery } from '../../features/auth/companyApiSlice';
import { useParams } from 'react-router-dom';

export default function PublicCompanyProfile() {
  const params = useParams();
  const { data, isLoading } = useGetPublicCompanyDetailsQuery(params?.slug);
  const company = data?.data;
  const companyImageProp = {
    image:
      company?.logo_url === ''
        ? companyImage
        : 'https://medus.work/storage/' + company?.logo_url,
    text: 'dummy company logo text',
    className: 'rounded-lg',
    alt: 'Unternehmens profil bild',
  };

  return (
    <>
      <Page>
        <PageContent>
          {isLoading && (
            <div className="w-full h-full text-center pt-8">
              <div
                className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                    border-[2px] border-dashed border-primary-500 border-t-transparent"
              ></div>
            </div>
          )}
          {!isLoading && (
            <div className="container mx-auto mt-20 mb-20">
              <div className="flex md:flex-row flex-col gap-4 text-center">
                <div className="md:w-4/12 pt-2 md:mx-0 mx-4 text-left ">
                  <div className="w-full text-[15px] flex flex-col gap-2 rounded-lg p-8 shadow-lg">
                    <div className="w-6/12 mx-auto">
                      <ImageTooltip {...companyImageProp} />
                    </div>
                    <div className="w-full">
                      <h5 className="text-xl text-center font-bold mb-4">
                        {company?.name}
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2 text-blueGray-700">
                        <span className="text-gray-500">Standort:</span>
                        <br />
                        <span className="font-semibold">
                          {company?.address}{' '}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {company?.plz?.plz}, {company?.ort}{' '}
                        </span>
                        <br />
                        <span className="text-primary-500 cursor-pointer">
                          <a
                            className="font-semibold"
                            href={`https://www.google.com/maps/place/${company?.address}, ${company?.plz?.plz} ${company?.ort}, Switzerland`}
                            target="_blank"
                          >
                            <i className="fa-solid fa-map"></i> Auf der Karte
                            anzeigen
                          </a>
                        </span>
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2 text-primary-500 cursor-pointer">
                        <span className="text-gray-500">Firmenwebsite:</span>
                        <br />
                        <a
                          className="font-semibold"
                          href={'https://' + company?.page_url}
                          target="_blank"
                        >
                          {company?.page_url}
                        </a>
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2 text-blueGray-700">
                        <span className="text-gray-500">Mitarbeiter:</span>
                        <br />
                        <span className="font-semibold">{company?.size}</span>
                      </h5>
                      <h5>
                        <span className="text-gray-500">
                          Unternehmenskategorie:
                        </span>
                        <br />
                        <span className="font-semibold text-blueGray-700">
                          {company?.category?.name}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="md:w-8/12 pt-2 px-4 flex flex-col gap-4 text-left">
                  <div className="w-full px-2 text-[15px]">
                    <h5 className="text-xl font-bold mb-4 pb-2 border-b-[0.5px]">
                      Firmenprofil:{' '}
                    </h5>
                    <blockquote className="w-full font-normal text-[14px] border-l-2 border-blueGray-800 px-2 my-1">
                      {company?.description}
                    </blockquote>
                  </div>
                  <div className="w-full">
                    <h5 className="text-xl ml-2 font-bold mb-4 pb-2 border-b-[0.5px]">
                      Aktuell offene Stellen:{' '}
                    </h5>
                    {company?.jobs?.length === 0 && (
                      <div className="w-full text-center">
                        <p className="text-xl font-semibold text-blueGray-700">
                          <i className="fa-solid fa-face-frown mr-2"></i>
                          Derzeit keine offenen Stellen
                        </p>
                      </div>
                    )}
                    {company?.jobs?.length > 0 &&
                      company?.jobs?.map((job, index) => (
                        <JobTeaserFullWidth
                          key={job.slug + index}
                          image={companyImageProp}
                          showImage={false}
                          color={'primary'}
                          title={job?.job_title}
                          location={job?.ort}
                          pensum={
                            job?.workload_from + '% - ' + job?.workload_to + '%'
                          }
                          link={{ to: `/job/${job?.slug}` }}
                          date={new Date(
                            job?.job_details?.start_date
                              ? job?.job_details?.start_date
                              : job?.created_at
                          ).toLocaleDateString('de-DE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                          employementType={job?.contract_type?.name}
                          isSponsored={index === 1}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageContent>
      </Page>
    </>
  );
}
