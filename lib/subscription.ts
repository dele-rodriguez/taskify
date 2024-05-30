import {auth} from "@clerk/nextjs";

import {db} from "@/lib/db";

const DAY_IN_MS = 84_400_000;

export const checkSubcription = async () => {
    const {orgId} = auth();

    if(!orgId) {
        return false;
    }

    const orgsubcription = await db.orgSubscription.findUnique({
        where: {
            orgId ,
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscroptionId: true,
        },
    });

    if(!orgsubcription) {
        return false;
    }

    const isValid = orgsubcription.stripePriceId && orgsubcription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid;
};