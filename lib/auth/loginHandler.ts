'use server'
import { cookieHandler, fetchHandler } from "@/utils";

export const loginHandler = async ({ redirectTo = '/', data }) => {

    try {
        const { data: loginData } = await fetchHandler({
            endpoint: "/auth/login",
            payload: data,
            method: "POST",
        });
        console.log("🚀 ~ loginHandler ~ loginData:", loginData)
        console.log("🚀 ~ loginHandler ~ res:", loginData?.token)

        // if (loginData?.token) {
        //     await (await cookieHandler({ key: "access-token" })).setValue(loginData.token);
        //     // Redirect to the specified page
        // }

    } catch (error) {
        console.log("🚀 ~ loginHandler ~ error:", error)

        // console.error("Login error:", error);
        // res.status(500).json({ error: "Internal Server Error" });
    }
}