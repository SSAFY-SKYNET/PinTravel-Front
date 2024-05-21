import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getBoardByUserId = async (userId, page = 1, limit = 30) => {
    const response = await axios
        .get(`${API_URL}/board/user/${userId}?page=${page}&limit=${limit}`)
        .catch((err) => console.error(err));

    return response.data;
};

const getBoardListByUserId = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/board/list`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("보드 생성 오류:", error);
        throw error;
    }
};

const getBoardDetailById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/board/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createBoard = async (formData, token) => {
    try {
        console.log(formData);
        const response = await axios.post(`${API_URL}/board`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("보드 생성 오류:", error);
        throw error;
    }
};

const updateBoard = async (boardId, boardData) => {
    try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.put(`${API_URL}/board/${boardId}`, boardData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("보드 수정 오류:", error);
        throw error;
    }
};

export {getBoardByUserId, getBoardListByUserId, getBoardDetailById, createBoard, updateBoard};