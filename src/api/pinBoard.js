import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const addPinBoard = async (pinId, boardId, token) => {
    try {
        const response = await axios.post(`${API_URL}/pinboards`, {
            pinId: pinId,
            boardId: boardId
        }, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("핀-보드 추가 오류:", error);
        throw error;
    }
};

export {addPinBoard};