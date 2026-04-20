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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />} id='root' loader={getUserLoader}>

          <Route element={<AdminDashboardLayout />}>
            <Route path='/admin' element={<AdminDefaultPage />}/>
            <Route path='/admin/payments' element={<AdminPaymentsPage />}/>
            <Route path='/admin/upload-mcqs' element={<AdminUploadMcqsPage />}/>
            <Route path='/admin/custom-test-maker' element={<AdminCustomTestMakerPage />}/>
          </Route>

          <Route element={<RegistrationLayout />}>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Route>

          <Route path='/payment-error' element={<PaymentErrorPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>

        <Route path='/' element={<LandingPage />}/>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App