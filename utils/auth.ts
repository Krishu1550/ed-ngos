import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import initializeDatabase from "@/dbConfig/dbConfig";
import User from "@/utils/User";
import bcrypt from "bcryptjs";
import { json } from "stream/consumers";

const secret = process.env.NEXTAUTH_SECRET;
console.log("NEXTAUTH_SECRET:", secret); // Debugging line to check if the secret is loaded correctly
if (!secret) {
  throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "you@example.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // 1️⃣ Validate inputs
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 2️⃣ Connect to MongoDB
        await initializeDatabase();

        // 3️⃣ Find user by email
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) {
          throw new Error("No user found with this email");
        }

        // 4️⃣ Compare password
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 5️⃣ Return safe user object (no password)
        console.log("user auth" + JSON.stringify(user))
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role

        };
      },
    }),
  ],
  pages:
  {
    signIn: "auth/sign-in",
    error: "auth/sign-up",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // This 'user' is exactly what you returned in authorize()
    
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      
      return token;
    },
    async session({ session, token }: any) {
      // Pass the data from the token to the session object
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: secret,
}




