// api/tag.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const selectTagsByMultipleInputs = async (
    inputs,
    pageSize = 10,
    pageNum = 1
) => {
    try {
        const response = await axios.post(`${API_URL}/tags/search`, inputs, {
            params: {
                pageSize,
                pageNum,
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const selectTagByInput = async (input) => {
    if (typeof input !== "string") {
        console.error("Input must be a string");
        input = String(input); // input을 문자열로 변환
    }
    const encodedInput = encodeURIComponent(input);
    try {
        const response = await axios.get(`${API_URL}/tags/search/${encodedInput}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const selectTagsByIds = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/tags/multi`, ids);
        // console.log("selectTagsByIds",response.data)
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export {selectTagsByMultipleInputs, selectTagByInput, selectTagsByIds};
