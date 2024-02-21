import { SubmitHandler, useForm } from "react-hook-form";
import {
    InputSubcategoryFormProps,
    SubcategoryFormData,
} from "../types/subcategory-form-types";
import { subcategoryFormFields } from "../model/subcategory-form-fields";

export const SubcategoryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubcategoryFormData>();

    const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => {
        console.log(data);
    };

    const Input = ({
        title,
        label,
        register,
        required,
    }: InputSubcategoryFormProps) => (
        <div className="flex flex-col">
            <label>{title}</label>
            <input
                {...register(label, { required })}
                autoComplete="off"
                className="text-black w-60 rounded-md p-1"
            />
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl text-center mt-10 mb-10">
                Создание категории
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-2 p-10 bg-emerald-700 rounded-xl w-2/4 m-auto"
            >
                {subcategoryFormFields.map(({ title, label, required }) => (
                    <div key={title}>
                        <Input
                            title={title}
                            label={label}
                            register={register}
                            required={required}
                        />
                        {errors[label] && (
                            <span className="text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>
                ))}
                <button
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 cursor-pointer h-10 w-40 mt-10"
                    type="submit"
                >
                    Создать категорию
                </button>
            </form>
        </div>
    );
};
