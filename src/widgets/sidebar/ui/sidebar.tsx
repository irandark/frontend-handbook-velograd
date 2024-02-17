"use client";

import Link from "next/link";
import { ResizeButton } from "./resize-button";
import { useSidebarStore } from "../model/store";
import { dynamicCategories, staticCategories } from "../model/categories";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const { isResized } = useSidebarStore((state) => state);

    return (
        <div className={`${isResized ? "w-[14vw]" : "w-[3vw]"} ${className}`}>
            <div className="mt-3"></div>
            {dynamicCategories.map(({ id, title, icon }) => (
                <Link
                    href={`/products/${id}`}
                    className="flex mt-4 p-2 gap-2 cursor-pointer hover:bg-gray-700 rounded-xl"
                    key={id}
                >
                    <div>{icon}</div>
                    {isResized && <div>{title}</div>}
                </Link>
            ))}
            {staticCategories.map(({ id, title, icon, link }) => (
                <Link
                    href={link}
                    className="flex mt-4 p-2 gap-2 cursor-pointer hover:bg-gray-700 rounded-xl"
                    key={id}
                >
                    <div>{icon}</div>
                    {isResized && <div>{title}</div>}
                </Link>
            ))}
            <div>
                <ResizeButton
                    className={`${
                        isResized ? "right-1" : "right-2"
                    } absolute bottom-2 cursor-pointer hover:bg-gray-700 p-2 rounded-xl`}
                />
            </div>
        </div>
    );
}
