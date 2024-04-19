import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Button from '../../../components/elements/buttons/Button';
import { useGetSoftSkillsQuery } from '../../../features/api/apiSlice';
import { ReactTags } from 'react-tag-autocomplete';
import { useForm, Controller } from 'react-hook-form';
import {
  useAddUserSoftSkillsMutation,
  useGetUserDetailsQuery,
} from '../../../features/auth/userApiSlice';
import { Link } from 'react-router-dom';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserProfileEditSoftSkills = () => {
  const { data: soft_skills } = useGetSoftSkillsQuery();
  const [addSoftSkills, { isLoading, isSuccess, isError, error }] =
    useAddUserSoftSkillsMutation();
  const { data: result, isLoading: userDataStillLoading } =
    useGetUserDetailsQuery();
  const user = result?.data;
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const transformedData = data?.soft_skills?.map(({ value }) => value);
    addSoftSkills({ soft_skills: transformedData });
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
            <div className="w-full flex flex-col text-center items-center md:p-0 p-4">
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
                Kompetenzen / Fähigkeiten bearbeiten
              </h2>
              {(isLoading || userDataStillLoading) && (
                <div className="w-full h-full text-center pt-8">
                  <div
                    className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                          border-[2px] border-dashed border-primary-500 border-t-transparent"
                  ></div>
                </div>
              )}
              {!isLoading && !userDataStillLoading && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-8/12 w-full p-4 flex flex-col items-center text-left gap-1 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
                >
                  <div className=" w-full flex justify-start">
                    <h5 className="font-bold text-lg text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-4 mb-4">
                      Kompetenzen / Fähigkeiten
                    </h5>
                  </div>
                  <div className="w-full flex flex-col justify-start text-sm">
                    <Controller
                      name={`soft_skills`}
                      rules={{
                        required: 'Bitte Kompetenz / Fähigkeiten hinzufügen',
                      }}
                      defaultValue={user?.soft_skills?.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      control={control}
                      render={({ field: { value, name } }) => {
                        return (
                          <ReactTags
                            labelText={false}
                            allowNew={true}
                            selected={value}
                            newOptionText='Keine ergebnisse. "%value%" hinzufügen ?'
                            suggestions={soft_skills || []}
                            onAdd={(newTag) => {
                              setValue(`${name}`, [...value, newTag]);
                              clearErrors(`${name}`);
                            }}
                            id="soft-skills"
                            onDelete={(tagIndex) => {
                              setValue(
                                `${name}`,
                                value.filter((_, i) => i !== tagIndex)
                              );
                            }}
                            allowResize={true}
                            placeholderText="+ Kompetenz / Fähigkeit hinzufügen"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.soft_skills && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.soft_skills.message}
                      </p>
                    )}
                    <em className="text-sm mt-2 text-blueGray-500">
                      Drücken Sie die Eingabetaste, um eine neue
                      Kompetenz/Fähigkeit hinzuzufügen.
                    </em>

                    <div className="w-full flex flex-row justify-end py-8 text-right text-blueGray-700">
                      <Button {...{ type: 'submit', children: 'Speichern' }} />
                    </div>
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

export default UserProfileEditSoftSkills;
