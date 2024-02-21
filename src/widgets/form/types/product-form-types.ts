import { Path, UseFormRegister } from "react-hook-form";

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
    article: string;
    wheelDiameter: string;
    color: string;
    frameSize: string;
    price: number;
}

export interface ProductFormField {
    title: string;
    label: Path<ProductFormData>;
    required: boolean;
}

export interface InputProductFormProps extends ProductFormField {
    register: UseFormRegister<ProductFormData>;
}

export type ProductFormFields = ProductFormField[];
