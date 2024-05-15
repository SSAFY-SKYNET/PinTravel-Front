// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getPinByPage = async (page = 1, limit = 30) => {
  const response = await axios
    .get(`${API_URL}/pin/likes/page?page=${page}&limit=${limit}`)
    .catch((err) => console.error(err));
  console.log(response.data);
  return response.data;
};

const getPinDetailById = async (id) => {
  const response = await axios
    .get(`${API_URL}/pin/${id}`)
    .catch((err) => console.error(err));
  return response.data;
};

export { getPinByPage, getPinDetailById };
