import {
    Path,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { bikeFormFields } from "../model/bike-form-fields";
import {
    appendBikeFields,
    dynamicBikeFormFields,
} from "../model/dynamic-bike-form-fields";
import { useEffect, useState } from "react";
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
import { FormDropzone } from "./form-dropzone";
import { FormCheckboxInput } from "./form-checkbox-input";
import { SubmitButton } from "./submit-button";
import { FormMainCharacteristics } from "./form-main-characteristics";
import { FormDynamicFields } from "./form-dynamic-fields";

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

    return (
        <div>
            <div className="flex">
                <button
                    onClick={openModal}
                    className="font-bold bg-gradient-to-r from-rose-500
                     to-red-700 p-3 mt-2 ml-4 rounded-xl
                    hover:opacity-70 transition cursor-pointer h-fit w-52"
                >
                    Удалить велосипед
                </button>
                <h1 className="text-2xl text-center mt-10 mb-10 w-full">
                    Редактирование велосипеда {currentProduct.name}
                </h1>
                <Modal
                    isOpen={isOpen}
                    className={`fixed top-0 right-0 w-screen h-screen bg-neutral-800 opacity-80 z-10 flex justify-center items-center`}
                >
                    <DeleteProduct
                        deletedProductId={currentProduct.id}
                        closeModal={closeModal}
                    />
                </Modal>
            </div>
            <FormDropzone imageUrl={imageUrl} setImageUrl={setImageUrl} />

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
                    <div className={`flex p-2 gap-2 flex-wrap justify-center`}>
                        {subcategories.map((subcategory) => (
                            <div>
                                <FormCheckboxInput
                                    errors={errors}
                                    register={register}
                                    subcategoryId={subcategory.id}
                                    subcategoryName={subcategory.name}
                                    currentProduct={currentProduct}
                                />
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
                <FormMainCharacteristics
                    errors={errors}
                    register={register}
                    formFields={bikeFormFields}
                    isLabel={true}
                />
                <SubmitButton title="Сохранить" className="ml-4" />
                <FormDynamicFields
                    errors={errors}
                    register={register}
                    fields={fields}
                    dynamicFormFields={dynamicBikeFormFields}
                    append={append}
                    appendFields={appendBikeFields}
                    remove={remove}
                />
            </form>
        </div>
    );
};
