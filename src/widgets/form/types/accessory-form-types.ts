import { Path, UseFormRegister } from "react-hook-form";
import { ProductFormData } from "./product-form-types";

export interface AccessoryFormFormData extends Partial<ProductFormData> {}

export interface AccessoryFormField {
    title: string;
    label: Path<AccessoryFormFormData>;
    required: boolean;
}

export interface InputProductFormProps extends AccessoryFormFormData {
    register: UseFormRegister<AccessoryFormFormData>;
}

export type AccessoryFormFields = AccessoryFormField[];
