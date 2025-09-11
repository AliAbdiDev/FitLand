import { createUser } from "./utils";
import { fetchHandler } from "@/utils";

export const callbacks = {
  async jwt({ token, user, account }) {
    if (!user) return token;

    if (account.provider === "google") {
      const { data } = await fetchHandler({
        endpoint: "/auth/provider/google",
        payload: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        method: "POST",
      });
      token.userData = createUser(data);
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
