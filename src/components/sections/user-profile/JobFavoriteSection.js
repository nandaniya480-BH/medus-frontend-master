import React, { useEffect } from 'react';
import UserProfileJobCard from '../../elements/cards/UserProfileJobCard';
import {
  useGetUserJobFavoritesQuery,
  useGetUserDetailsQuery,
  useAddOrDeleteFavoriteJobMutation,
} from '../../../features/auth/userApiSlice';
import { Toaster, toast } from 'sonner';
import ToastMessage from '../../elements/toast/ToastMessage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import '../../../custom.css';
import { Pagination, EffectCards, Navigation } from 'swiper/modules';

const JobFavoriteSection = ({ categoryType }) => {
  const { data, isLoading } = useGetUserDetailsQuery();
  const [addOrDeleteFavorites, { isLoading: isAddOrDeleteLoading, isSuccess }] =
    useAddOrDeleteFavoriteJobMutation();
  const favorites = data?.data?.favourites;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Inserat erfolgreich entfernt!');
    }
  }, [isSuccess]);

  const handleAddOrDeleteFavorites = (jobId) => {
    return addOrDeleteFavorites(jobId);
  };
  return (
    <>
      <ToastMessage isSuccess={isSuccess} />
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>

      <div className="w-full flex flex-col text-center gap-3 py-4">
        {(isLoading || isAddOrDeleteLoading) && (
          <div className="w-full h-full mx-auto text-center pt-8">
            <div
              className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                    border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
          </div>
        )}
        {!favorites?.length && (
          <div className="w-full flex flex-col gap-8 items-end py-8">
            <h2 className="mx-auto font-bold text-blueGray-700 text-xl">
              <i className="far fa-bookmark text-2xl mr-1"></i> Es sind noch
              keine Favoriten vorhanden!
            </h2>
          </div>
        )}
        <div className="w-full flex flex-col items-center">
          <Swiper
            modules={[Pagination, Navigation]}
            // effect={'cards'}
            className="w-full mx-4"
            slidesPerView={1}
            spaceBetween={10}
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
              // when window width is <= 520px
              520: {
                slidesPerView: 2,
              },
              // when window width is <= 768px
              768: {
                slidesPerView: 1,
              },
              868: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {!isLoading &&
              !isAddOrDeleteLoading &&
              favorites?.length !== 0 &&
              favorites?.map((job, index) => (
                <SwiperSlide key={index} className="pl-4">
                  <UserProfileJobCard
                    key={job?.id}
                    addOrDeleteFavorites={handleAddOrDeleteFavorites}
                    job={job}
                    type="Favoriten"
                    extraCardClasses={'w-11/12'}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default JobFavoriteSection;
