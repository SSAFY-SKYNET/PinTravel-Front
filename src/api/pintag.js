import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const selectTagByPinId = async (pinId) => {
    try {
      const response = await axios.get(`${API_URL}/pintags/pin/${pinId}`);
      console.log("selectTagByPinId",response.data)
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  export { selectTagByPinId };

