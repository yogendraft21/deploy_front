import axios from "axios";

const BASE_URL = "https://deploy-back-c8o2.onrender.com";

export const getAllPatients = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/patient`, {
      params,
    });
    return response;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};



export const getPatientById = async (patientId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${patientId}:`, error);
    throw error;
  }
};

export const createPatient = async (patientData:any) => {
  try {
    const response = await axios.post(`${BASE_URL}/patient`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};
