interface Tag {
    name: string;
    className?: string;
    onClick?: () => void;
}

export function Tag({ name, className, onClick }: Tag) {
    return (
        <li onClick={onClick} className={className}>
            {name}
        </li>
    );
}
