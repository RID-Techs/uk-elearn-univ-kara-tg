
import {Outlet, RouterProvider, ScrollRestoration, createBrowserRouter} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./Errors/Error";
import { ErrorPage } from "./Errors/ErrorPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense, useEffect } from "react";
import { PwaUpdater } from "./Components/PwaUpdater";

function RootLayout() {
  return (
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={"Loading..."}>
              <Outlet />
            </Suspense>
            <ScrollRestoration />
          </ErrorBoundary>
  );
}
function App() {
  useEffect(() => {
    const getLogin = localStorage.getItem("isLoggedIn");
    if(!getLogin) return;
    const getLoginState = getLogin === "true";
    const resetPWA = async () => {
  // Delete Cache Storage
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => caches.delete(name))
  );

  // Unregister service workers
  const registrations =
    await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations.map((registration) =>
      registration.unregister()
    )
  );
  localStorage.clear();
  // Reload the application
  window.location.reload();
};
if(getLoginState) resetPWA();
  }, [])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { Welcome_Page } = await import("./Components/WelcomePage");
            return { Component: Welcome_Page };
          },
        },
        {
          path: "/up-sign-add",
          lazy: async () => {
            const { SignUp } = await import("./Components/SignUp");
            return { Component: SignUp };
          },
        },
        {
          path: "/signin",
          lazy: async () => {
            const { SignIn } = await import("./Components/SignIn");
            return { Component: SignIn};
          },
        },
        {
          path: "/Home",
          lazy: async () => {
            const { Home } = await import("./Components/Home");
            return { Component: Home };
          },
        },
        {
          path: "/Get_Answers",
          lazy: async () => {
            const { Get_Answers } = await import("./Components/Get_Answers");
            return { Component: Get_Answers };
          },
        },
        {
          path: "/Test",
          lazy: async () => {
            const { Test } = await import("./Components/TEST_SECTION/Test");
            return { Component: Test };
          },
        },
        {
          path: "/Podcast",
          lazy: async () => {
            const { Podcast } = await import("./Components/Podcast");
            return { Component: Podcast };
          },
        },
        {
          path: "/Websitetour",
          lazy: async () => {
            const { WebsiteTour } = await import("./Components/webTour");
            return { Component: WebsiteTour };
          },
        },
        {
          path: "/Exam-papers/add",
          lazy: async () => {
            const { ExamPapersWrapper } = await import("./Components/Add_Paper_holder");
            return { Component: ExamPapersWrapper };
          },
        },
        {
          path: "/Exam-papers",
          lazy: async () => {
            const { GetAllExamPapersWrapper } = await import("./Components/All_Exam_Papers_Holder");
            return { Component: GetAllExamPapersWrapper };
          },
        },
        {
          path: "/Learning_progress",
          lazy: async () => {
            const { User_Progress } = await import("./Components/Progress_Tracker/User_Progress");
            return { Component: User_Progress };
          },
        },
        {
          path: "/E-Quiz",
          lazy: async () => {
            const { E_Quiz } = await import("./Components/E_Quiz_Folder/E_QUIZ");
            return { Component: E_Quiz };
          },
        },
        {
          path: "/E-Quiz/:id",
          lazy: async () => {
            const { Create_Quiz } = await import("./Components/E_Quiz_Folder/Create_Quiz");
            return { Component: Create_Quiz };
          },
        },
        {
          path: "/E-Quiz-Gen",
          lazy: async () => {
            const { Create_Quiz_Extension } = await import("./Components/E_Quiz_Folder/Sample_Quiz");
            return { Component: Create_Quiz_Extension };
          },
        },
        {
          path: "/pdfreader",
          lazy: async () => {
            const PDFViewer = await import("./Components/PDFViewer");
            return { Component: PDFViewer.default };
          },
        },
        {
          path: "/Intro",
          lazy: async () => {
            const { Intro } = await import("./Components/Intro");
            return { Component: Intro };
          },
        },
         {
          path: "/Survey",
          lazy: async () => {
            const { Survey } = await import("./Components/Feedback/survey");
            return { Component: Survey };
          },
        }
      ]
    }
  ])
  
  return (
    <>
      <PwaUpdater/>
      <RouterProvider router={router} future={{v7_startTransition: true}} />
      <ToastContainer/>
    </>
  )
}

export default App
