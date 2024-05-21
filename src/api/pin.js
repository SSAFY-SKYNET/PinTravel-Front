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
  console.log("selectPinByMultiTagAndPage", tags);
  try {
    const response = await axios.post(`${API_URL}/pin/multi-tag`, tags, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page,
        limit,
      },
    });
    // console.log("selectPinByMultiTagAndPage", response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPinByUserId = async (userId, page = 1, limit = 30) => {
  const response = await axios
    .get(`${API_URL}/pin/user/${userId}/page?page=${page}&limit=${limit}`)
    .catch((err) => console.error(err));

  return response.data;
};

const createPin = async (pinData, token) => {
  try {
    console.log(pinData);
    const response = await axios.post(`${API_URL}/pin`, pinData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // 토큰을 Bearer 스키마와 함께 전송
      },
    });
    return response.data;
  } catch (error) {
    console.error("핀 생성 오류:", error);
    throw error;
  }
};
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("imageFile", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("이미지 업로드 성공", response.data);
    // imageUrl이 객체로 반환되는 경우를 대비하여 문자열로 처리
    return typeof response.data === "string"
      ? response.data
      : JSON.stringify(response.data);
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

const getPinByBoardAndPage = async (boardId, page = 1, limit = 30) => {
  const response = await axios
      .get(`${API_URL}/pin/board/${boardId}/page?page=${page}&limit=${limit}`)
      .catch((err) => console.error(err));

  return response.data;
};

export {
  getPinByPage,
  getPinDetailById,
  getPinByUserId,
  selectPinByMultiTagAndPage,
  createPin,
  uploadImage,
  getPinByBoardAndPage,
};
