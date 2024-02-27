"use client";

import { UserButton } from "@clerk/nextjs";

const protectedPage = async () => {
    return (
        <div>
            <UserButton/>
        </div>
    )
}

export default protectedPage;