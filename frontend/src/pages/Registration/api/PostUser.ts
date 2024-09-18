import axios from "axios";
import { IUser } from "../../../entities/model/User";

export const PostUser = async (user: IUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      user
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(user);
    console.error("Error posting user:", error);
    throw error;
  }
};
