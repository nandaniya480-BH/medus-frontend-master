import React, { useState } from 'react';
import Checkbox from '../../elements/input/Checkbox';
// import RadioButton from "../../elements/input/RadioButton";
import Button from '../../elements/buttons/Button';
import {
  useGetCategoriesQuery,
  useGetKantonesQuery,
} from '../../../features/api/apiSlice'; //eslint-disable-line
import { Link } from 'react-router-dom';

function TabsWithCategoryAndRegionSearch() {
  const [openTab, setOpenTab] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showMoreRegions, setShowMoreRegions] = useState(false);
  const [regions, setRegions] = useState([]);
  const { data: categories } = useGetCategoriesQuery();
  const { data: kantones } = useGetKantonesQuery();

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const toggleMoreRegions = () => {
    setShowMoreRegions((prev) => !prev);
  };

  const isMobile = window.innerWidth < 768;
  const regionBtnSearch = {
    children: 'Suchen',
    extraStyle: 'bg-gradient-to-r from-primary-200 mt-4 to-primary-regular',
  };
  const btnProps = {
    outline: true,
    extraStyle:
      'border-none shadow-none underline active:shadow-none hover:shadow-none focus:shadow-none',
    fullWidth: true,
  };
  const categoryLinkClassName =
    'bg-white text-primary-500 hover:bg-gradient-to-r hover:from-primary-200 hover:to-primary-regular hover:text-white border-none inline-block font-bold last:mr-0 mr-2 w-full p-2 rounded-lg';

  return (
    <>
      <div className="container bg-white md:rounded-lg md:shadow-lg md:-mt-24 lg:-mt-32 -mt-16 mx-auto p-8 mb-32">
        <ul className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 text-center text-gray-500 rounded-lg p-1">
          <li key="category-tab">
            <a
              className={
                openTab === 1
                  ? 'flex justify-center py-3 bg-gradient-to-r from-primary-200 to-primary-regular rounded-lg shadow text-white '
                  : 'flex justify-center py-3'
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#category"
              role="tablist"
            >
              <i className="fa-solid fa-list mt-1 mr-2"></i>
              Kategorien
            </a>
          </li>
          <li key="region-tab">
            <a
              className={
                openTab === 2
                  ? 'flex justify-center py-3 bg-gradient-to-r from-primary-200 to-primary-regular rounded-lg shadow text-white '
                  : 'flex justify-center py-3'
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#region"
              role="tablist"
            >
              <i className="fa-solid fa-location-dot mt-1 mr-2"></i>
              Region
            </a>
          </li>
        </ul>

        <div className="grid grid-flow-col text-left text-gray-500 bg-white mt-8 rounded-lg p-1">
          <div
            key="category"
            className={openTab === 1 ? 'block' : 'hidden'}
            id="category"
          >
            <div className="flex flex-col items-left">
              <ul
                key="category-search"
                className="list-none grid grid-cols-1 md:grid-cols-4"
              >
                {!categories && (
                  <>
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                    <li className="my-2 h-2 bg-gray-300 animate-pulse rounded-lg w-10/12" />
                  </>
                )}

                {(!isMobile || showMore) &&
                  categories?.map((item) => (
                    <li key={item.label} className="px-1">
                      <Link
                        to={'/jobs'}
                        className={categoryLinkClassName}
                        role="category-link"
                        state={{
                          job_categories: item?.value,
                          filters: item?.label,
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                {(isMobile || showMore) &&
                  categories?.slice(0, 5).map((item) => (
                    <li key={item.label} className="px-1">
                      <Link
                        to={'/jobs'}
                        className={categoryLinkClassName}
                        role="category-link"
                        state={{
                          job_categories: item?.value,
                          filters: item?.label,
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                {isMobile && (
                  <li key="show-more-categories">
                    <Button onClick={toggleShowMore} {...btnProps}>
                      {showMore ? 'Weniger anzeigen ...' : 'Mehr anzeigen ...'}
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div
            key="region"
            className={openTab === 2 ? 'block' : 'hidden'}
            id="region"
          >
            <ul
              key="category-search"
              className="list-none grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              {(!isMobile || showMoreRegions) &&
                kantones?.map((item) => (
                  <li key={item.label}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRegions([...regions, item]);
                        } else {
                          setRegions(
                            regions.filter((reg) => reg.value !== item.value)
                          );
                        }
                      }}
                      value={regions}
                      {...item}
                    />
                  </li>
                ))}
              {(isMobile || showMoreRegions) &&
                kantones?.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRegions([...regions, item]);
                        } else {
                          setRegions(
                            regions.filter((reg) => reg.value !== item.value)
                          );
                        }
                      }}
                      value={regions}
                      {...item}
                    />
                  </li>
                ))}
              {isMobile && (
                <li key="show-more-regions">
                  <Button onClick={toggleMoreRegions} {...btnProps}>
                    {showMore ? 'Weniger anzeigen ...' : 'Mehr anzeigen ...'}
                  </Button>
                </li>
              )}
            </ul>
            <div className="w-full text-right">
              <Link
                to={'/jobs'}
                state={{
                  job_regions: regions?.map((item) => item?.value).join(', '),
                  filters: regions?.map((item) => item?.label).join(', '),
                }}
                className="justify-center py-2 px-4 bg-gradient-to-r from-primary-200 to-primary-regular rounded-full font-bold shadow text-white"
              >
                Suchen <i className="fas fa-search" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabsWithCategoryAndRegionSearch;
