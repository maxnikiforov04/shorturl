import axios from "axios";
export const postData = async (url: string) => {
  const response = await axios.post("http://localhost:3000/shorten", url);
  console.log(response.data);
  return response.data;
};
