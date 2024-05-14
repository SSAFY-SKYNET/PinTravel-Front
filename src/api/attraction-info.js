// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllAttractionsByPage = async (page = 1, limit = 30) => {
  const response = await axios.get(
    `${API_URL}/attraction/page?page=${page}&limit=${limit}`
  );
  console.log(response);
  return response.data;
};

export { getAllAttractionsByPage };
