import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-200">
      <div className="max-w-xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Welcome to the Patient Appointment System
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Manage your appointments with ease.
        </p>
        <Link
          to="/sign-in"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-colors block w-full text-center"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
