import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "./components/ui/button";
import AppLayouts from "./layouts/app-layout";
import Landingpage from "./pages/landingpage";
import Onboarding from "./pages/onboarding";
import Joblisting from "./pages/job-listing";
import Job from "./pages/job";
import Postjob from "./pages/post-job";
import SavedJob from "./pages/saved-job";
import Myjob from "./pages/my-job";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    element: <AppLayouts />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },

      {
        path: "/onboarding",
        element: <Onboarding />,
      },

      {
        path: "/jobs",
        element: <Joblisting />,
      },

      {
        path: "/job/:id",
        element: <Job />,
      },

      {
        path: "/post-job",
        element: <Postjob />,
      },

      {
        path: "/saved-job",
        element: <SavedJob />,
      },

      {
        path: "/my-jobs",
        element: <Myjob />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
