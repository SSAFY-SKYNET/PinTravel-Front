// openAi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const generateTravelPlan = async (items) => {
    try {
        const response = await axios.post(`${API_URL}/api/generate-travel-plan`, { items });
        return response.data.plan;
    } catch (error) {
        console.error('여행 경로 생성 실패 :', error);
        throw error;
    }
};