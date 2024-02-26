import { Path } from "react-hook-form";

export interface DynamicAccessoryFormFields {
    article: string;
    color: string;
    frameSize: string;
    price: string;
}
export interface AccessoryFormData extends Partial<DynamicAccessoryFormFields> {
    name: string;
    brand: string;
    features: string;
    subcategoryIds: number[];
    dynamicFields: DynamicAccessoryFormFields[];
}

export interface AccessoryFormField {
    placeholder: string;
    label: Path<AccessoryFormData>;
    required: boolean;
}

export type AccessoryFormFields = AccessoryFormField[];
