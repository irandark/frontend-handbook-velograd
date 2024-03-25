import { Path, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SubcategoryFormData } from "../types/subcategory-form-types";
import { useEffect, useState } from "react";
import { Tag } from "@/shared/ui/tag";
import { updateSubcategory } from "../api/update-subcategory";
import { deleteSubcategory } from "../api/delete-subcategory";
import { useCategories } from "../hooks/useCategories";
import { SubmitButton } from "./submit-button";

import { Toaster, toast } from "sonner";
import { AxiosError } from "axios";

export const EditSubcategoryForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<SubcategoryFormData>({
        defaultValues: {
            dynamicFields: [],
        },
    });

    const selectedCategory = watch("category");
    const { subcategories, getSubcategories } = useCategories(
        selectedCategory ? +selectedCategory : 1
    );
    const [activeSubcategoryId, setActiveSubcategoryId] = useState<number>(-1);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "dynamicFields",
    });
    const [isVisibleSubmitButton, setIsVisibleSubmitButton] = useState(false);

    const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => {
        updateSubcategory(data);
        getSubcategories();

        toast.success("Категория обновлена");

        reset();
    };

    useEffect(() => {
        setActiveSubcategoryId(-1);
        remove(0);
        setIsVisibleSubmitButton(false);
    }, [selectedCategory]);

    const handlerDeleteSubcategory = async (id: number) => {
        try {
            await deleteSubcategory(id);
            toast.success("Категория удалена");
            getSubcategories();
            reset();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.warning(error.response?.data.message);
            }
        }
    };

    const handlerOnclickTag = (id: number) => {
        setIsVisibleSubmitButton(true);
        remove(0);
        setActiveSubcategoryId(id);
        append({
            name: "",
            subcategoryId: id,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col items-center gap-2 p-10 rounded-xl w-2/4 m-auto mt-32 ${
                errors.dynamicFields
                    ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                    : "form-bg"
            }`}
        >
            {errors.dynamicFields && (
                <p className="text-rose-400 opacity-70 text-center mt-2 mb-2">
                    Название категории не должно быть пустым
                </p>
            )}

            <div className="flex flex-col mt-5">
                <label htmlFor="">Выберите категорию</label>
                <select
                    id="1"
                    className="text-black w-48 rounded-md p-1 mb-2"
                    {...register("category")}
                >
                    <option value="1">Велосипеды</option>
                    <option value="2">Акссесуары</option>
                </select>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
                {subcategories.map(({ id, name }) => {
                    return (
                        <Tag
                            key={id}
                            title={name}
                            className={`p-2 rounded-xl cursor-pointer border ${
                                activeSubcategoryId === id
                                    ? "bg-neutral-800 border-amber-600"
                                    : "bg-neutral-700 border-neutral-500  hover:opacity-70"
                            }`}
                            onClick={() => handlerOnclickTag(id)}
                        />
                    );
                })}
            </div>

            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex w-full justify-center gap-2"
                >
                    <input
                        {...register(
                            `dynamicFields.${index}.name` as Path<SubcategoryFormData>,
                            {
                                required: true,
                            }
                        )}
                        placeholder="Новое название"
                        className="text-black w-48 rounded-md p-1 mb-2"
                        autoComplete="off"
                    />
                    <div
                        className="bg-gradient-to-r from-rose-500 to-red-700 p-2 rounded-xl 
                        hover:opacity-70 transition cursor-pointer h-8 w-fit
                        flex justify-center items-center"
                        onClick={() =>
                            handlerDeleteSubcategory(field.subcategoryId)
                        }
                    >
                        <p>Удалить категорию</p>
                    </div>
                </div>
            ))}
            {isVisibleSubmitButton && (
                <SubmitButton title="Сохранить" className="mt-10" />
            )}
        </form>
    );
};
