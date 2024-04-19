import React from 'react';
import PropTypes from 'prop-types';
import promotionImg from '../../../assets/img/promo.png';
import topSellerImg from '../../../assets/img/topseller.png';

function CompanyCreateInseratPricingCard({
  gridClass,
  isActive,
  label,
  hasPromotion,
  promotionDate,
  price,
  realPrice,
  isTopSeller,
  onClick,
}) {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div
      className={`rounded-xl shadow-xl cursor-pointer ${
        isActive
          ? 'bg-gradient-to-r from-primary-200 to-primary-regular  text-white'
          : 'bg-white text-blueGray-700'
      } ${gridClass}`}
      onClick={handleClick}
    >
      <div className="w-full flex flex-row justify-between ">
        {hasPromotion && <img src={promotionImg} alt="" className="w-100-px" />}
        {isTopSeller && (
          <img src={topSellerImg} alt="" className="w-[60px] w-[60px] m-2" />
        )}
      </div>
      <div className="w-full flex flex-col items-center pb-8 px-4 gap-4 relative -mt-2">
        <h2 className="font-bold pb-1 border-b-[1px] border-gray-300 text-3xl">
          CHF {price}.-
        </h2>
        <span className="font-bold pb-1 border-b-[0.5px] border-gray-300 text-lg">
          {label}
        </span>
        {hasPromotion && (
          <>
            <span className="font-bold pb-1 border-b-[0.5px] border-gray-300 text-red-500 text-md">
              *Promotion bis {promotionDate}
            </span>
            <span className="font-bold pb-1 border-b-[0.5px] border-gray-300 text-lg">
              Statt {realPrice}.-
            </span>
          </>
        )}
      </div>
    </div>
  );
}

CompanyCreateInseratPricingCard.defaultProps = {
  gridClass: 'md:w-4/12 w-full',
  isActive: false,
  label: 'label',
  hasPromotion: true,
  promotionDate: '30.09.2023',
  price: 0,
  realPrice: 0,
  isTopSeller: false,
};

CompanyCreateInseratPricingCard.propTypes = {
  gridClass: PropTypes.string,
  isActive: PropTypes.bool,
  label: PropTypes.string,
  hasPromotion: PropTypes.bool,
  promotionDate: PropTypes.string,
  price: PropTypes.number,
  realPrice: PropTypes.number,
  isTopSeller: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CompanyCreateInseratPricingCard;
