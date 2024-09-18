import axios from "axios";

export const fetchUrls = async (userId: number) => {
  const response = await axios.get(
    `http://localhost:3000/short-url/user-links/${userId}`
  );
  return response.data.links;
};
