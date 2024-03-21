import { Product } from "@/widgets/product-card/types/product-types";
import { FormComponentsPropsTypes } from "../types/form-components-props-types";

interface FormCheckboxInputProps extends FormComponentsPropsTypes {
    subcategoryId: number;
    subcategoryName: string;
    currentProduct: Product;
}

export const FormCheckboxInput: React.FC<FormCheckboxInputProps> = ({
    errors,
    register,
    subcategoryId,
    subcategoryName,
    currentProduct,
}) => {
    const isChecked = (id: number): boolean => {
        if (currentProduct.subcategories)
            for (const subcategory of currentProduct.subcategories) {
                if (subcategory.id === id) {
                    return true;
                }
            }
        return false;
    };

    return (
        <div
            className={`p-2 bg-neutral-700 flex min-w-[17%] gap-2 rounded-xl ${
                errors.subcategoryIds
                    ? "bg-gradient-to-r from-rose-500 to-red-400"
                    : ""
            }`}
        >
            <input
                type="checkbox"
                defaultChecked={isChecked(subcategoryId)}
                value={subcategoryId}
                {...register("subcategoryIds")}
            />
            <label htmlFor="">{subcategoryName}</label>
        </div>
    );
};
