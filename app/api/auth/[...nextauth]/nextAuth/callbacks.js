import { createUser } from "./utils";

export const callbacks = {
  redirect: async () => false,
  async jwt({ token, user, account }) {
    console.log("🚀 ~ jwt ~ account:", account);
    if (!user) return token;

    if (account.provider === "google") {
      const { data } = await fetchHandler({
        endpoint: "/auth/login",
        payload: {
          id: account.sub,
          email: user.email,
          name: user.name,
        },
        method: "POST",
      });
      token.userData = createUser(data);
    }

    token.userData = createUser(user);
    return token;
  },
  async session({ session, token }) {
    console.log("🚀 ~ session ~ token:", token);
    if (token.userData) {
      session.user = token.userData;
    }
    return session;
  },
};
