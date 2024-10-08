import axios from "axios";

export const getApi = async (url) => {
    const response = await axios.get(
      url,
    );
    return response.data;
  };

export const postApi = async (url,payload) => {
    return  axios.post(url, payload)
}
  
