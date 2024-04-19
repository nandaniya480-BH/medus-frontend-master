import React from 'react';
import headerImage from '../../../assets/img/app_banner.jpg';
import companyImage from '../../../assets/img/company_placeholder.png';
import HeaderJobDetails from '../../../components/sections/headers/HeaderJobDetails';
import ImageTooltip from '../../../components/elements/images/ImageCircle';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';

export default function JobDetailsPageContent({ job = {}, isPreview = false }) {
  const jobHeaderProps = {
    job: job,
    icon: 'far fa-newspaper',
    image: headerImage,
  };

  const companyImageProp = {
    image: companyImage,
    text: 'Logo',
    className: 'rounded-lg',
    alt: 'Unternehmens Profil bild',
  };
  const isJobUrl = job?.job_url && job.job_url !== '' && job.job_url !== null;
  const isJobFile =
    job?.job_file_url && job.job_file_url !== '' && job.job_file_url !== null;
  const isPreviewJobFile =
    job?.job_file && job.job_file !== '' && job.job_file !== null;

  return (
    <>
      <div className="w-full">
        <HeaderJobDetails {...jobHeaderProps} />
      </div>

      <div className="container mx-auto pt-20 pb-20">
        <div className="flex md:flex-row flex-col gap-4 text-center">
          <div className="md:w-8/12 p-6 md:mx-0 mx-4 text-left rounded-lg shadow-lg">
            <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl underline">
              Job Beschreibung:
            </h2>

            {isJobUrl && (
              <div className="w-full">
                <Iframe
                  url={job.job_url}
                  height="1000px"
                  id=""
                  className="w-full"
                  display="block"
                  position="relative"
                />
              </div>
            )}
            {!isJobUrl && (isJobFile || isPreviewJobFile) && (
              <div className="w-full">
                <object
                  data={
                    isJobFile
                      ? `https://medus.work/storage/${job?.job_file_url}`
                      : URL.createObjectURL(job?.job_file[0])
                  }
                  className="w-full min-h-screen rounded-lg"
                />
              </div>
            )}
            {!isJobUrl && !isJobFile && (
              <div
                className="w-full prose p-4 text-sm text-left"
                dangerouslySetInnerHTML={{ __html: job?.job_content }}
              />
            )}
          </div>
          <div className="md:w-4/12 pt-2">
            <div className="flex flex-col text-left text-blueGray-800 md:sticky md:top-4 gap-8 ">
              <div className="p-8 text-[15px] md:mx-0 mx-4 rounded-lg shadow-lg">
                <h2 className="font-bold my-auto text-xl underline mb-2">
                  Details:
                </h2>
                <h5 className="border-b-[0.5px] pb-1 mb-2">
                  <span className="text-gray-500">Standort:</span>
                  <br />
                  {!isPreview ? job?.plz?.ort : job?.ort}
                </h5>
                <h5 className="border-b-[0.5px] pb-1 mb-2">
                  <span className="text-gray-500">Kanton:</span>
                  <br />
                  {!isPreview ? job?.kantone?.name : job?.kantone}
                </h5>
                <h5 className="border-b-[0.5px] pb-1 mb-2">
                  <span className="text-gray-500">Kategorie:</span>
                  <br />
                  {!isPreview
                    ? job?.job_subcategory?.name
                    : job?.job_subcategories.find(
                        (el) => el.value === job?.job_subcategory_id
                      )?.label}
                </h5>
                <h5 className="border-b-[0.5px] pb-1 mb-2">
                  <span className="text-gray-500">Anstellungsart:</span>
                  <br />
                  {!isPreview
                    ? job?.contract_type?.name
                    : job?.contract_type?.label}
                </h5>
                {job?.work_time != 0 && (
                  <h5 className="border-b-[0.5px] pb-1 mb-2">
                    <span className="text-gray-500">Arbeitszeiten:</span>
                    <br />
                    {job?.work_time == 1 && 'Regelmässig'}
                    {job?.work_time == 2 && 'Unregelmässig'}
                    {job?.work_time == 3 && 'Regelmässig oder Unregelmässig'}
                  </h5>
                )}

                {job?.position != 0 && (
                  <h5 className="border-b-[0.5px] pb-1 mb-2">
                    <span className="text-gray-500">Position:</span>
                    <br />
                    {job?.position == 1 && 'mit Führungsaufgaben'}
                    {job?.position == 2 && 'ohne Führungsaufgaben'}
                    {job?.position == 3 && (
                      <span>mit oder ohne Führungsaufgaben</span>
                    )}
                  </h5>
                )}

                <h5>
                  <span className="text-gray-500">Pensum:</span>
                  <br />
                  {job?.workload_from}% - {job?.workload_to}%
                </h5>
              </div>
              {!isPreview && (
                <div className="p-8 text-sm rounded-lg shadow-lg md:mx-0 mx-4">
                  <h2 className="font-bold my-auto text-xl underline mb-2">
                    Unternehmen:
                  </h2>

                  <div className="w-full text-[15px] flex flex-col gap-2">
                    <div className="w-6/12 mx-auto">
                      <ImageTooltip {...companyImageProp} />
                    </div>
                    <div className="w-full">
                      <h5 className="text-lg text-center font-bold mb-2 text-primary-500">
                        <Link
                          to={`/company/${job?.employer?.slug}`}
                          className=""
                        >
                          Profil ansehen
                        </Link>
                      </h5>
                      <h5 className="text-xl text-center font-bold mb-2">
                        <Link to={'/company/1'} className="">
                          {job?.employer?.name || 'Company name placeholder'}
                        </Link>
                      </h5>

                      <h5 className="border-b-[0.5px] pb-1 mb-2">
                        <span className="text-gray-500">
                          Ansprechspartner::
                        </span>
                        <br />
                        {job?.c_person_name} {job?.c_person_last_name}
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2">
                        <span className="text-gray-500">Kontakt:</span>
                        <br />
                        <i className="fa-solid fa-phone"></i>{' '}
                        {job?.c_person_phone}
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2 ">
                        <span className="text-gray-500">Standort:</span>
                        <br />
                        {job?.employer?.address || 'Address placeholder'} <br />
                        {job?.plz?.plz}, {job?.ort} <br />
                        <a
                          className="font-semibold text-primary-500"
                          href={`https://www.google.com/maps/place/${job?.employer?.address}, ${job?.plz?.plz} ${job?.ort}, Switzerland`}
                          target="_blank"
                        >
                          <i className="fa-solid fa-map"></i> Auf der Karte
                          anzeigen
                        </a>
                      </h5>
                      <h5 className="border-b-[0.5px] pb-1 mb-2 text-primary-500 cursor-pointer">
                        <span className="text-gray-500">Firmenwebsite:</span>
                        <br />
                        <a
                          className="font-semibold"
                          href={'https://' + job?.employer?.page_url}
                          target="_blank"
                        >
                          {job?.employer?.page_url}
                        </a>
                      </h5>
                      {/* <h5 className="border-b-[0.5px] pb-1 mb-2 text-primary-500 cursor-pointer">
                        <span className="text-gray-500">
                          Aktuell offene Stellen:
                        </span>
                        <br />8 Stellenangebote | Hardcoded
                      </h5> */}
                      <h5 className="border-b-[0.5px] pb-1 mb-2">
                        <span className="text-gray-500">Mitarbeiter:</span>
                        <br />
                        {job?.employer?.size || 'company size placeholder'}
                      </h5>
                      <h5>
                        <span className="text-gray-500">
                          Unternehmenskategorie:
                        </span>
                        <br />
                        {job?.employer_category?.name || 'category placeholder'}
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
