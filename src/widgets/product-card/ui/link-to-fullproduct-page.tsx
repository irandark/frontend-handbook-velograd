import Link from "next/link";

interface LinkToFullProductPageProps {
    id: number;
    name?: string;
}

export const LinkToFullProductPage = ({
    id,
    name,
}: LinkToFullProductPageProps) => {
    return (
        <Link
            href={`/fullproduct/${id}`}
            className="text-xl text-center p-2 cursor-pointer hover:text-green-700"
        >
            {name}
        </Link>
    );
};
