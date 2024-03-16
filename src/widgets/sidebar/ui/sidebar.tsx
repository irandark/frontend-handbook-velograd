"use client";

import Link from "next/link";
import { ResizeButton } from "./resize-button";
import { useSidebarStore } from "../model/store";
import { dynamicCategories, staticCategories } from "../model/categories";
import { useEffect, useState } from "react";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const { isResized } = useSidebarStore((state) => state);
    const [isEndAnimationResized, setIsEndAnimationResized] = useState(false);

    useEffect(() => {
        if (isResized) {
            setTimeout(() => {
                setIsEndAnimationResized(true);
            }, 200);
        }
        setIsEndAnimationResized(false);
    }, [isResized]);

    return (
        <div className={`${isResized ? "w-[14vw]" : "w-[3vw]"} ${className}`}>
            <div className="mt-3"></div>
            {dynamicCategories.map(({ id, title, icon }) => (
                <Link
                    href={`/products/${id}`}
                    className="flex mt-4 p-2 gap-2 cursor-pointer hover:bg-zinc-800 hover:shadow-sky-500 rounded-xl shadow-sm hover:animate-pulse"
                    key={id}
                >
                    <div>{icon}</div>
                    <span>{isEndAnimationResized && title}</span>
                </Link>
            ))}
            {staticCategories.map(({ id, title, icon, link }) => (
                <Link
                    href={link}
                    className="flex mt-4 p-2 gap-2 cursor-pointer hover:bg-zinc-800 
                    rounded-xl shadow-sm hover:shadow-sky-500 hover:animate-pulse"
                    key={id}
                >
                    <div>{icon}</div>

                    <span>{isEndAnimationResized && title}</span>
                </Link>
            ))}
            <div>
                <ResizeButton
                    className={`${
                        isResized ? "right-1" : "right-2"
                    } absolute bottom-2 cursor-pointer hover:bg-zinc-800 p-2 rounded-xl shadow-sm`}
                />
            </div>
        </div>
    );
}
