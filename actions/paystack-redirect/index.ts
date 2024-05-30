"use server"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { PaystackRedirect } from "./schema";
import { absoluteUrl } from "@/lib/utils";


const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId , orgId } = auth();

    if (!userId || !orgId) {
        return{
            error: "Unauthorized"
        };
    }
    const settingsUrl = absoluteUrl(`/organization/${orgId}`);

    let url = "";

    try {
        const orgSbscription = await db.orgSubscription.findUnique({
            where: {
                orgId,
            }
        });

        if(orgSbscription && orgSbscription.paystackCustomerId) {
            return {
                // This is to check if the user is still subscribed
            }
        } else {
            // this was supposed to start the subscription which you did in the api route for subscribe
            try {
                const apiUrl = absoluteUrl("/api/paystack/suscribe");
                const response = await fetch(apiUrl , {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json',
                    },
                });
            
                // Log the response
                const textResponse = await response.text();
                console.log(textResponse);

                // Attempt to parse JSON response
                let responseData;
                try {
                    responseData = JSON.parse(textResponse);
                } catch (e) {
                    console.error("Failed to parse JSON response:", textResponse);
                    return { error: "Invalid JSON response from server" };
                }

                if (response.ok) {
                    url = responseData.checkout_url;
                } else {
                    console.error(responseData);
                }
            } catch(e) {
                console.log(e);
            }
        }

    } catch(e) {
        return {error: "something went wrong!"};
    }

    revalidatePath(`organization/${orgId}`)
    return {data: url}

}

export const paystackRedirect = createSafeAction(PaystackRedirect , handler);