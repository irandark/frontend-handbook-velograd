"use client";

import { Scaling } from "lucide-react";
import { useSidebarStore } from "../model/store";

type ResizeButtonProps = {
    className?: string;
};

export function ResizeButton({ className }: ResizeButtonProps) {
    const { toggle } = useSidebarStore((state) => state);

    return (
        <div className={className} onClick={toggle}>
            <Scaling />
        </div>
    );
}
