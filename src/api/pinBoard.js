import axios from "axios";
import router from "@/router/index.js";

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

const deletePinBoard = async (pinId, boardId, token) => {
    try {
        await axios.delete(`${API_URL}/pinboards/${pinId}/${boardId}`, {
            headers: {
                Authorization: token,
            },
        });
        router.push({path: `/mypage`, query: {activeTab: 'board'}});
    } catch (error) {
        console.error("핀-보드 삭제 오류:", error);
        throw error;
    }
}
export {addPinBoard, deletePinBoard};