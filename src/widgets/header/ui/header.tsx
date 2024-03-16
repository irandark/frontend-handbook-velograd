import { LogOut } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    return (
        <div className={className}>
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold text-transparent 
                    bg-gradient-to-r from-sky-500 
                    to-amber-500 bg-clip-text"
                >
                    Справочник Велоград
                </Link>
                <div className="flex items-center gap-2">
                    <div>Алексей</div>
                    <LogOut />
                </div>
            </div>
        </div>
    );
}
