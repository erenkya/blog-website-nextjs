"use client";

import Navbar from "@/components/page_components/navbar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addBlog } from "../actions/addBlog";

const FormSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    bio: z.string().min(100, { message: "Bio must be at least 100 characters." }),
});

const WriteBlog = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data) {
        await addBlog(data);
    }

    return (
        <>
            <Navbar />
            <div className="p-4 flex flex-col items-center justify-center align-center">
                <h1 className="text-2xl font-bold mb-4">Write Blog</h1>

                <Form {...form}>
                    <form action={addBlog} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>

                                    <FormControl>
                                        <Textarea placeholder="Title of your blog" className="resize-none h-8" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your blog" className="resize-none h-100" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default WriteBlog;
