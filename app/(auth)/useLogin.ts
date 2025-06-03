import { signIn } from "next-auth/react";

type CredentialsData = { email: string, password: 'string' }

function useLogin() {

    const loginHandlers = {
        credentialsLogin: async (data: CredentialsData) => {
            await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            })
        },

        googleLogin: async () => {
            await signIn("google", {
                redirect: false,
            });
        }

    }

    return loginHandlers;
}

export default useLogin;