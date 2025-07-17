import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                    user
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.error = token.error;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    },
    pages: {
        signIn: "/login",
        error: "/auth/error"
    },
    debug: process.env.NODE_ENV === "development"
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);