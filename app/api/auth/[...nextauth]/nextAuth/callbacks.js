import { createUser } from "./utils";

export const callbacks = {
  async jwt({ token, user }) {
    if (user) {
      token.userData = createUser(user);
    }
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