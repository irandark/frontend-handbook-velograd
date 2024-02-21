import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { productFormFields } from "../model/product-form-fields";
import {
    InputProductFormProps,
    ProductFormData,
} from "../types/product-form-types";
import { createProduct } from "../api/create-product";
import { accessoryFormFields } from "../model/accessory-form-fields";

export const AccessoryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>();

    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        createProduct(data);
    };

    const Input = ({
        title,
        label,
        register,
        required,
    }: InputProductFormProps) => (
        <div className="flex flex-col">
            <label className="mb-1">{title}</label>
            <input
                {...register(label, { required })}
                autoComplete="off"
                className="text-black w-48 rounded-md p-1 mb-2"
            />
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl text-center mt-10">Создание товара</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-10 p-10 bg-emerald-700 rounded-xl"
            >
                {accessoryFormFields.map(({ title, label, required }) => (
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
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 
                                cursor-pointer h-10 w-40 xl:col-span-5 
                                lg:col-span-3 md:col-span-2 justify-self-center mt-10"
                    type="submit"
                >
                    Создать акссесуар
                </button>
            </form>
        </div>
    );
};
