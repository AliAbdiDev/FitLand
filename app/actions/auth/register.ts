import { actionFetcher } from "../actionFetcher";

export const registerAction = await (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    actionFetcher({url:'/api/auth/login'})
}