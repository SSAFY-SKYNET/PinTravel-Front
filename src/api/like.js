import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const addLike = async (pinId, token) => {
    try {
        await axios.post(`${API_URL}/likes/${pinId}`, null, {
            headers: {
                Authorization: token,
            },
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const deleteLike = async (pinId) => {
    try {
        const token = sessionStorage.getItem("accessToken");
        await axios.delete(`${API_URL}/likes/${pinId}`, {
            headers: {
                Authorization: token,
            },
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};
export {addLike, deleteLike};

