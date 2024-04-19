import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Button from '../../../components/elements/buttons/Button';
import Select from 'react-tailwindcss-select';
import { selectPickerClassNames } from '../../../components/elements/input/select/utilities';
import {
  useGetCategoriesQuery,
  useGetContractTypesQuery,
} from '../../../features/api/apiSlice';
import MultiRangeSlider from 'multi-range-slider-react';
import Checkbox from '../../../components/elements/input/Checkbox';
import {
  useUpdateUserProfileMutation,
  useGetUserDetailsQuery,
} from '../../../features/auth/userApiSlice';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserProfileEditJobPreference = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: employementType } = useGetContractTypesQuery();
  const { data: result, isLoading: userDataStillLoading } =
    useGetUserDetailsQuery();
  const user = result?.data;
  const [updateUserProfile, { isLoading, isSuccess, isError }] =
    useUpdateUserProfileMutation();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const generateWorktimeAndPositionValue = (first, second) => {
    let value = 0;
    if (first && !second) {
      value = 1;
    }
    if (!first && second) {
      value = 2;
    }
    if (first && second) {
      value = 3;
    }
    return value;
  };

  const onSubmit = (data) => {
    const transformedData = {
      job_sub_categories: data?.job_sub_categories?.map(({ value }) => value),
      contract_types: data?.contract_types?.map(({ value }) => value),
      workload_from: data?.pensum?.workload_from,
      workload_to: data?.pensum?.workload_to,
      prefered_distance: data?.prefered_distance,
      work_time: generateWorktimeAndPositionValue(
        data?.work_time_regular,
        data?.work_time_non_regular
      ),
      position: generateWorktimeAndPositionValue(
        data?.position_with_lead,
        data?.position_without_lead
      ),
    };
    updateUserProfile(transformedData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/user/profile');
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Page>
        <PageContent>
          <ToastMessage isSuccess={isSuccess} isError={isError} />
          <div className="w-full pt-10 pb-10 bg-radial-gradient flex-1">
            <div className="w-full flex flex-col text-center items-center text-blueGray-700 md:p-0 p-4">
              <div
                className={`md:w-8/12 w-full md:p-0 p-4 flex flex-row mx-auto`}
              >
                <Link
                  to={'/user/profile'}
                  className="text-primary-500 font-semibold"
                >
                  <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
                </Link>
              </div>
              <h2 className="text-3xl font-bold text-blueGray-800 mb-10">
                Meine Job Präfeerenzen{' '}
              </h2>

              {(isLoading || userDataStillLoading) && (
                <div className="w-full py-10 flex flex-col">
                  <div className="mx-auto my-auto flex flex-col items-center container gap-4">
                    <div
                      className="w-12 h-12 rounded-full animate-spin
                              border-[2px] border-dashed border-primary-500 border-t-transparent"
                    ></div>
                    <span className="font-semibold text-sm">
                      Daten werden geladen...
                    </span>
                  </div>
                </div>
              )}
              {!isLoading && !userDataStillLoading && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-8/12 w-full md:px-10 p-4 flex flex-col items-center text-left gap-1 pt-10 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
                >
                  <div className="w-full flex flex-col gap-1 text-left mt-1 mb-2">
                    <label className="text-base font-semibold">
                      Job Kategorie* <small>(Mehrfachauswahl möglich)</small>:
                    </label>
                    <Controller
                      name={`job_sub_categories`}
                      rules={{ required: 'Bitte Job Kategorie wählen' }}
                      defaultValue={
                        user?.job_sub_categories?.length
                          ? user?.job_sub_categories?.map(({ id, name }) => ({
                              value: id,
                              label: name,
                            }))
                          : null
                      }
                      control={control}
                      render={({
                        field: {
                          value = user?.job_sub_categories?.map(
                            ({ id, name }) => ({ value: id, label: name })
                          ),
                          name,
                          onChange,
                          onBlur,
                        },
                      }) => {
                        return (
                          <Select
                            isMultiple
                            isClearable={true}
                            options={categories}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            classNames={selectPickerClassNames}
                            placeholder={'Job Kategorie'}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.job_sub_categories && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.job_sub_categories.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Anstellungsart* <small>(Mehrfachauswahl möglich)</small>:
                    </label>
                    <Controller
                      name={`contract_types`}
                      rules={{ required: 'Bitte Anstellungsart wählen' }}
                      defaultValue={
                        user?.contract_types?.length
                          ? user?.contract_types?.map(({ id, name }) => ({
                              value: id,
                              label: name,
                            }))
                          : null
                      }
                      control={control}
                      render={({
                        field: { value, name, onChange, onBlur },
                      }) => {
                        return (
                          <Select
                            isMultiple
                            isClearable={true}
                            options={employementType}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            classNames={selectPickerClassNames}
                            placeholder={'Anstellungsart'}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.contract_types && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.contract_types.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 pt-3">
                    <label className="text-base font-semibold">Pensum :</label>

                    <Controller
                      name={`pensum`}
                      control={control}
                      defaultValue={{
                        workload_from: user?.workload_from,
                        workload_to: user?.workload_to,
                      }}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <>
                            <div className="flex justify-between w-full">
                              <span className="justify-self-start text-sm">
                                {value.workload_from} %
                              </span>
                              <span></span>
                              <span className="justify-self-end text-sm">
                                {value.workload_to} %
                              </span>
                            </div>
                            <MultiRangeSlider
                              min={0}
                              max={100}
                              step={10}
                              stepOnly={true}
                              minCaption={false}
                              label={false}
                              ruler={false}
                              baseClassName=""
                              style={{
                                border: 'none',
                                boxShadow: 'none',
                                padding: '15px 10px 0 10px',
                              }}
                              barLeftColor="#e5e7eb"
                              barRightColor="linear-gradient(60deg, #26c6da, #0097a7)"
                              barInnerColor="#0097a7"
                              thumbLeftColor="#0097a7"
                              thumbRightColor="#0097a7"
                              minValue={value.workload_from}
                              maxValue={value.workload_to}
                              onInput={(e) => {
                                setValue('pensum', {
                                  workload_from: e.minValue,
                                  workload_to: e.maxValue,
                                });
                              }}
                              onChange={(e) => {
                                setValue('pensum', {
                                  workload_from: e.minValue,
                                  workload_to: e.maxValue,
                                });
                              }}
                            />
                          </>
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 pt-3 text-blueGray-700">
                    <label className="text-base font-semibold">
                      Arbeitsdistanz :
                    </label>
                    <div className="flex flex-col justify-center py-1">
                      <Controller
                        name={`prefered_distance`}
                        control={control}
                        defaultValue={user?.prefered_distance}
                        render={({ field: { value } }) => {
                          return (
                            <>
                              <div className="flex justify-between w-full">
                                <span className="justify-self-start text-sm">
                                  {value} km
                                </span>
                                <span></span>
                                <span className="justify-self-end text-sm">
                                  100 km
                                </span>
                              </div>
                              <input
                                type="range"
                                value={value}
                                step={5}
                                onChange={(e) =>
                                  setValue('prefered_distance', e.target.value)
                                }
                                className="w-full h-0.5 bg-blueGray-500 rounded outline-none slider-thumb mt-2 mb-2 accent-primary-500"
                              />
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className=" w-full flex flex-col gap-2 mt-2 items-left">
                    <label className="text-base font-semibold">
                      Arbeitszeiten :
                    </label>
                    <Controller
                      name={`work_time_regular`}
                      control={control}
                      defaultValue={
                        user?.work_time === '1' || user?.work_time === '3'
                          ? true
                          : false
                      }
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            checked={value}
                            className="text-left"
                            {...{ label: '  Regelmässig' }}
                          />
                        );
                      }}
                    />
                    <Controller
                      name={`work_time_non_regular`}
                      control={control}
                      defaultValue={
                        user?.work_time === '2' || user?.work_time === '3'
                          ? true
                          : false
                      }
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            checked={value}
                            className="text-left"
                            {...{ label: '  Unregelmässig' }}
                          />
                        );
                      }}
                    />

                    <h3 className="text-base font-semibold mt-2">Position:</h3>
                    <Controller
                      name={`position_with_lead`}
                      control={control}
                      defaultValue={
                        user?.position === '1' || user?.position === '3'
                          ? true
                          : false
                      }
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            checked={value}
                            className="text-left"
                            {...{ label: '  mit Führungsaufgaben' }}
                          />
                        );
                      }}
                    />
                    <Controller
                      name={`position_without_lead`}
                      control={control}
                      defaultValue={
                        user?.position === '2' || user?.position === '3'
                          ? true
                          : false
                      }
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            checked={value}
                            className="text-left"
                            {...{ label: '  ohne Führungsaufgaben' }}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-row justify-end py-8 text-right">
                    <Button {...{ type: 'submit', children: 'Speichern' }} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default UserProfileEditJobPreference;
