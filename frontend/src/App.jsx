import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDefaultPage from '../pages/AdminDefaultPage'
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import AdminPaymentsPage from '../pages/AdminPaymentsPage';
import AdminUploadMcqsPage from '../pages/AdminUploadMcqsPage';
import AdminCustomTestMakerPage from '../pages/AdminCustomTestMakerPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>

          <Route path='/admin' element={<AdminDashboardLayout />}>
            <Route index element={<AdminDefaultPage />}/>
            <Route path='/admin/payments' element={<AdminPaymentsPage />}/>
            <Route path='/admin/upload-mcqs' element={<AdminUploadMcqsPage />}/>
            <Route path='/admin/custom-test-maker' element={<AdminCustomTestMakerPage />}/>
          </Route>

          <Route path='*' element={<NotFoundPage />}/>
        </Route>

        <Route path='/' element={<LandingPage />}/>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App