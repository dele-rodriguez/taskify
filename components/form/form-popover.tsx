"use client";

import { Popover , PopoverClose, PopoverContent , PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { CreateBoard } from "@/actions/create-board/schema";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { createBoard } from "@/actions/create-board";


interface FormPopOverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export function FormPopOver({children , side= "bottom" , align ,sideOffset= 0}: FormPopOverProps) {
    const [FormPopOverValue , setFormPopOverValue] = useState("");
    const {execute , fieldErrors} = useAction(createBoard , {
        onSuccess: (data) => {
            setFormPopOverValue("");
            console.log({data});
        }, 
        onError: (error) => {
            console.error({error});
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({title});
    }

    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                sideOffset={sideOffset}
                side={side}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                            value={FormPopOverValue}
                            setValue={setFormPopOverValue}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}