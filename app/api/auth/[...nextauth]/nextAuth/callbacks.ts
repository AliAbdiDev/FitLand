import { createUser } from "./utils";
import { fetchHandler } from "@/utils";

export const callbacks = {
  redirect: async () => false,
  async jwt({ token, user, account }) {
    if (!user) return token;

    console.log("JWT Callback", { token, user, account });
    if (account.provider === "google") {
      console.log('new log');
      // const { data, response } = await fetchHandler({
      //   endpoint: "/auth/login",
      //   payload: {
      //     id: user.id,
      //     email: user.email,
      //     name: user.name,
      //   },
      //   method: "POST",
      // });
      token.userData = createUser({ ...user, accessToken: account?.id_token });
      return token;
    }

    token.userData = createUser(user);
    return token;
  },
  async session({ session, token }) {
    if (token.userData) {
      session.user = token.userData;
    }
    return session;
  },
};
