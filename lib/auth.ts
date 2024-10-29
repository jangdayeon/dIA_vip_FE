import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'emailLogin',
      credentials: {
        id: {
          label: 'id',
          type: 'email',
        },
        pw: { label: 'pw', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.id || !credentials.pw) return null;
        const user = { email: credentials.id, name: 'Guest' } as User;
        return user;
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      console.log('🚀 ~ signIn ~ user:', user);
      return true;
    },
    session({ session }) {
      console.log('🚀 ~ session ~ session:', session);
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  trustHost: true,
});
