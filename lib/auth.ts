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
        const response = await fetch('http://localhost:8080/vip/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',

          body: JSON.stringify({
            id: credentials.id,
            pw: credentials.pw,
          }),
        });
        console.log('🚀 ~ authorize ~ response:', response.status);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Invalid credentials');
        }
        const user = { email: credentials.id, name: 'Guest' } as User;
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
      // 토큰 정보를 세션에 전달
      session.user = {
        ...session.user,
        email: token.email || '',
        name: token.name || '',
      };

      // 커스텀 필드 추가
      session.sessionToken = token.email as string; // 타입 단언 사용
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

  pages: {
    signIn: '/signin',
  },
  trustHost: true,
});
