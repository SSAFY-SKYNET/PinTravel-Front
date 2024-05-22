// openAi.js
import axios from 'axios';

export const generateTravelPlan = async (items) => {
    try {
        const response = await axios.post('/api/generate-travel-plan', { items });
        return response.data.plan;
    } catch (error) {
        console.error('여행 경로 생성 실패 :', error);
        throw error;
    }
};