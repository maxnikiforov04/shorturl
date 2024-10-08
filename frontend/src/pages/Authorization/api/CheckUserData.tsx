import axios from "axios";
import { LogUser } from "../model/LogUser";

export const CheckUserData = async (user: LogUser) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", user);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(user);
    console.error("Error posting user:", error);
    throw error;
  }
};
