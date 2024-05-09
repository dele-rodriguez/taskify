"use server"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";

 

const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId , orgId } = auth(); 
    if (!userId || !orgId) {
        return{
            error: "Unauthorized"
        };
    }

    const {title , boardId , id} = data;
    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
        });

        if(!board) {
            return {
                error: "Board not found",
            };
        }

        const lastList = await db.list.findFirst({
            where: {boardId: boardId},
            orderBy: {order: "desc"},
            select: {order: true},
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.update({
            where:{
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title,
            }
        })
    } catch (e) {
        return {
            error: "Failed to Update."
        }
    }

    revalidatePath((`/board/${boardId}`));
    return {data: list};
}

export const updateList = createSafeAction(UpdateList , handler);