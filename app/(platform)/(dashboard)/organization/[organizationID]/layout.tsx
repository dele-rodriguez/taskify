import { startCase } from "lodash";
import OrgControl from "./_components/org-control";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || "organization"),
    };
}

function OrganizationIdLayout({children,}:{children: React.ReactNode;}) {
    return(
        <div>
            <OrgControl />
            {children}
        </div>
    );
}

export default OrganizationIdLayout;