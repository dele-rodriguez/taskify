"use client";

import { create } from "@/actions/createBoard";
import { useFormState } from "react-dom";
import { FormInput } from "./formInput";
import { FormButton } from "./fornButton";

export function Form() {
    const initialState = { message: null , errors: {} };
    const [state , dispatch] = useFormState(create , initialState);

    return(
        <form action={dispatch}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={state?.errors} />
            </div>
            <FormButton />
        </form>
    )
}