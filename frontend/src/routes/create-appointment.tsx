import { MoveLeft } from "lucide-react";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPatients } from "../api/patient";
import { createAppointment } from "../api/appointment";
import { createCheckoutSession } from "../api/stripe";

interface FormData {
  patient_id: string;
  patient_name: string;
  date_time: string;
  notes: string;
  payment_status: string;
}

const CreateAppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [hovered,setHovered] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patient_id: "",
    patient_name: "",
    date_time: "",
    notes: "",
    payment_status: "pending",
  });
  const [patients, setPatients] = useState<any>([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getAllPatients();
        setPatients(patientsData.data.result);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "patient_id") {
      const selectedPatient = patients.find((patient : any) => patient.id == value);
      if (selectedPatient) {
        setFormData({
          ...formData,
          patient_id: selectedPatient.id,
          patient_name: selectedPatient.name,
        });
      } else {
        setFormData({ ...formData, patient_name: "", patient_id: "" });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sessionData = await createCheckoutSession(formData.patient_id);
      if (sessionData) {
        window.location = sessionData.url;
      }
    } catch (error:any) {
       console.log("Error while processing payment", error.message)
    }
    try {
      const newAppointmentData = {
        patient_id: formData.patient_id,
        patient_name: formData.patient_name,
        date_time: formData.date_time,
        notes: formData.notes,
        payment_status: formData.payment_status,
      };
      await createAppointment(newAppointmentData);
      setFormData({
        patient_id: "",
        patient_name: "",
        date_time: "",
        notes: "",
        payment_status: "",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 h-full flex flex-col items-center justify-center p-6">
      <div className="w-full p-8 bg-white shadow-lg rounded-lg h-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create Appointment
        </h1>
        <div className="bg-white shadow-md rounded-full p-3 border border-black absolute top-[60px] left-0 m-4">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <MoveLeft className="w-6 h-6" />
          </Link>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="patientId" className="block mb-2 text-gray-600">
              Patient ID:
            </label>
            <select
              id="patientId"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="">Select Patient ID</option>
              {patients.map((patient : any) => (
                <option key={patient.id} value={patient.id}>
                  {patient.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="patientName" className="block mb-2 text-gray-600">
              Patient Name:
            </label>
            <input
              type="text"
              id="patientName"
              name="patient_name"
              value={formData.patient_name}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter patient name"
              disabled
            />
          </div>
          <div className="mb-8">
            <label htmlFor="dateTime" className="block mb-2 text-gray-600">
              Date and Time:
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="date_time"
              value={formData.date_time}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="notes" className="block mb-2 text-gray-600">
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter notes"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition duration-300 relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {hovered ? "Pay 499 Rs" : "Make Appointment"}
          </button> 
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentForm;
