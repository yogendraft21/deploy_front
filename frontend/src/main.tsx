import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import IndexPage from "./routes";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import DashboardPage from "./routes/dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import CreateAppointmentForm from "./routes/create-appointment";
import CreatePatientForm from "./routes/create-patient";
import PatientDetailPage from "./routes/patient-detail";
import Success from "./routes/success";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/create-patient", element: <CreatePatientForm /> },
          {
            path: "/dashboard/create-appointment",
            element: <CreateAppointmentForm />,
          },
          {
            path: "/dashboard/patient-detail/:userId",
            element: <PatientDetailPage />,
          },
          {
            path: "/dashboard/pay/success",
            element: <Success />,
          },
        ],
      },
    ],
  },
  { path: "/pay/success", element: <Success /> },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
