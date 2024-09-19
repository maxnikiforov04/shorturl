import axios from "axios";
import { UserLinks } from "../model/userLinks";

export const fetchUserLinks = async (userId: number): Promise<UserLinks[]> => {
  const response = await axios.get(
    `http://localhost:3000/user-links/${userId}`
  );
  return response.data.links;
};
