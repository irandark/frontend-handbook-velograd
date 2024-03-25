import {
    FieldValues,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { createProduct } from "../api/create-product";
import {
    appendBikeFields,
    dynamicBikeFormFields,
} from "../model/dynamic-bike-form-fields";
import { useEffect, useState } from "react";
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
import { useCategories } from "../hooks/useCategories";
import { toast } from "sonner";

export const NewBikeForm = () => {
    const [imageUrl, setImageUrl] = useState<string>("");

    const { subcategories } = useCategories(BIKE_CATEGORY_ID_IN_DATABASE);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
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
            createProduct(data, imageUrl, BIKE_CATEGORY_ID_IN_DATABASE);
            toast.success("Велосипед создан");
            reset();
            setImageUrl("");
        }
    };

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
                    formFields={bikeFormFields}
                />
                <SubmitButton title="Создать велосипед" className="ml-4" />
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
