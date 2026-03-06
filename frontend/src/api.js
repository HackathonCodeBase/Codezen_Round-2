import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

/**
 * Send patient data to the CDSS backend and return the alerts array.
 * @param {Object} data - Patient payload matching the Pydantic Patient model
 * @returns {Promise<Array>} alerts list
 */
export const analyzePatient = async (data) => {
  const response = await api.post("/analyze_patient", data);
  return response.data; // { alerts: [...], total_alerts: N, status: "..." }
};

export default api;
