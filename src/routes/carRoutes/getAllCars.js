import tokenConfig from "../../api/tokenConfig";
export const getAllCars = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await tokenConfig.get(`cars/cars?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch filtered cars:", error);
    throw error;
  }
};