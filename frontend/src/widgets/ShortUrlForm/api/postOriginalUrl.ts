import axios from "axios";

interface PostDataParams {
  url: string;
}

export const postData = async ({ url }: PostDataParams) => {
  const user = localStorage.getItem("user");
  if (!user) {
    throw new Error("User not found in localStorage");
  }

  const userObject = JSON.parse(user);
  const userId = userObject.id;
  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  const response = await axios.post("http://localhost:3000/shorten", {
    originalUrl: url,
    userId: Number(userId),
  });
  return await response.data;
};
