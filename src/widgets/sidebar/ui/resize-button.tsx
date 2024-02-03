"use client";

import { Scaling } from "lucide-react";
import { useSidebarStore } from "../model/store";

export function ResizeButton() {
    const { toggle } = useSidebarStore((state) => state);

    return (
        <div onClick={toggle}>
            <Scaling />
        </div>
    );
}
