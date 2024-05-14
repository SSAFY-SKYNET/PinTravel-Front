// api/user.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllUser = (success, error) => {
    axios.get(`${API_URL}/user/1`)
    .then(success)
    .catch(error);
};

const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/user/login`, { email, password });
    return response.data;
};

export { getAllUser, login };