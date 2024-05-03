"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { useState } from "react";

export function Form() {
    const [inputValue , setInputValue] = useState<string>("")

    const { execute , fieldErrors , error , data , isLoading } = useAction(createBoard, {
        onSuccess: (data) => {
            setInputValue("");
            console.log(data , "SUCCESS!")
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({title});
    }

    return(
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput
                    id="title"
                    errors={fieldErrors}
                    label="Board Title"
                    value={inputValue}
                    setValue={setInputValue}
                />
            </div>
            <FormSubmit
            >
                Save
            </FormSubmit>
        </form>
    )
}