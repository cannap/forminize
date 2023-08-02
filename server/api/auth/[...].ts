import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import { PlanetScaleAdapter } from '../../lib/drizzle-adapter';
import { db, tables } from '../../utils/db';
import { eq } from 'drizzle-orm';
const { github } = useRuntimeConfig();
//https://github.com/matheins/Dorf/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts
export default NuxtAuthHandler({
  adapter: PlanetScaleAdapter(db),
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
    signOut: '/logout'
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: github.clientId,
      clientSecret: github.secret
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        (session as any).user.id = token.id;
        (session as any).user.name = token.name;
        (session as any).user.email = token.email;
        (session as any).user.image = token.picture;
      }

      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      let dbUser;
      if (token.email) {
        dbUser = await db.query.users.findFirst({
          where: eq(tables.users.email, token.email)
        });
      }

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      };
    }
  }
});
