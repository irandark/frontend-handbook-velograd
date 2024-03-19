import { Subcategory } from "@/widgets/product-card/types/product-types";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BikeFormData } from "../types/bike-form-types";

interface FormSubcategoriesProps {
    subcategories: Subcategory[];
    register: UseFormRegister<BikeFormData>;
    errors: FieldErrors<BikeFormData>;
}

export const FormSubcategories: React.FC<FormSubcategoriesProps> = ({
    subcategories,
    register,
    errors,
}) => {
    return (
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
            <div className={`flex p-2 gap-2 flex-wrap justify-center `}>
                {subcategories.map((subcategory) => (
                    <div key={subcategory.id}>
                        <div
                            className={`p-2 bg-neutral-700 flex min-w-[17%] gap-2 rounded-xl ${
                                errors.subcategoryIds
                                    ? "bg-gradient-to-r from-rose-500 to-red-400"
                                    : ""
                            }`}
                        >
                            <input
                                type="checkbox"
                                value={subcategory.id}
                                {...register("subcategoryIds")}
                            />
                            <label htmlFor="">{subcategory.name}</label>
                        </div>
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
    );
};
