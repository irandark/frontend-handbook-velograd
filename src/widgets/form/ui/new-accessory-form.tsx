import { Path, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createProduct } from "../api/create-product";
import { accessoryFormFields } from "../model/accessory-form-fields";
import { useEffect, useState } from "react";
import { Dropzone } from "@/shared/ui/dropzone";
import { AccessoryFormData } from "../types/accessory-form-types";
import { SUBCATEGORY_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import axios from "@/shared/api/axios-config";
import { ErrorMessage } from "@hookform/error-message";
import { dynamicAccessoryFormFields } from "../model/dynamic-accessory-form-fields";
import {
    Product,
    Subcategory,
} from "@/widgets/product-card/types/product-types";

export const NewAccessoryForm = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<AccessoryFormData>();

    const { fields, append } = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const addFields = () => {
        append({
            article: "",
            color: "",
            frameSize: "",
            price: "",
        });
    };

    const onSubmit: SubmitHandler<AccessoryFormData> = (data) => {
        if (data.subcategoryIds.length === 0) {
            setError("subcategoryIds", {
                type: "required",
                message: "Выберите хотя бы одну подкатегорию",
            });
        } else {
            createProduct(data, imageUrl, SUBCATEGORY_CATEGORY_ID_IN_DATABASE);
        }
    };

    useEffect(() => {
        try {
            getSubcategoryies();
        } catch (error) {
            console.log("ошибка при получении подкатегорий", error);
        }
    }, []);

    const getSubcategoryies = async () => {
        const { data } = await axios.get(
            `subcategory/category/${SUBCATEGORY_CATEGORY_ID_IN_DATABASE}`
        );

        setSubcategories(data);
    };

    console.log(subcategories);

    return (
        <div>
            <h1 className="text-2xl text-center mt-10">Создание акссесуара</h1>
            <div className="flex flex-col w-fit h-fit p-3 rounded-xl bg-emerald-700 ml-4">
                <h3 className="text-xl text-center mb-5">Добавить фото</h3>
                <div className="flex gap-10">
                    <div className="flex flex-col w-40 h-40 overflow-hidden">
                        <p>Предпросмотр</p>
                        <img
                            src={imageUrl}
                            alt="фото"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <Dropzone setImageUrl={setImageUrl} />
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="bg-emerald-700 rounded-xl -mt-36 self-end mr-4">
                    <h3 className="text-xl text-center mb-5 mt-5">
                        Выберите категории
                    </h3>
                    <div className="flex p-2 gap-2 flex-wrap">
                        {subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                                <div
                                    key={subcategory.id}
                                    className={`p-2 bg-gray-800 flex min-w-[17%] gap-2 rounded-xl ${
                                        errors.subcategoryIds
                                            ? "bg-red-500 animate-shake"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        value={subcategory.id}
                                        {...register("subcategoryIds")}
                                    />
                                    <label htmlFor="">{subcategory.name}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="subcategoryIds"
                        render={({ message }) => (
                            <p className="text-red-500">{message}</p>
                        )}
                    />
                </div>
                <h2 className="text-2xl text-center mt-10">
                    Основные характеристики
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 p-10 bg-emerald-700 rounded-xl">
                    {accessoryFormFields.map(
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
                </div>

                <button
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 
                                cursor-pointer h-fit w-40 xl:col-span-5 
                                lg:col-span-3 md:col-span-2 justify-self-center mt-10"
                    type="submit"
                >
                    Создать акссесуар
                </button>

                <div className="flex flex-col">
                    <h2 className="text-xl text-center mb-5">
                        Добавление комплектации акссесуара
                    </h2>
                    {fields.map(({ id, ...field }, index) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mr-4 mb-2 ml-4 p-10 bg-emerald-700 rounded-xl"
                        >
                            {dynamicAccessoryFormFields.map(
                                ({ placeholder, label, required }) => (
                                    <input
                                        {...register(
                                            `dynamicFields[${index}].${label}` as Path<AccessoryFormData>
                                        )}
                                        autoComplete="off"
                                        placeholder={placeholder}
                                        className="text-black w-48 rounded-md p-1 mb-2"
                                        key={label}
                                        required={required}
                                    />
                                )
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFields}
                        className="bg-blue-700 p-2 rounded-xl hover:bg-blue-900 cursor-pointer w-1/2 self-center mt-5 mb-5"
                    >
                        Добавить комплектацию
                    </button>
                </div>
            </form>
        </div>
    );
};
