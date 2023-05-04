import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

import {signIn} from '../../../services/auth'

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                /**
                 * This function is used to define if the user is authenticated or not.
                 * If authenticated, the function should return an object contains the user data.
                 * If not, the function should return `null`.
                 */
                if (credentials == null) return null;
                /**
                 * credentials is defined in the config above.
                 * We can expect it contains two properties: `email` and `password`
                 */
                try {
                    const {user, jwt} = await signIn({
                            email: credentials.email,
                            password: credentials.password
                        }
                    )
                    return {...user, jwt}
                } catch (e) {
                    // Sign In Fail
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })

    ],
    session: {
        jwt: true,
    },

    callbacks: {
        session: async ({session, token}) => {
            session.id = token.id
            session.jwt = token.jwt

            return Promise.resolve(session)
        },
        jwt: async ({token, user, account, profile, isNewUser}) => {
            const isSignIn = !!user
            if (isSignIn) {
                token.id = user.id
                token.jwt = user.jwt
            } else if(isSignIn && account.provider === 'google') {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.accessToken}`
                );
                const data = await response.json();
                console.log(data)
                token.jwt = data.jwt;
                token.id = data.user.id;

            }
            return Promise.resolve(token)
        }
    }
})

/*`const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
                );
                const data = await response.json();
                token.jwt = data.jwt;
                token.id = data.user.id;
*/