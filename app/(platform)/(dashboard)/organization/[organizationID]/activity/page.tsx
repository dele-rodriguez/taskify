import { Separator } from "@/components/ui/separator";
import Info from "../_components/info";
import { ActivityList } from "./_components/activitylist";
import { Suspense } from "react";

export default function ActivityPage() {
    return (
        <div className="w-full">
            <Info />
            <Separator className="my-2"/>
            <Suspense fallback={<ActivityList.Skeleton />}>
                <ActivityList />
            </Suspense>
        </div>
    )
}