import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createProduct } from "../api/create-product";
import { accessoryFormFields } from "../model/accessory-form-fields";
import { useEffect, useState } from "react";
import { AccessoryFormData } from "../types/accessory-form-types";
import { SUBCATEGORY_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import { FormDropzone } from "./form-dropzone";
import { FormSubcategories } from "./form-subcategories";
import { FormMainCharacteristics } from "./form-main-characteristics";
import { SubmitButton } from "./submit-button";
import { FormDynamicFields } from "./form-dynamic-fields";
import {
    appendAccessoryFields,
    dynamicAccessoryFormFields,
} from "../model/dynamic-accessory-form-fields";
import { useCategories } from "../hooks/useCategories";

export const NewAccessoryForm = () => {
    const [imageUrl, setImageUrl] = useState<string>("");

    const { subcategories } = useCategories(
        SUBCATEGORY_CATEGORY_ID_IN_DATABASE
    );

    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<AccessoryFormData>({
        defaultValues: {
            subcategoryIds: [],
            dynamicFields: [
                {
                    article: "",
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
                    formFields={accessoryFormFields}
                />
                <SubmitButton title="Создать аксессуар" className="ml-4" />
                <FormDynamicFields
                    errors={errors}
                    register={register}
                    fields={fields}
                    dynamicFormFields={dynamicAccessoryFormFields}
                    append={append}
                    appendFields={appendAccessoryFields}
                />
            </form>
        </div>
    );
};
