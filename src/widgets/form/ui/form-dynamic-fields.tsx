import { FieldArrayWithId, Path, UseFieldArrayAppend } from "react-hook-form";
import { BikeFormData, DynamicBikeFormFields } from "../types/bike-form-types";
import { FormComponentsPropsTypes } from "../types/form-components-props-types";
import {
    AccessoryFormData,
    DynamicAccessoryFormFields,
} from "../types/accessory-form-types";
import { X } from "lucide-react";

interface FormDynamicFieldsProps extends FormComponentsPropsTypes {
    fields:
        | FieldArrayWithId<BikeFormData, "dynamicFields", "id">[]
        | FieldArrayWithId<AccessoryFormData, "dynamicFields", "id">[];

    dynamicFormFields: {
        placeholder: string;
        label: string;
        required: boolean;
    }[];
    append:
        | UseFieldArrayAppend<BikeFormData, "dynamicFields">
        | UseFieldArrayAppend<AccessoryFormData, "dynamicFields">;

    appendFields: DynamicBikeFormFields | DynamicAccessoryFormFields;

    remove: (index: number) => void;
}

export const FormDynamicFields: React.FC<FormDynamicFieldsProps> = ({
    errors,
    register,
    fields,
    dynamicFormFields,
    append,
    appendFields,
    remove,
}) => {
    const addFields = () => {
        append(appendFields);
    };
    return (
        <>
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
                        className={`relative grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
            mr-4 mb-2 ml-4 p-10 rounded-xl ${
                errors.dynamicFields
                    ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                    : "form-bg"
            }`}
                    >
                        {dynamicFormFields.map(
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
                        <div
                            className={`${
                                fields.length === 1 ? "hidden" : ""
                            } bg-gradient-to-r from-rose-500 to-red-700 p-2 rounded-xl absolute right-1 top-1
                        hover:opacity-70 transition cursor-pointer h-8 w-fit
                        flex justify-center items-center`}
                            onClick={() => remove(index)}
                        >
                            <X />
                        </div>
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
        </>
    );
};
