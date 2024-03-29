import { Tag } from "@/shared/ui/tag";
import { useSelectSubcategoryStore } from "../model/store";
import { useEffect } from "react";

export const SelectSubcategory = ({ categoryId }: { categoryId: number }) => {
    const {
        activeSubcategoryId,
        getSubcategories,
        subcategories,
        setActiveSubcategoryId,
    } = useSelectSubcategoryStore();

    useEffect(() => {
        getSubcategories(categoryId);
    }, []);

    return (
        <nav>
            <ul className="flex flex-wrap p-2 gap-1">
                {subcategories.map(({ id, name }) => (
                    <Tag
                        onClick={() => setActiveSubcategoryId(id)}
                        className={`p-2 cursor-pointer hover:bg-gradient-to-r hover:from-neutral-700 hover:to-neutral-800 rounded-xl + ${
                            activeSubcategoryId === id
                                ? "shadow-md shadow-amber-500 text-amber-300 font-bold"
                                : ""
                        }`}
                        key={id}
                        title={name}
                    />
                ))}
            </ul>
        </nav>
    );
};
