import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/deleteBoard";
import { FormDelete } from "./formDelete";

interface BoardProps {
    title: string,
    id: string,
}

export function Board({title , id}: BoardProps) {
    const deleteBoardWithId = deleteBoard.bind(null , id);

    return(
        <form action={deleteBoardWithId} className="flex items-center gap-x-2">
            <p>Board Title: {title}</p>
            <FormDelete />
        </form>
    )
}