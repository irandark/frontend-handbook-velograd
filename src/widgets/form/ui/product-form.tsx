import { Subcategory } from "@/widgets/product-card/types/product-types";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createProduct } from "../api/create-product";
import axios from "@/shared/api/axios-config";
import { FormDropzone } from "./form-dropzone";
import { FormSubcategories } from "./form-subcategories";
import { FormMainCharacteristics } from "./form-main-characteristics";
import { SubmitButton } from "./submit-button";
import { FormDynamicFields } from "./form-dynamic-fields";

export const ProductForm = ({
    productDynamicFields,
    productAppendDynamicData,
    categoryId,
}) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: {
            subcategoryIds: [],
            dynamicFields: productDynamicFields,
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const addFields = () => {
        append(productAppendDynamicData);
    };

    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        if (data.subcategoryIds.length === 0) {
            setError("subcategoryIds", {
                type: "required",
                message: "Выберите хотя бы одну подкатегорию",
            });
        } else {
            createProduct(data, imageUrl, categoryId);
        }
    };

    const getSubcategoryies = async () => {
        const { data } = await axios.get(`subcategory/category/${categoryId}`);

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
                    bikeFormFields={
                        bikeFormFields
                    } /* добавить универсальные данные под обе формы */
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
