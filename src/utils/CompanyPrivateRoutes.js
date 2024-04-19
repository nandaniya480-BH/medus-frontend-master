import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFound from '../pages/404/PageNotFound';

const CompanyPrivateRoutes = () => {
  const navigate = useNavigate();
  const { userToken, role, loading, success } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!loading && !success && !userToken) {
      navigate('/login');
    }
  }, [navigate, userToken, loading, success]);

  // Render a placeholder while checking the user token
  if (userToken === null || loading) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="mx-auto my-auto flex flex-col items-center container gap-4">
          <div
            className="w-12 h-12 rounded-full animate-spin
                      border-[2px] border-dashed border-primary-500 border-t-transparent"
          ></div>
          <span className="font-semibold text-sm">Seite wird geladen...</span>
        </div>
      </div>
    );
  }
  if (userToken && role !== 'employeradmin' && role !== 'employer') {
    return <PageNotFound />;
  }

  return <Outlet />;
};

export default CompanyPrivateRoutes;
