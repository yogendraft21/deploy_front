import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PatientApi } from "../api";


const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await PatientApi.getAllPatients({
          page,
          limit,
          search: searchQuery,
        });
        setPatients(patientsData.data.result);
        setTotalPages(patientsData.data.totalPages);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [page, limit, searchQuery]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 h-full flex flex-col items-center justify-center p-6">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg h-full">
        <h1 className="text-3xl font-semibold mb-3">Dashboard</h1>

        {/* Menu Bar */}
        <div className="flex items-center justify-end mb-3">
          <Link
            to="/dashboard/create-patient"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
          >
            Create Patient
          </Link>
          <Link
            to="/dashboard/create-appointment"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Create Appointment
          </Link>
        </div>

        <h3 className="text-2xl font-bold mb-1 text-center">Patients List</h3>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        {/* Patient Table */}
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Mobile</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient: any) => (
                <tr key={patient.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {patient.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {patient.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {patient.mobile}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {patient.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {patient.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
                    <Link
                      to={`/dashboard/patient-detail/${patient.id}`}
                      className="text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded-lg shadow-md"
                    >
                      View
                    </Link>
                    <button
                      className="text-white bg-red-600 hover:bg-red-700 py-1 px-3 rounded-lg shadow-md"
                      // onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
