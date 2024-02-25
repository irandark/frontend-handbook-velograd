import { Path, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { productFormFields } from "../model/product-form-fields";
import { ProductFormData } from "../types/product-form-types";
import { createProduct } from "../api/create-product";
import { dynamicProductFormFields } from "../model/dynamic-product-form-fields";
import { Dropzone } from "@/shared/ui/dropzone";
import { useEffect, useState } from "react";
import axios from "@/shared/api/axios-config";

interface Subcategory {
    id: number;
    name: string;
}

let renderCount = 0;
const BIKE_CATEGORY_ID_IN_DATABASE = 1;

export const ProductForm = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductFormData>({});

    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        createProduct(data, imageUrl, BIKE_CATEGORY_ID_IN_DATABASE);
    };

    renderCount++;

    const { fields, append } = useFieldArray({
        control,
        name: "dynamicFields",
    });

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

    console.log(imageUrl);

    return (
        <div>
            <p>render count: {renderCount}</p>
            <h1 className="text-2xl text-center mt-10 mb-10">
                Создание велосипеда
            </h1>
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
                <div className="bg-emerald-700 rounded-xl self-end mr-4 -mt-36 w-1/2">
                    <h3 className="text-xl text-center mb-5 mt-5">
                        Выберите категории
                    </h3>
                    <div className="flex p-2 gap-2 flex-wrap">
                        {subcategories.map((subcategory) => (
                            <div
                                key={subcategory.id}
                                className="p-2 bg-gray-800 flex min-w-[17%] gap-2 rounded-xl"
                            >
                                <input
                                    type="checkbox"
                                    value={subcategory.id}
                                    {...register("subcategoryIds")}
                                />
                                <label htmlFor="">{subcategory.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <h3 className="text-xl text-center mb-5 mt-5">
                    Основные характеристики
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 p-10 bg-emerald-700 rounded-xl">
                    {productFormFields.map(
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
                <div className="flex flex-col">
                    <button
                        className="bg-red-700 p-2 rounded-xl hover:bg-red-900 
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
                    {fields.map(({ id, ...field }, index) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mr-4 mb-2 ml-4 p-10 bg-emerald-700 rounded-xl"
                        >
                            {dynamicProductFormFields.map(
                                ({ placeholder, label, required }) => (
                                    <input
                                        {...register(
                                            `dynamicFields[${index}].${label}` as Path<ProductFormData>
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
