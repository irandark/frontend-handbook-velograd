import {
    Control,
    Path,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { productFormFields } from "../model/product-form-fields";
import {
    DynamicProductFormFields,
    ProductFormData,
} from "../types/product-form-types";
import { createProduct } from "../api/create-product";
import { dynamicProductFormFields } from "../model/dynamic-product-form-fields";
import { uploadFile } from "@/shared/api/firebase/lib/upload-file";
import { Dropzone } from "@/shared/ui/dropzone";

let renderCount = 0;

export const ProductForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductFormData>({});

    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        createProduct(data);
    };

    renderCount++;

    const { fields, append } = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const addFields = () => {
        append({
            article: "",
            wheelDiameter: "",
            color: "",
            frameSize: "",
            price: "",
        });
    };
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        console.log(file);
        if (!file) {
            return;
        }

        try {
            const imageUrl = await uploadFile(file);
            console.log("Файл успешно загружен:", imageUrl);
        } catch (error) {
            console.log("Ошибка при загрузке файла:", error);
        }
    };
    return (
        <div>
            <p>render count: {renderCount}</p>
            <Dropzone />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <h1 className="text-2xl text-center mt-10">
                        Создание велосипеда
                    </h1>
                    <button
                        className="bg-red-700 p-2 rounded-xl hover:bg-red-900 
                                cursor-pointer h-10 w-1/6 self-start ml-4"
                        type="submit"
                    >
                        Создать товар
                    </button>
                </div>
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
                    <h2 className="text-2xl text-center mb-5">
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
