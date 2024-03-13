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
        <div>
            <h1 className="text-2xl text-center mt-10 mb-10">
                Редактирование категории
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-2 p-10 bg-emerald-700 rounded-xl w-2/4 m-auto"
            >
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
                <div className="flex gap-2">
                    {subcategories.map(({ id, name }) => {
                        return (
                            <Tag
                                key={id}
                                title={name}
                                className={`p-2 bg-amber-700 rounded-xl cursor-pointer ${
                                    activeSubcategoryId === id
                                        ? "bg-amber-900"
                                        : ""
                                }`}
                                onClick={() => handlerOnclickTag(id)}
                            />
                        );
                    })}
                </div>

                {fields.map((field, index) => (
                    <div key={field.id}>
                        <input
                            {...register(
                                `dynamicFields.${index}.name` as Path<SubcategoryFormData>
                            )}
                            placeholder="Новое название"
                            className="text-black w-48 rounded-md p-1 mb-2"
                            required
                            autoComplete="off"
                        />
                        <div
                            className="bg-red-700 p-2 rounded-xl hover:bg-red-900 cursor-pointer h-fit w-fit mt-10"
                            onClick={() =>
                                handlerDeleteSubcategory(field.subcategoryId)
                            }
                        >
                            Удалить категорию
                        </div>
                    </div>
                ))}

                <button
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 h-fit w-fit mt-10"
                    type="submit"
                >
                    Сохранить категорию
                </button>
            </form>
        </div>
    );
};
