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
import ProtechedRoutes from "./components/protected-routes";

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
        element: (
          <ProtechedRoutes>
            <Onboarding />
          </ProtechedRoutes>
        ),
      },

      {
        path: "/jobs",
        element: (
          <ProtechedRoutes>
            <Joblisting />
          </ProtechedRoutes>
        ),
      },

      {
        path: "/job/:id",
        element: (
          <ProtechedRoutes>
            <job />
          </ProtechedRoutes>
        ),
      },

      {
        path: "/post-job",
        element: (
          <ProtechedRoutes>
            <Postjob />
          </ProtechedRoutes>
        ),
      },

      {
        path: "/saved-job",
        element: (
          <ProtechedRoutes>
            <SavedJob />
          </ProtechedRoutes>
        ),
      },

      {
        path: "/my-jobs",
        element: (
          <ProtechedRoutes>
            <Myjob />
          </ProtechedRoutes>
        ),
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
