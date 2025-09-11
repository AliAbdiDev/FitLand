import { fetchHandler } from "@/utils";
import { createUser } from "./utils";

export const credentialsProvider = () => ({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            console.error("Missing email or password");
            return null;
        }

        try {
            const { data } = await fetchHandler({
                endpoint: "/auth/login",
                payload: credentials,
                method: "POST",
            });

            if (!data || !data.token) {
                console.error("Invalid response or missing token");
                return null;
            }
            const user = createUser(data);
            
            return user;
        } catch (error) {
            console.error("Authorize error:", error.message);
            return null;
        }
    },
});

    