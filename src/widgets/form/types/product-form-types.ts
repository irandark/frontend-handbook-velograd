import { Path, UseFormRegister } from "react-hook-form";

export interface DynamicProductFormFields {
    article: string;
    wheelDiameter: string;
    color: string;
    frameSize: string;
    price: string;
}
export interface ProductFormData {
    name: string;
    forkName: string;
    brand: string;
    frameMaterial: string;
    modelYear: number;
    forkType: string;
    numberOfSpeeds: string;
    rearDerailleur: string;
    frontDerailleur: string;
    shifters: string;
    system: string;
    cassette: string;
    brakeType: string;
    brakeName: string;
    weight: number;
    categoryId: string;
    features: string;
    dynamicFields: DynamicProductFormFields[];
    subcategoryIds: number[];
}

export interface ProductFormField {
    placeholder: string;
    label: Path<ProductFormData>;
    required: boolean;
}

export type ProductFormFields = ProductFormField[];
