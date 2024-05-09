"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string
}

export function ListContainer({data , boardId}: ListContainerProps) {
    const [orderedData , setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    } , [data]);
    
    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list , i) => {
                return(
                    <ListItem 
                        key={list.id}
                        index={i}
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div  className="flex-shrink-0 w-1"/>
        </ol>
    )
}