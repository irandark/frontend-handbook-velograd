import {
    Path,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
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
import { Modal, useModal } from "@/shared/ui/modal";
import { DeleteProduct } from "./delete-modal";
import { updateAccessory } from "../api/update-accessory";

export const EditAccessoryForm = ({
    currentProduct,
}: {
    currentProduct: Product;
}) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const { isOpen, openModal, closeModal } = useModal();
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<AccessoryFormData>({
        defaultValues: {
            subcategoryIds: [],
            dynamicFields: currentProduct.productVariants.map((variant) => {
                return {
                    article: variant.article,
                    wheelDiameter: variant.wheelDiameter,
                    color: variant.color,
                    price: String(variant.price),
                };
            }),
            name: currentProduct.name,
            brand: currentProduct.brand,
            features: currentProduct.features,
        },
    });

    const { fields, append, remove } = useFieldArray({
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
            updateAccessory(data, imageUrl, currentProduct.id);
        }
    };

    useEffect(() => {
        setImageUrl(currentProduct.imageUrl ? currentProduct.imageUrl : "");

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

    const isChecked = (id: number): boolean => {
        if (currentProduct.subcategories)
            for (const subcategory of currentProduct.subcategories) {
                if (subcategory.id === id) {
                    return true;
                }
            }
        return false;
    };

    const checkboxInput = (
        subcategoryId: number,
        subcategoryName: string,
        register: UseFormRegister<AccessoryFormData>
    ) => {
        const isCheked = isChecked(subcategoryId);

        return (
            <div
                className={`p-2 bg-gray-800 flex min-w-[17%] gap-2 rounded-xl ${
                    errors.subcategoryIds ? "bg-red-500 animate-shake" : ""
                }`}
            >
                <input
                    type="checkbox"
                    defaultChecked={isCheked}
                    value={subcategoryId}
                    {...register("subcategoryIds")}
                />
                <label htmlFor="">{subcategoryName}</label>
            </div>
        );
    };

    return (
        <div>
            <div className="flex">
                <button
                    onClick={openModal}
                    className="font-bold text-xl bg-rose-500 hover:bg-rose-700 w-40 h-14 m-4 rounded-xl"
                >
                    УДАЛИТЬ
                </button>
                <h1 className="text-2xl text-center mt-10 mb-10 w-full">
                    Редактирование акссесуара {currentProduct.name}
                </h1>
                <Modal isOpen={isOpen}>
                    <DeleteProduct
                        deletedProductId={currentProduct.id}
                        closeModal={closeModal}
                    />
                </Modal>
            </div>
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
                                {checkboxInput(
                                    subcategory.id,
                                    subcategory.name,
                                    register
                                )}
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
                            <div key={placeholder} className="flex flex-col">
                                <label htmlFor={label}>{placeholder}</label>
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
                                cursor-pointer h-fit w-fit xl:col-span-5 
                                lg:col-span-3 md:col-span-2 justify-self-center mt-10"
                    type="submit"
                >
                    Сохранить
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
                                    <div
                                        key={placeholder}
                                        className="flex flex-col"
                                    >
                                        <label htmlFor={label}>
                                            {placeholder}
                                        </label>
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
                                    </div>
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
