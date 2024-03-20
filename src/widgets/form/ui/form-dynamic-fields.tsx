import { FieldArrayWithId, Path, UseFieldArrayAppend } from "react-hook-form";
import { BikeFormData } from "../types/bike-form-types";
import { FormComponentsPropsTypes } from "../types/form-components-props-types";
import { AccessoryFormData } from "../types/accessory-form-types";

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

    appendFields: {
        article: string;
        wheelDiameter?: string;
        color: string;
        frameSize: string;
        price: string;
    };
}

export const FormDynamicFields: React.FC<FormDynamicFieldsProps> = ({
    errors,
    register,
    fields,
    dynamicFormFields,
    append,
    appendFields,
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
                        className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
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
