"use server";
import { redirect } from "next/navigation";
import { actionFetcher } from "./actionFetcher";
import { errorMessageExtractor } from "@/utils/errorMessageExtractor";

export const registerAction = async (formData: FormData) => {
  const sendData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { response, data } = await actionFetcher({
    url: "/api/auth/register", // API relative path
    method: "POST",
    body: sendData, // Data to be sent
    sendToken: false, // No token needed for registration
  });
  console.log("🚀 ~ registerAction ~ data:", data)


  if (!response?.ok) {
    const errorMsg = errorMessageExtractor({ data: data?.details }) || 'There was a problem, try again later';
    console.log("🚀 ~ registerAction ~ errorMsg:", errorMsg);
    return {
      error: errorMsg,
    };
  }

  redirect(`/login`);
};