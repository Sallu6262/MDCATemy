import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import {EnrollmentContext} from '../utils/EnrollmentContext';
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
import ReviewPreviousTestMcqsPage from '../pages/userPages/ReviewPreviousTestMcqsPage';
import LandingPageLayout from '../layout/LandingPageLayout';
import ComingSoonPage from '../pages/ComingSoonPage'
import ReviewPreviousQuizMcqsPage from '../pages/userPages/ReviewPreviousQuizMcqsPage';
import PrivacyPolicyPage from '../pages/LandingPages/PrivacyPolicyPage';
import TermsAndConditionsPage from '../pages/LandingPages/TermsAndConditionsPage';
import CareersPage from '../pages/LandingPages/CareersPage';
import DetailedAnalyticsPage from '../pages/userPages/DetailedAnalyticsPage';
import UserAnalyticsLayout from '../layout/UserAnalyticsLayout';
import { useEffect, useState } from 'react';

const App = () => {
  const MDCATEMY_STATUS = import.meta.env.VITE_MDCATEMY_STATUS;
  const [enrollmentCount, setEnrollmentCount] = useState(100);
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
        const fetchEnrollmentCount = async () => {
            const res = await fetch(`${API_URL}/system/remaining-seats`);

            if(res.ok){
                const data = await res.json();

                if(data.status === 'success'){
                    const seats = data.data.seats;
                    setEnrollmentCount(seats);
                }
            }
        }

        fetchEnrollmentCount();
    }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPageLayout enrollmentCount={enrollmentCount}/>}>
          <Route index element={<MainLandingPage />}/>
          <Route path='/batch-enrollment' element={<BatchEnrollmentLandingPage />}/>
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />}/>
          <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />}/>
          <Route path='/careers' element={<CareersPage />}/>
        </Route>

        <Route element={<MainLayout />} id='root' loader={getUserLoader}>

          <Route element={<RegistrationLayout/>}>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Route>

          <Route path='/dashboard' element={MDCATEMY_STATUS === 'coming-soon' ? <ComingSoonPage /> : <UserDashboardLayout />}>
            <Route index element={<UserDashboardPage />}/>
            <Route path='score-predictor' element={<ScorePredictorPage />}/>

            <Route path='quiz-builder' element={<QuizMakingPage />}/>
            <Route path='quiz-builder/previous-quiz/:quizID' element={<ReviewPreviousQuizMcqsPage />}/>

            <Route path='test-series' element={<UserTestSeriesLayout />}>
              <Route index element={<UserTestSeriesPage />}/>
              <Route path='previous-tests' element={<AllPreviousTestsPage />}/> 
              <Route path='previous-tests/:testID' element={<ReviewPreviousTestMcqsPage />}/>
              <Route path='all-upcoming-tests' element={<AllUpcomingTestsPage />}/>
              <Route path='start-test/:testID' element={<UserStartTestPage />}/>
            </Route>

            <Route path='my-copy' element={<UserCopyPage />}/>
            
            <Route path='analytics' element={<UserAnalyticsLayout />}>
              <Route index element={<UserAnalyticsPage />}/>
              <Route path=':subject' element={<DetailedAnalyticsPage isSubjectOrChapter={true}/>}/>
              <Route path=':subject/:chapter' element={<DetailedAnalyticsPage isSubjectOrChapter={false} />}/>
            </Route>
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

  return (
    <EnrollmentContext.Provider value={{enrollmentCount, setEnrollmentCount}}>
      <RouterProvider router={router} />
    </EnrollmentContext.Provider>
  )
}

export default App