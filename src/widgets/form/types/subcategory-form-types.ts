import { Path, UseFormRegister } from "react-hook-form";

export interface SubcategoryFormData {
    name: string;
    category: string;
}

export interface SubcategoryFormField {
    title: string;
    label: Path<SubcategoryFormData>;
    required: boolean;
}

export interface InputSubcategoryFormProps extends SubcategoryFormField {
    register: UseFormRegister<SubcategoryFormData>;
}

export type SubcategoryFormFields = SubcategoryFormField[];
