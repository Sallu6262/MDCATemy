import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route path='/admin' element={<AdminDashboardPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>

        <Route path='/' element={<LandingPage />}/>
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App