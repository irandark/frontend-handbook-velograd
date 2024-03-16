import { CircleFadingPlus } from "lucide-react";
import { activeFormConfig } from "../model/active-form-config";
import { useActiveFormStore } from "../model/store";
import { Tag } from "@/shared/ui/tag";

export const SelectForm = () => {
    const { activeFormId, setActiveFormById } = useActiveFormStore();

    return (
        <div>
            <h1 className="text-2xl text-center mt-2">
                Добавление товара / категорий
            </h1>
            <div className="flex justify-around mt-10">
                {activeFormConfig.map(({ id, title }) => (
                    <Tag
                        onClick={() => setActiveFormById(id)}
                        key={id}
                        className={`flex  gap-2 p-2 cursor-pointer hover:bg-gradient-to-r hover:from-neutral-700 hover:to-neutral-800 rounded-xl + ${
                            activeFormId === id
                                ? "shadow-md shadow-sky-500 font-bold text-sky-300"
                                : ""
                        }`}
                        iconLucide={<CircleFadingPlus />}
                        title={title}
                    />
                ))}
            </div>
        </div>
    );
};
