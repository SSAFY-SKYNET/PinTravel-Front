// api/magazine.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const selectTagsByMultipleInputs = async (inputs, pageSize = 10, pageNum = 1) => {
  try {
    const response = await axios.post(`${API_URL}/search`, inputs, {
      params: {
        pageSize,
        pageNum
      }
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

  const selectTagByInput = async (input) => {
    if (typeof input !== 'string') {
      console.error('Input must be a string');
      input = String(input);  // input을 문자열로 변환
    }
    const encodedInput = encodeURIComponent(input);
    console.log(encodedInput);
    try {
      const response = await axios.get(`${API_URL}/tags/search/${encodedInput}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };


export { selectTagsByMultipleInputs ,selectTagByInput};