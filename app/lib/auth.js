import NextAuth from "next-auth";

const authConfig = {
  providers: [],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async session({ session }) {
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
