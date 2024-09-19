import axios from "axios";
import { UpdateUserDataParams } from "../model/upUser";

export const updateUserData = async (user: UpdateUserDataParams) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/reset-password",
      user
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
