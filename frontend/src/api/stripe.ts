import axios from "axios";

const BASE_URL = "https://deploy-back-c8o2.onrender.com";

export const createCheckoutSession = async (patientId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/pay/checkout`,
      {
        patientId: parseInt(patientId),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
