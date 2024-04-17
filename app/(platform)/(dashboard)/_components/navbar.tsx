import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";

function Navbar() {
    return (
        <nav className="fixed z-50 top-0 w-full px-4 h-12 border-b shadow-sm bg-white flex items-center">
            {/* TODO: mobile sidebar */}
            <MobileSidebar />
            <div className="flex items-center w-full gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
                <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
                    <Plus className="h-4 w-4"/>
                </Button>
                <div className="ml-auto flex items-center gap-x-2">
                    <OrganizationSwitcher hidePersonal
                        afterCreateOrganizationUrl="/organization/:id"
                        afterLeaveOrganizationUrl="/select-org"
                        afterSelectOrganizationUrl="/organization/:id"
                        appearance={{
                            elements: {
                                rootBox: {
                                    display: "flex", 
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                            },
                        }}
                    />
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 30,
                                    width: 30,
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;