import axios from "axios";

const BASE_URL = "https://deploy-back-c8o2.onrender.com";

export const getAppointmentsByPatientId = async (
  patientId: number | undefined
) => {
  if (!patientId) {
    throw new Error("Patient ID is undefined");
  }

  try {
    const response = await axios.get(`${BASE_URL}/appointment/${patientId}`);
    const { id, name, email, mobile, address, appointments } = response.data;

    const formattedAppointments = appointments.map((appointment: any) => {
      const dateTime = new Date(appointment.date_time);
      const date = dateTime.toISOString().split("T")[0];
      const time = dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        ...appointment,
        date,
        time,
      };
    });

    return {
      id,
      name,
      email,
      mobile,
      address,
      appointments: formattedAppointments,
    };
  } catch (error) {
    console.error(
      `Error fetching appointments for patient ID ${patientId}:`,
      error
    );
    throw error;
  }
};

export const createAppointment = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/appointment`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};