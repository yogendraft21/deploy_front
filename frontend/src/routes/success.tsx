import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your payment. Your appointment has been successfully
          booked.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Success;
