"use client";

import Link from "next/link";
import { categories } from "../model/categories";
import { ResizeButton } from "./resize-button";
import { useSidebarStore } from "../model/store";

export function Sidebar() {
    const { isResized } = useSidebarStore((state) => state);

    return (
        <div
            className={`${
                isResized ? "w-[14vw]" : "w-[3vw]"
            } relative bg-gray-800 p-2 h-[90vh] mt-2 flex justify-start flex-col gap-5 rounded-md`}
        >
            <div className="mt-3"></div>
            {categories.map(({ id, title, icon, link }) => (
                <Link
                    href={link}
                    className="flex p-2 gap-2 cursor-pointer hover:bg-gray-700 rounded-xl"
                    key={id}
                >
                    <div>{icon}</div>
                    {isResized && <div>{title}</div>}
                </Link>
            ))}
            <div
                className={`${
                    isResized ? "right-1" : "right-4"
                } absolute top-2 cursor-pointer`}
            >
                <ResizeButton />
            </div>
        </div>
    );
}
