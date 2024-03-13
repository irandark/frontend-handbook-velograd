import { Path, UseFormRegister } from "react-hook-form";

interface DynamicSubcategoryFormFields {
    name: string;
    subcategoryId: number;
}

export interface SubcategoryFormData {
    name: string;
    category: string;
    dynamicFields: DynamicSubcategoryFormFields[];
}

export interface SubcategoryFormField {
    placeholder: string;
    label: Path<SubcategoryFormData>;
    required: boolean;
}

export interface InputSubcategoryFormProps extends SubcategoryFormField {
    register: UseFormRegister<SubcategoryFormData>;
}

export type SubcategoryFormFields = SubcategoryFormField[];
