import { MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppointmentsByPatientId } from "../api/appointment";

const PatientDetailPage = () => {
  const { userId } = useParams();
  const [patient, setPatient] = useState<any>(null);

useEffect(() => {
  const fetchPatient = async () => {
    try {
      if (userId) {
        const patientData = await getAppointmentsByPatientId(
          parseInt(userId, 10)
        );
        setPatient(patientData);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  fetchPatient();
}, [userId]);


  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 h-full flex flex-col items-center justify-center p-6">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg h-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Patient Details
        </h1>
        <div className="bg-white shadow-md rounded-full p-3 border border-black absolute top-[80px] left-5 m-4">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <MoveLeft className="w-6 h-6" />
          </Link>
        </div>
        {/* Patient Details */}
        {patient && (
          <div className="mb-6">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold">ID: {patient.id}</p>
              <p className="text-lg font-semibold">Name: {patient.name}</p>
              <p className="text-lg font-semibold">Mobile: {patient.mobile}</p>
              <p className="text-lg font-semibold">Email: {patient.email}</p>
            </div>
          </div>
        )}

        {/* Appointment Table */}
        {patient && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Appointment History</h3>
            <div className="overflow-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-lg font-semibold text-center">
                      Appointment ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-lg font-semibold text-center">
                      Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-lg font-semibold text-center">
                      Time
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-lg font-semibold text-center">
                      Notes
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-lg font-semibold text-center">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patient.appointments.map((appointment : any) => (
                    <tr key={appointment.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {appointment.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {appointment.date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {appointment.time}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {appointment.notes}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 text-center ${
                          appointment.payment_status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {appointment.payment_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailPage;
