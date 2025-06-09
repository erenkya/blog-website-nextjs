import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";
export const getSessionUser = async () => {
    const session = await getServerSession(authOptions);
    return !session || !session.user ? null : { user: session.user, userId: session.user.id };
};
