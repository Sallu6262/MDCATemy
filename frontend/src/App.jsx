import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App