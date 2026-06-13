import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { EnrollmentContext } from '../utils/EnrollmentContext';
import { useEffect, useState } from 'react';
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
import AllPreviousTestsPage from '../pages/userPages/TestSeries/AllPreviousTestsPage';
import UserDashboardPage from '../pages/userPages/UserDashboardPage';
import UserTestSeriesPage from '../pages/userPages/TestSeries/UserTestSeriesPage';
import UserTestSeriesLayout from '../layout/UserTestSeriesLayout';
import AllUpcomingTestsPage from '../pages/userPages/TestSeries/AllUpcomingTestsPage';
import UserCopyPage from '../pages/userPages/UserCopyPage';
import UserStartTestPage from '../pages/userPages/TestSeries/UserStartTestPage';
import ScorePredictorPage from '../pages/userPages/Analytics/ScorePredictorPage';
import UserAnalyticsPage from '../pages/userPages/Analytics/UserAnalyticsPage';
import QuizMakingPage from '../pages/userPages/QuizBuilder/QuizMakingPage';
import LandingPageLayout from '../layout/LandingPageLayout';
import ComingSoonPage from '../pages/ComingSoonPage'
import TestSeriesLandingPage from '../pages/LandingPages/TestSeriesLandingPage'
import PrivacyPolicyPage from '../pages/LandingPages/PrivacyPolicyPage';
import TermsAndConditionsPage from '../pages/LandingPages/TermsAndConditionsPage';
import CareersPage from '../pages/CareersPage';
import DetailedAnalyticsPage from '../pages/userPages/Analytics/DetailedAnalyticsPage';
import UserAnalyticsLayout from '../layout/UserAnalyticsLayout';
import ExamPage from '../pages/userPages/ExamPage';
import ReviewPreviousExamPage from '../pages/userPages/ReviewPreviousExamPage';
import AggregateCalculatorPage from '../pages/userPages/AggregateCalculatorPage';

const App = () => {
  const MDCATEMY_STATUS = import.meta.env.VITE_MDCATEMY_STATUS;
  const [enrollmentCount, setEnrollmentCount] = useState(85);
  
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

  useEffect(() => {
    const closeHamburger = (e) => {
      const hamburger = e.target.closest(".hamburger");
      
      if(hamburger) return;

      document.querySelector(".hamburger").removeAttribute("open");
    }

    document.body.addEventListener("click", closeHamburger);

    return () => document.body.removeEventListener("click", closeHamburger);
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
          <Route path='/test-series-enrollment' element={<ComingSoonPage />}/>
          <Route path='/mdcat-aggregate-calculator' element={<AggregateCalculatorPage />}/>
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
              <Route path='all-upcoming-tests' element={<AllUpcomingTestsPage />}/>
              <Route path='start-test/:testID' element={<UserStartTestPage />}/>
            </Route>

            <Route path='my-copy' element={<UserCopyPage />}/>
            
            <Route path='analytics' element={<UserAnalyticsLayout />}>
              <Route index element={<UserAnalyticsPage />}/>
              <Route path=':subject' element={<DetailedAnalyticsPage isSubjectOrChapter={true}/>}/>
              <Route path=':subject/:chapter' element={<DetailedAnalyticsPage isSubjectOrChapter={false} />}/>
            </Route>

            <Route path=':examType/previous-exam/:examID' element={<ReviewPreviousExamPage />}/>
            <Route path=':examType/exam/:examID' element={<ExamPage />}/>
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

  return (
    <EnrollmentContext.Provider value={{enrollmentCount, setEnrollmentCount}}>
      <RouterProvider router={router} />
    </EnrollmentContext.Provider>
  )
}

export default App