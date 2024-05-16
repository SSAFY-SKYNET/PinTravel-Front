// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getCommentByPinId = async (pinId) => {
  const response = await axios
    .get(`${API_URL}/comment/pin/${pinId}`)
    .catch((err) => console.error(err));
  
  return response.data;
};


const insertComment = async (comment) => {
    const response = await axios
      .post(`${API_URL}/comment`, comment)
      .catch((err) => console.error(err));
    console.log(response.data);
    return response.data;
};
export { getCommentByPinId, insertComment };
