"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    errors?: {
        title?: string[];
    },
    message?: string | null;
}

const CreateBoard = z.object({
    title: z.string().min(3, {message: "Minimum length of 3 letters is required"})
});

export async function create(prevState: State , formData: FormData) {
    const validatedFeilds = CreateBoard.safeParse({
        title: formData.get("title",)
    })

    if (!validatedFeilds.success) {
        return {
            errors: {title: validatedFeilds.error.flatten().fieldErrors.title },
            message: "Missing fields."
        };
    }

    const { title } = validatedFeilds.data
    
    try{
        await db.board.create({
            data: {
                title,
            }
        });

        // Assuming revalidatePath and redirect are asynchronous functions
        await revalidatePath("/organization/org_2dHVxXUzYbGCjNqaUqq09IUaYuh");
        await redirect("/organization/org_2dHVxXUzYbGCjNqaUqq09IUaYuh");
     
        // Return the new state
        return { ...prevState };
    } catch(error) {
        return{
            message: "Database Error",
        }
    }
}