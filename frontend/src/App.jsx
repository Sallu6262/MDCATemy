import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import MainLandingPage from '../pages/LandingPages/MainLandingPage';
import BatchEnrollmentLandingPage from '../pages/LandingPages/BatchEnrollmentLandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDefaultPage from '../pages/adminPages/AdminDefaultPage'
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import AdminPaymentsPage from '../pages/adminPages/AdminPaymentsPage';
import AdminUploadMcqsPage from '../pages/adminPages/AdminUploadMcqsPage';
import AdminCustomTestMakerPage from '../pages/adminPages/AdminCustomTestMakerPage';
import RegistrationLayout from '../layout/RegistrationLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import getUserLoader from '../utils/getUserLoader';
import PaymentErrorPage from '../pages/PaymentErrorPage';
import UserDashboardLayout from '../layout/UserDashboardLayout';
import AllPreviousTestsPage from '../pages/userPages/AllPreviousTestsPage';
import UserDashboardPage from '../pages/userPages/UserDashboardPage';
import UserTestSeriesPage from '../pages/userPages/UserTestSeriesPage';
import UserTestSeriesLayout from '../layout/UserTestSeriesLayout';
import AllUpcomingTestsPage from '../pages/userPages/AllUpcomingTestsPage';
import UserCopyPage from '../pages/userPages/UserCopyPage';
import UserStartTestPage from '../pages/userPages/UserStartTestPage';
import ScorePredictorPage from '../pages/userPages/ScorePredictorPage';
import UserAnalyticsPage from '../pages/userPages/UserAnalyticsPage';
import QuizMakingPage from '../pages/userPages/QuizBuilder/QuizMakingPage';
import ReviewPreviousTextMcqsPage from '../pages/userPages/ReviewPreviousTextMcqsPage';
import LandingPageLayout from '../layout/LandingPageLayout';
import ComingSoonPage from '../pages/ComingSoonPage'

const App = () => {
  const MDCATEMY_STATUS = import.meta.env.VITE_MDCATEMY_STATUS;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPageLayout />}>
          <Route index element={<MainLandingPage />}/>
          <Route path='/batch-enrollment' element={<BatchEnrollmentLandingPage />}/>
        </Route>

        <Route element={<MainLayout />} id='root' loader={getUserLoader}>

          <Route element={<RegistrationLayout />}>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Route>

          <Route path='/dashboard' element={MDCATEMY_STATUS === 'coming-soon' ? <ComingSoonPage /> : <UserDashboardLayout />}>
            <Route index element={<UserDashboardPage />}/>
            <Route path='score-predictor' element={<ScorePredictorPage />}/>

            <Route path='quiz-builder' element={<QuizMakingPage />}/>

            <Route path='test-series' element={<UserTestSeriesLayout />}>
              <Route index element={<UserTestSeriesPage />}/>
              <Route path='previous-tests' element={<AllPreviousTestsPage />}/> 
              <Route path='previous-tests/:testID' element={<ReviewPreviousTextMcqsPage />}/>
              <Route path='all-upcoming-tests' element={<AllUpcomingTestsPage />}/>
              <Route path='start-test/:testID' element={<UserStartTestPage />}/>
            </Route>

            <Route path='my-copy' element={<UserCopyPage />}/>
            <Route path='analytics' element={<UserAnalyticsPage />}/>
          </Route>

          <Route path='/admin' element={<AdminDashboardLayout />}>
            <Route index element={<AdminDefaultPage />}/>
            <Route path='payments' element={<AdminPaymentsPage />}/>
            <Route path='upload-mcqs' element={<AdminUploadMcqsPage />}/>
            <Route path='custom-test-maker' element={<AdminCustomTestMakerPage />}/>
          </Route>

          <Route path='/payment-status' element={<PaymentErrorPage />}/>
        </Route>

        <Route path='*' element={<NotFoundPage />}/>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App