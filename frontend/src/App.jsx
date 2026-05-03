import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LandingPage from '../pages/LandingPage';
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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPage />}/>

        <Route element={<MainLayout />} id='root' loader={getUserLoader}>

          <Route element={<RegistrationLayout />}>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Route>

          <Route path='/dashboard' element={<UserDashboardLayout />}>
            <Route index element={<UserDashboardPage />}/>
            <Route path='/dashboard/score-predictor' element={<ScorePredictorPage />}/>

            <Route path='/dashboard/quiz-builder' element={<QuizMakingPage />}/>

            <Route path='test-series' element={<UserTestSeriesLayout />}>
              <Route index element={<UserTestSeriesPage />}/>
              <Route path='previous-tests' element={<AllPreviousTestsPage />}/> 
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
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App