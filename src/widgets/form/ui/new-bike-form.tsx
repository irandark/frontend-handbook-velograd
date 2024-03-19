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
import { FormDropzone } from "./form-dropzone";
import { FormSubcategories } from "./form-subcategories";
import { FormMainCharacteristics } from "./form-main-characteristics";
import { FormDynamicFields } from "./form-dynamic-fields";
import { SubmitButton } from "./submit-button";

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

    return (
        <div>
            <FormDropzone imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <FormSubcategories
                    subcategories={subcategories}
                    register={register}
                    errors={errors}
                />
                <FormMainCharacteristics
                    errors={errors}
                    register={register}
                    bikeFormFields={bikeFormFields}
                />
                <SubmitButton />
                <FormDynamicFields
                    errors={errors}
                    register={register}
                    fields={fields}
                    dynamicBikeFormFields={dynamicBikeFormFields}
                    append={append}
                />
            </form>
        </div>
    );
};
