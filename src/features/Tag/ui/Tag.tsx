import { ReactNode } from "react";

interface Tag {
    name: string;
    className?: string;
    onClick?: () => void;
    iconLucide?: ReactNode;
}

export function Tag({ name, className, onClick, iconLucide }: Tag) {
    return (
        <li onClick={onClick} className={className}>
            {iconLucide ? iconLucide : ""}
            <p>{name}</p>
        </li>
    );
}
