// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getPinByPage = async (page = 1, limit = 30) => {
  const response = await axios.get(
    `${API_URL}/pin/likes/page?page=${page}&limit=${limit}`
  );
  return response.data;
};

export { getPinByPage };
