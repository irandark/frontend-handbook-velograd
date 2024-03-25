import { SubmitHandler, useForm } from "react-hook-form";
import { SubcategoryFormData } from "../types/subcategory-form-types";
import { createSubcategory } from "../api/create-subcategory";
import { SubmitButton } from "./submit-button";
import { toast } from "sonner";

export const NewSubcategoryForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SubcategoryFormData>();

    const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => {
        createSubcategory(data);

        toast.success("Категория создана");
        reset();
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`flex flex-col items-center gap-2 p-10 rounded-xl w-2/4 m-auto mt-32 ${
                    errors.name
                        ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                        : "form-bg"
                }`}
            >
                {errors.name && (
                    <p className="text-rose-400 opacity-70 text-center mt-2 mb-2">
                        Название категории не должно быть пустым
                    </p>
                )}
                <div>
                    <input
                        {...register("name", { required: true })}
                        autoComplete="off"
                        placeholder={"Название категории"}
                        className="text-black w-48 rounded-md p-1 mb-2"
                    />
                </div>

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

                <SubmitButton title={"Создать категорию"} />
            </form>
        </div>
    );
};
