import axios from "axios";
const baseUrl = 'https://jsonplaceholder.typicode.com';
export const getApi = async (url) => {
    const response = await axios.get(
      baseUrl+url,
    );
    return response.data;
  };

export const postApi = async (url,payload) => {
    return  axios.post(baseUrl+url, payload)
}
  
