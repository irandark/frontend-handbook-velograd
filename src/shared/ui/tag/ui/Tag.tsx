import { ReactNode } from "react";

interface Tag {
    title: string;
    className?: string;
    onClick?: () => void;
    iconLucide?: ReactNode;
}

export function Tag({ title, className, onClick, iconLucide }: Tag) {
    return (
        <div onClick={onClick} className={className}>
            {iconLucide ? iconLucide : ""}
            <p>{title}</p>
        </div>
    );
}
