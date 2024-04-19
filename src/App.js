import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Testpage from './pages/Testpage';
import LoginRegister from './pages/LoginRegister';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Inserien from './pages/Inserien';
import Tipps from './pages/Tipps';
import JobsFilterPage from './pages/jobs/job-filter-page/JobFilterPage';
import JobDetails from './pages/jobs/job-details-page/JobDetailsPage';
import PublicCompanyProfile from './pages/company/PublicCompanyProfile';
import SendPasswordResetLink from './pages/auth/password/SendPasswordResetLink';
import UserProfilePage from './pages/auth/user-profile/UserProfilePage';
import UserProfileEditPage from './pages/auth/user-profile/UserProfileEditPage';
import UserProfileEditSoftSkills from './pages/auth/user-profile/UserProfileEditSoftSkills';
import UserProfileEditExperience from './pages/auth/user-profile/UserProfileEditExperience';
import UserProfileEditEducation from './pages/auth/user-profile/UserProfileEditEducation';
import UserProfileEditLanguages from './pages/auth/user-profile/UserProfileEditLanguages';
import UserProfileEditJobPreference from './pages/auth/user-profile/UserProfileEditJobPreference';
import CompanyProfilePage from './pages/auth/company-profile/CompanyProfilePage';
import CompanyProfileEditPage from './pages/auth/company-profile/CompanyProfileEditPage';
import CompanyProfileJobPage from './pages/auth/company-profile/CompanyProfileJobPage';
import CreateInseratPage from './pages/auth/company-profile/CreateInseratPage';
import UserProfileResume from './pages/auth/user-profile/UserProfileResume';
import UserPrivateRoutes from './utils/UserPrivateRoutes';
import CompanyPrivateRoutes from './utils/CompanyPrivateRoutes';
import PageNotFound from './pages/404/PageNotFound';
import ResetPasswordPage from './pages/auth/password/ResetPasswordPage';
import { AgbPage } from './pages/Agb';
import { ImpressumPage } from './pages/Impressum';
import { VerifyAccount } from './pages/auth/VerifyAccount';

// Sets the Tailwind theme to light
localStorage.theme = 'light';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Testpage />} path="/test" />
          <Route element={<Homepage />} path="/" />
          <Route element={<LoginRegister />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<AboutUs />} path="/about-us" />
          <Route element={<Inserien />} path="/inserien" />
          <Route element={<Tipps />} path="/tipps" />
          <Route element={<JobsFilterPage />} path="/jobs" />
          <Route element={<JobDetails />} path="/job/:slug" />
          <Route element={<PublicCompanyProfile />} path="/company/:slug" />
          <Route element={<SendPasswordResetLink />} path="/forgot-password" />
          <Route element={<ResetPasswordPage />} path="/reset-password" />
          <Route element={<AgbPage />} path="/agb" />
          <Route element={<ImpressumPage />} path="/impressum" />
          <Route element={<VerifyAccount />} path="/verify-account/:slug" />

          {/* Not found Route */}
          <Route path="*" element={<PageNotFound />} />

          {/* Routes that need to be private */}

          <Route
            element={<CompanyProfileJobPage />}
            path="/company/job-details/:slug"
          />

          {/* USER PROFILE PRIVATE ROUTES */}
          <Route element={<UserPrivateRoutes />}>
            <Route element={<UserProfilePage />} path="/user/profile" />
            <Route
              element={<UserProfileEditPage />}
              path="/user/profile/edit/personal-info"
            />
            <Route
              element={<UserProfileEditJobPreference />}
              path="/user/profile/edit/preferences"
            />
            <Route
              element={<UserProfileEditExperience />}
              path="/user/profile/edit/work-experience"
            />
            <Route
              element={<UserProfileEditSoftSkills />}
              path="/user/profile/edit/soft-skills"
            />
            <Route
              element={<UserProfileEditEducation />}
              path="/user/profile/edit/education"
            />
            <Route
              element={<UserProfileEditLanguages />}
              path="/user/profile/edit/languages"
            />
            <Route
              element={<UserProfileResume />}
              path="/user/profile/resume"
            />
          </Route>
          {/* END OFQ USER PROFILE PRIVATE ROUTES */}

          <Route element={<CompanyPrivateRoutes />}>
            {/* COMPANY PRIVATE ROUTES */}
            <Route element={<CompanyProfilePage />} path="/company/profile" />
            <Route
              element={<CompanyProfileEditPage />}
              path="/company/profile/edit/company-info"
            />
            <Route
              element={<CreateInseratPage />}
              path="/company/job/:action"
            />

            {/* END OF USER PROFILE PRIVATE ROUTES */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
