import { OrganizationSwitcher, auth } from "@clerk/nextjs";

function OrganizationIdPage() {
    const {userId , orgId } = auth();

    return (
        <>
            <div>
                Organization: {orgId}
            </div>
            {/* <OrganizationSwitcher
                hidePersonal
            /> */}
        </>
    )
}

export default OrganizationIdPage;