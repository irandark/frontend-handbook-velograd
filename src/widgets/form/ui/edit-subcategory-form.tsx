import { Path, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SubcategoryFormData } from "../types/subcategory-form-types";
import { subcategoryFormFields } from "../model/subcategory-form-fields";
import { createSubcategory } from "../api/create-subcategory";
import { useEffect, useState } from "react";
import { Subcategory } from "@/widgets/product-card/types/product-types";
import axios from "@/shared/api/axios-config";
import { Tag } from "@/shared/ui/tag";
import { SelectSubcategory } from "@/features/select-subcategory";
import { useSelectSubcategoryStore } from "@/features/select-subcategory/model/store";
import { updateSubcategory } from "../api/update-subcategory";
import { deleteSubcategory } from "../api/delete-subcategory";

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
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [activeSubcategoryId, setActiveSubcategoryId] = useState<number>(0);

    const selectedCategory = watch("category");

    const { fields, append, remove } = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => {
        updateSubcategory(data);
        getSubcategories();
        reset();
    };

    const getSubcategories = async () => {
        const { data } = await axios.get<Subcategory[]>(
            `subcategory/category/${selectedCategory ? +selectedCategory : 1}`
        );
        setSubcategories(data);
    };

    useEffect(() => {
        try {
            getSubcategories();
            setActiveSubcategoryId(0);
            remove(0);
        } catch (error) {
            console.log(error);
        }
    }, [selectedCategory]);

    const handlerOnclickTag = (id: number) => {
        remove(0);
        setActiveSubcategoryId(id);
        append({
            name: "",
            subcategoryId: id,
        });
    };

    const handlerDeleteSubcategory = async (id: number) => {
        deleteSubcategory(id);
        reset();
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

            <button
                className="bg-gradient-to-r from-amber-700 to-amber-600 p-2 
                                rounded-xl hover:opacity-70 transition
                                cursor-pointer h-10 w-fit self-center mt-10"
                type="submit"
            >
                Сохранить категорию
            </button>
        </form>
    );
};
