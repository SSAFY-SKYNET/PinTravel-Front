// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getPinByPage = async (page = 1, limit = 30) => {
  const response = await axios
    .get(`${API_URL}/pin/likes/page?page=${page}&limit=${limit}`)
    .catch((err) => console.error(err));
  
  return response.data;
};

const getPinDetailById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pin/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 던져서 컴포넌트에서 처리할 수 있도록 합니다.
  }
};

const selectPinByMultiTagAndPage = async (tags, page = 10, limit = 30) => {
  
  try {
    const response = await axios.post(`${API_URL}/pin/multi-tag`, tags, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page,
        limit
      }

    });
    console.log("selectPinByMultiTagAndPage", response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getPinByPage, getPinDetailById, selectPinByMultiTagAndPage };
const getPinByUserId = async (userId, page = 1, limit = 30) => {
  const response = await axios
      .get(`${API_URL}/pin/user/${userId}/page?page=${page}&limit=${limit}`)
      .catch((err) => console.error(err));

  return response.data;
};

export { getPinByPage, getPinDetailById, getPinByUserId };
