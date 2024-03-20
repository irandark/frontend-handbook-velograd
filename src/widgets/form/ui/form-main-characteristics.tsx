import { UseFormRegister } from "react-hook-form";
import { AccessoryFormFields } from "../types/accessory-form-types";
import { BikeFormData, BikeFormFields } from "../types/bike-form-types";
import { FormComponentsPropsTypes } from "../types/form-components-props-types";

interface FormMainCharacteristicsProps extends FormComponentsPropsTypes {
    formFields: BikeFormFields | AccessoryFormFields;
}

export const FormMainCharacteristics: React.FC<
    FormMainCharacteristicsProps
> = ({ errors, register, formFields }) => {
    return (
        <>
            <h3 className="text-xl text-center mb-5 mt-20">
                Основные характеристики
            </h3>
            {errors.name && (
                <p className="text-rose-400 opacity-70 text-center mt-2 mb-2">
                    Поле "Название товара" не должно быть пустым
                </p>
            )}
            <div
                className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 p-10 rounded-xl ${
                    errors.name
                        ? "shadow-lg shadow-rose-600 bg-neutral-800 animate-shake"
                        : "form-bg "
                }`}
            >
                {formFields.map(({ placeholder, label, required }) => (
                    <div key={placeholder}>
                        <input
                            {...register(label, { required })}
                            autoComplete="off"
                            placeholder={placeholder}
                            className={`text-black w-48 rounded-md p-1 mb-2`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
