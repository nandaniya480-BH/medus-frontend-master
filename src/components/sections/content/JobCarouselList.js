import React, { useRef } from 'react';
// import JobTeaserSmall from '../../elements/cards/JobTeaserSmall';
// import Slider from 'react-slick';
// import Button from '../../elements/buttons/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { carouselDummyData, carouselSettings } from './utilities';
import companyImage from '../../../assets/img/company_placeholder.png';
import { useGetJobsQuery } from '../../../features/jobs/jobsApiSlice';
import JobTeaserFullWidth from '../../elements/cards/JobTeaserFullWidth';
import { Link } from 'react-router-dom';
import JobSkeleton from '../../elements/skeleton/job';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import '../../../custom.css';
import { Pagination, EffectCards, Navigation } from 'swiper/modules';

const JobCarouselList = () => {
  const { data, isLoading } = useGetJobsQuery({
    perPage: 5,
    page: 1,
    // on_top: 1,
  });
  const jobs = data?.data;

  return (
    <div key={'top-jobs'} className="mt-8 container mx-auto md:px-0 px-2 mb-32">
      <h1
        key={'section-title'}
        className="text-center text-3xl text-blueGray-700 font-bold mt-8 mb-8"
      >
        TOP Job-Inserate
      </h1>

      <div className=" mx-auto w-full md:w-10/12 flex flex-col align-items-center md:px-8 items-center">
        {(isLoading && (
          <div className="w-full md:px-4">
            <JobSkeleton />
          </div>
        )) || (
          <>
            <Swiper
              modules={[Pagination, Navigation]}
              // effect={'cards'}
              className="w-full mx-4"
              slidesPerView={3}
              autoplay
              observer
              allowSlideNext={true}
              allowSlidePrev={true}
              grabCursor={true}
              pagination={{
                clickable: true,
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets',
                },
              }}
              navigation={true}
              breakpoints={{
                // when window width is <= 320px
                320: {
                  slidesPerView: 1,
                },
                // when window width is <= 480px
                425: {
                  slidesPerView: 1,
                },
                // when window width is <= 640px
                768: {
                  slidesPerView: 1,
                },
              }}
            >
              {jobs?.map((job, index) => {
                const companyImageProp = {
                  image: companyImage,
                  text: '',
                  className: 'rounded-lg',
                };
                return (
                  <SwiperSlide key={index}>
                    <JobTeaserFullWidth
                      jobId={job?.id}
                      image={companyImageProp}
                      color="primary"
                      location={`${job?.kantone?.name}`}
                      date={job?.created_at}
                      pensum={`${job?.workload_from}% - ${job?.workload_to}%`}
                      title={job?.job_title}
                      key={job.job_title + index}
                      employementType={job?.contract_type?.name}
                      // isSponsored={index === 1}
                      link={{ to: '/job/' + job?.slug }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCarouselList;
