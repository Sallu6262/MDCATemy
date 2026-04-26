import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDefaultPage from '../pages/AdminDefaultPage'
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import AdminPaymentsPage from '../pages/AdminPaymentsPage';
import AdminUploadMcqsPage from '../pages/AdminUploadMcqsPage';
import AdminCustomTestMakerPage from '../pages/AdminCustomTestMakerPage';
import RegistrationLayout from '../layout/RegistrationLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import getUserLoader from '../utils/getUserLoader';
import PaymentErrorPage from '../pages/PaymentErrorPage';
import UserDashboardLayout from '../layout/UserDashboardLayout';
import UserPreviousTestsPage from '../pages/UserPreviousTestsPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import UserTestSeriesPage from '../pages/UserTestSeriesPage';
import UserTestSeriesLayout from '../layout/UserTestSeriesLayout';
import { AllUpcomingTestsPage } from '../pages/AllUpcomingTestsPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />} id='root' loader={getUserLoader}>

          <Route element={<RegistrationLayout />}>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Route>

          <Route element={<UserDashboardLayout />}>
            <Route path='/dashboard' element={<UserDashboardPage />}/>

            <Route path='/test-series' element={<UserTestSeriesLayout />}>
              <Route index element={<UserTestSeriesPage />}/>
              <Route path='previous-tests' element={<UserPreviousTestsPage />}/> 
              <Route path='all-upcoming-tests' element={<AllUpcomingTestsPage />}/>
            </Route>
            
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

        <Route path='/' element={<LandingPage />}/>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App