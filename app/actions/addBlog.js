"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/db/database";
import Blog from "@/db/Blog";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/dist/server/api-utils";

async function addBlog(formData) {
    await connectDB();
    console.log("Adding blog...");
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        throw new Error("You must be logged in to add a blog.");
    }
    const { userId } = sessionUser;

    const blogData = {
        owner: userId,
        title: formData.get("title"),
        content: formData.get("content"),
    };

    await new Blog(blogData).save();
    console.log("Blog added successfully:", blogData);
    revalidatePath("/", "layout");
}
export { addBlog };
