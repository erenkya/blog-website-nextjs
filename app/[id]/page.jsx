import connectDB from "@/db/database";
import Blog from "@/db/Blog";
import Link from "next/link";
import Navbar from "@/components/page_components/navbar";

const BlogPage = async ({ params }) => {
    const { id } = params;
    const blog = await Blog.findById(id).lean();
    if (!blog) {
        return <div className="p-4 flex flex-col items-center justify-center align-center">Blog can not be found</div>;
    }
    return (
        <>
            <Navbar />
            <div className="p-4 flex flex-col items-center justify-center align-center">
                <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
            </div>
        </>
    );
};

export default BlogPage;
