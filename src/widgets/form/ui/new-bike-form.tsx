import { Path, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createProduct } from "../api/create-product";
import { dynamicBikeFormFields } from "../model/dynamic-bike-form-fields";
import { Dropzone } from "@/shared/ui/dropzone";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import axios from "@/shared/api/axios-config";
import { BIKE_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import { Subcategory } from "@/widgets/product-card/types/product-types";
import { BikeFormData } from "../types/bike-form-types";
import { bikeFormFields } from "../model/bike-form-fields";

export const NewBikeForm = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<BikeFormData>({
        defaultValues: {
            subcategoryIds: [],
            dynamicFields: [
                {
                    article: "",
                    wheelDiameter: "",
                    color: "",
                    frameSize: "",
                    price: "",
                },
            ],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const onSubmit: SubmitHandler<BikeFormData> = (data) => {
        if (data.subcategoryIds.length === 0) {
            setError("subcategoryIds", {
                type: "required",
                message: "Выберите хотя бы одну подкатегорию",
            });
        } else {
            createProduct(data, imageUrl, BIKE_CATEGORY_ID_IN_DATABASE);
        }
    };

    const getSubcategoryies = async () => {
        const { data } = await axios.get(
            `subcategory/category/${BIKE_CATEGORY_ID_IN_DATABASE}`
        );

        setSubcategories(data);
    };

    useEffect(() => {
        try {
            getSubcategoryies();
        } catch (error) {
            console.log("ошибка при получении подкатегорий", error);
        }
    }, []);

    const addFields = () => {
        append({
            article: "",
            wheelDiameter: "",
            color: "",
            frameSize: "",
            price: "",
        });
    };

    console.log(errors);

    return (
        <div>
            <div
                className={`flex flex-col w-fit h-fit p-3  rounded-xl  ml-4 mt-20 ${
                    imageUrl !== ""
                        ? "shadow-md shadow-sky-600 bg-neutral-800"
                        : "form-bg"
                }`}
            >
                <h3 className="text-xl text-center mb-5">Добавить фото</h3>
                <div className="flex gap-10">
                    <div className="flex flex-col w-40 h-40 overflow-hidden">
                        <p className="text-center">Предпросмотр</p>
                        <img
                            src={imageUrl}
                            alt="нет фото"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <Dropzone setImageUrl={setImageUrl} />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div
                    className={`rounded-xl self-end mr-4 -mt-36 w-1/2  ${
                        errors.subcategoryIds
                            ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                            : "form-bg"
                    }`}
                >
                    <h3 className="text-xl text-center mb-5 mt-5">
                        Выберите категории
                    </h3>
                    <div className={`flex p-2 gap-2 flex-wrap justify-center `}>
                        {subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                                <div
                                    className={`p-2 bg-neutral-700 flex min-w-[17%] gap-2 rounded-xl ${
                                        errors.subcategoryIds
                                            ? "bg-gradient-to-r from-rose-500 to-red-400"
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
                            <p className="text-rose-400 opacity-70 text-center mt-2 mb-2">
                                {message}
                            </p>
                        )}
                    />
                </div>
                <h3 className="text-xl text-center mb-5 mt-20">
                    Основные характеристики
                </h3>
                {errors.name && (
                    <p className="text-rose-400 opacity-70 text-center mt-2 mb-2">
                        Поле "Название товара" не должно быть пустым
                    </p>
                )}
                <div
                    className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 p-10 rounded-xl ${
                        errors.name
                            ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                            : "form-bg "
                    }`}
                >
                    {bikeFormFields.map(({ placeholder, label, required }) => (
                        <div key={placeholder}>
                            <input
                                {...register(label, { required })}
                                autoComplete="off"
                                placeholder={placeholder}
                                className={`text-black w-48 rounded-md p-1 mb-2`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <button
                        className="bg-gradient-to-r from-amber-700 to-amber-600 p-2 
                                rounded-xl hover:opacity-70 transition
                                cursor-pointer h-10 w-1/6 self-start ml-4"
                        type="submit"
                    >
                        Создать товар
                    </button>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl text-center mb-5">
                        Добавление комплектации велосипеда
                    </h2>
                    {errors.dynamicFields && (
                        <p className="text-rose-400 opacity-70 text-center mt-2 mb-5">
                            Поле "Артикул" не должно быть пустым
                        </p>
                    )}
                    {fields.map(({ id, ...field }, index) => (
                        <div
                            key={id}
                            className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
                            mr-4 mb-2 ml-4 p-10 rounded-xl ${
                                errors.dynamicFields
                                    ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                                    : "form-bg"
                            }`}
                        >
                            {dynamicBikeFormFields.map(
                                ({ placeholder, label, required }) => (
                                    <input
                                        {...register(
                                            `dynamicFields[${index}].${label}` as Path<BikeFormData>,
                                            {
                                                required,
                                            }
                                        )}
                                        autoComplete="off"
                                        placeholder={placeholder}
                                        className={`text-black w-48 rounded-md p-1 mb-2 animate-fade-in`}
                                        key={label}
                                    />
                                )
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addFields}
                    className="bg-gradient-to-r from-sky-700 to-sky-400 p-2 rounded-xl hover:opacity-70 transition cursor-pointer w-1/2 self-center mt-5 mb-20"
                >
                    Добавить комплектацию
                </button>
            </form>
        </div>
    );
};
