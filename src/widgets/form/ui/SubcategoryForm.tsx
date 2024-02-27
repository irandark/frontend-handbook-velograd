import { SubmitHandler, useForm } from "react-hook-form";
import { SubcategoryFormData } from "../types/subcategory-form-types";
import { subcategoryFormFields } from "../model/subcategory-form-fields";
import { createSubcategory } from "../api/create-subcategory";

export const SubcategoryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubcategoryFormData>();

    const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => {
        createSubcategory(data);
    };

    return (
        <div>
            <h1 className="text-2xl text-center mt-10 mb-10">
                Создание категории
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-2 p-10 bg-emerald-700 rounded-xl w-2/4 m-auto"
            >
                {subcategoryFormFields.map(
                    ({ placeholder, label, required }) => (
                        <div key={placeholder}>
                            <input
                                {...register(label, { required })}
                                autoComplete="off"
                                placeholder={placeholder}
                                className="text-black w-48 rounded-md p-1 mb-2"
                            />
                        </div>
                    )
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

                <button
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 cursor-pointer h-fit w-fit mt-10"
                    type="submit"
                >
                    Создать категорию
                </button>
            </form>
        </div>
    );
};
