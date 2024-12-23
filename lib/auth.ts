import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// const secret = 'your-secret-key';

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
        // Spring API로 사용자 검증 요청
        const user = {
          email: credentials.id,
          name: 'Guest',
          id: 'xxx',
        } as User;
        return user;
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      console.log('🚀 ~ signIn ~ user:', user); // 디버깅
      return true;
    },
    session({ session, token }) {
      // console.log('ttttttttttttt', token);
      // 토큰 정보를 세션에 전달
      session.user = {
        ...session.user,
        email: token.email || '',
        name: token.name || '',
      };

      // 커스텀 필드 추가
      session.sessionToken = token.email as string; // 타입 단언 사용
      // console.log('ssssssssssssss>>', session);
      return session;
    },
    // jwt({ token, user }) {
    //   if (user) {
    //     token.name = user.name || '';
    //     token.email = user.email || '';
    //   }
    //   console.log('🚀 ~ jwt ~ token:', token); // 디버깅

    //   return token;
    // },
  },

  // session: {
  //   strategy: 'database',
  // },
  pages: {
    signIn: '/signin',
  },
  trustHost: true,
});
