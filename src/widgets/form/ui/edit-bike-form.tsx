import {
    Path,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { bikeFormFields } from "../model/bike-form-fields";
import { dynamicBikeFormFields } from "../model/dynamic-bike-form-fields";
import { Dropzone } from "@/shared/ui/dropzone";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import axios from "@/shared/api/axios-config";
import { BIKE_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import {
    Product,
    Subcategory,
} from "@/widgets/product-card/types/product-types";
import { BikeFormData } from "../types/bike-form-types";
import { updateBike } from "../api/update-bike";
import { DeleteProduct } from "./delete-modal";
import { Modal, useModal } from "@/shared/ui/modal";

export const EditBikeForm = ({
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
        control,
        formState: { errors },
        setError,
    } = useForm<BikeFormData>({
        defaultValues: {
            subcategoryIds: [],
            dynamicFields: currentProduct.productVariants.map((variant) => {
                return {
                    article: variant.article,
                    wheelDiameter: variant.wheelDiameter,
                    color: variant.color,
                    frameSize: variant.frameSize,
                    price: String(variant.price),
                };
            }),
            name: currentProduct.name,
            forkName: currentProduct.forkName,
            brand: currentProduct.brand,
            frameMaterial: currentProduct.frameMaterial,
            modelYear: currentProduct.modelYear,
            forkType: currentProduct.forkType,
            numberOfSpeeds: currentProduct.numberOfSpeeds,
            rearDerailleur: currentProduct.rearDerailleur,
            frontDerailleur: currentProduct.frontDerailleur,
            shifters: currentProduct.shifters,
            system: currentProduct.system,
            cassette: currentProduct.cassette,
            brakeType: currentProduct.brakeType,
            brakeName: currentProduct.brakeName,
            weight: currentProduct.weight,
            features: currentProduct.features,
        },
    });

    const { fields, append, remove } = useFieldArray({
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
            updateBike(data, imageUrl, currentProduct.id);
        }
    };

    const getSubcategoryies = async () => {
        const { data } = await axios.get(
            `subcategory/category/${BIKE_CATEGORY_ID_IN_DATABASE}`
        );

        setSubcategories(data);
    };

    useEffect(() => {
        setImageUrl(currentProduct.imageUrl ? currentProduct.imageUrl : "");

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
        register: UseFormRegister<BikeFormData>
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
                    Редактирование велосипеда {currentProduct.name}
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
                <div className="bg-emerald-700 rounded-xl self-end mr-4 -mt-36 w-1/2">
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
                <h3 className="text-xl text-center mb-5 mt-5">
                    Основные характеристики
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 p-10 bg-emerald-700 rounded-xl">
                    {bikeFormFields.map(({ placeholder, label, required }) => (
                        <div key={placeholder} className="flex flex-col">
                            <label htmlFor={label}>{placeholder}</label>
                            <input
                                {...register(label, { required })}
                                autoComplete="off"
                                placeholder={placeholder}
                                className="text-black w-48 rounded-md p-1 mb-2"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <button
                        className="bg-orange-700 p-2 rounded-xl hover:bg-orange-900 
                                cursor-pointer h-10 w-1/6 self-start ml-4"
                        type="submit"
                    >
                        Сохранить
                    </button>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl text-center mb-5">
                        Добавление комплектации велосипеда
                    </h2>

                    {fields.map(({ id, ...field }, index) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mr-4 mb-2 ml-4 p-10 bg-emerald-700 rounded-xl"
                        >
                            {dynamicBikeFormFields.map(
                                ({ placeholder, label, required }) => (
                                    <div key={label} className="flex flex-col">
                                        <label htmlFor={label}>
                                            {placeholder}
                                        </label>
                                        <input
                                            {...register(
                                                `dynamicFields[${index}].${label}` as Path<BikeFormData>
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
                            <button
                                className="bg-red-700 p-2 rounded-xl hover:bg-red-900"
                                onClick={() => remove(index)}
                            >
                                удалить
                            </button>
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
