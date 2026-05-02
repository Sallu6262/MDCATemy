import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SubjectsPage from "./pages/SubjectsPage.jsx";
import ConfigurePage from "./pages/ConfigurePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { QuizProvider } from "./utils/QuizContext.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/",          element: <HomePage /> },
            { path: "/subjects",  element: <SubjectsPage /> },
            { path: "/configure", element: <ConfigurePage /> },
            { path: "/quiz",      element: <QuizPage /> },
            { path: "/result",    element: <ResultPage /> },
        ],
    },
]);

const App = () => (
    <QuizProvider>
        <RouterProvider router={router} />
    </QuizProvider>
);

export default App;
