import React, { useState, useEffect } from 'react'; //eslint-disable-line
import CompanyCreateInseratPricingCard from '../../elements/cards/CompanyCreateInseratPricingCard';
import Checkbox from '../../elements/input/Checkbox';
import { useGetPricesQuery } from '../../../features/auth/companyApiSlice';
import { useForm, Controller } from 'react-hook-form';

export default function Optionen({ form, setForm }) {
  const { data, isLoading } = useGetPricesQuery();
  const [inseratOptions, setInseratOptions] = useState([]);
  const [realTimePriceCalcation, setRealTimePriceCalculation] = useState({
    total: null,
    tax: null,
  });

  useEffect(() => {
    if (data) {
      const options =
        form?.selectedOptions?.length > 0
          ? data?.map((item) => {
              const isSelected = form?.selectedOptions?.find(
                (el) => (el.price_id || el.id) === item.id
              );
              return {
                ...item,
                selected: isSelected ? true : false,
              };
            })
          : data;
      setInseratOptions(options);
    }
  }, [data]);

  const { control, setValue, handleSubmit } = useForm({});

  useEffect(() => {
    const totalSelectedPrice = inseratOptions
      ?.filter((el) => el.selected)
      .reduce((accumulator, { value }) => accumulator + value, 0);
    const priceTax = totalSelectedPrice * 0.077;
    setRealTimePriceCalculation({
      total: (
        Math.round((totalSelectedPrice - priceTax) / 0.05) * 0.05
      ).toFixed(2),
      tax: (Math.round(priceTax / 0.05) * 0.05).toFixed(2),
    });
  }, [inseratOptions]);

  const handleInseratMainOptionChange = (item) => {
    const mainOptions = data.slice(0, 3).map((el) => {
      const isSelected = el.id === item.id;
      return {
        ...el,
        selected: isSelected,
      };
    });
    const furtherOption = inseratOptions.slice(3);
    setInseratOptions([...mainOptions, ...furtherOption]);
  };

  const handleOptionChange = (item, index) => {
    const prevArray = [...inseratOptions];
    const newValue = { ...item, selected: !item?.selected };
    prevArray[index + 3] = newValue;
    setValue(`price[${item?.id - 1}]`, newValue);
    setInseratOptions(prevArray);
  };

  const onSubmit = () => {
    const selected = inseratOptions.filter((el) => el.selected);
    const selectedIdArray = selected.map((el) => el.id);
    const transformedData = {
      selectedOptions: selected,
      prices: selectedIdArray,
      totalPrice: realTimePriceCalcation.total,
      taxPrice: realTimePriceCalcation.tax,
    };
    setForm({
      ...form,
      ...transformedData,
      step_wizard: form.step_wizard + 1,
    });
  };

  return (
    <>
      {isLoading && (
        <div className="w-full h-full text-center pt-8">
          <div
            className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                  border-[2px] border-dashed border-primary-500 border-t-transparent"
          ></div>
        </div>
      )}
      {!isLoading && inseratOptions && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:w-10/12 w-full flex md:flex-row flex-col justify-center mx-auto gap-4">
            {inseratOptions?.slice(0, 3)?.map((item, index) => (
              <Controller
                key={item.label + index}
                name={`price[${item?.id - 1}]`}
                control={control}
                defaultValue={item}
                render={({ field: { name } }) => {
                  return (
                    <CompanyCreateInseratPricingCard
                      onClick={() => handleInseratMainOptionChange(item)}
                      isActive={item.selected}
                      isTopSeller={item.id === 2}
                      label={item.label}
                      price={item.value}
                      realPrice={249 + parseInt(item.value)}
                      hasPromotion={true}
                      name={name}
                    />
                  );
                }}
              />
            ))}
          </div>
          <div className="md:w-10/12 w-full flex flex-row justify-between mx-auto gap-4 mt-10">
            <table className="w-full text-md text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Optionen
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Preis <small>(CHF)</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {inseratOptions?.slice(3)?.map((item, index) => (
                  <tr
                    key={item.label + index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-semibold"
                  >
                    <td className="px-6 py-4 text-left">
                      <Controller
                        name={`price[${item?.id - 1}]`}
                        control={control}
                        defaultValue={item}
                        render={({ field: { value, name } }) => {
                          return (
                            <Checkbox
                              onChange={() => handleOptionChange(item, index)}
                              checked={value?.selected}
                              className="text-left"
                              label={item?.label}
                              name={name}
                            />
                          );
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      CHF {item?.value?.toFixed(2)}.-
                    </td>
                  </tr>
                ))}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-bold">
                  <td className="px-6 py-4 text-right">MwSt.</td>
                  <td className="px-6 py-4 text-right">
                    CHF {realTimePriceCalcation?.tax}.-
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-bold text-xl">
                  <td className="px-6 py-4 text-right">
                    Total exkl. 7.7% MwSt.
                  </td>
                  <td className="px-6 py-4 text-right">
                    CHF {realTimePriceCalcation?.total}.-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() =>
                setForm({ ...form, step_wizard: form?.step_wizard - 1 })
              }
            >
              <i className="fa-solid fa-arrow-left"></i> Zurück
            </button>
            <button
              className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Weiter <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
