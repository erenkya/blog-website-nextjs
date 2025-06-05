import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/database";
import User from "@/db/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ profile }) {
            try {
                await connectDB();
                const userExist = await User.findOne({ email: profile.email });
                if (!userExist) {
                    const username = profile.name.slice(0, 20);
                    await User.create({
                        email: profile.email,
                        username,
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.error("signIn error:", error);
                return false;
            }
        },
        async session({ session }) {
            try {
                await connectDB();
                const user = await User.findOne({ email: session.user.email });
                if (user) {
                    session.user.id = user._id.toString();
                }
                return session;
            } catch (error) {
                console.error("session error:", error);
                return session;
            }
        },
    },
};
