import { Path, UseFormRegister } from "react-hook-form";

export interface DynamicBikeFormFields {
    article: string;
    wheelDiameter: string;
    color: string;
    frameSize: string;
    price: string;
}
export interface BikeFormData {
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
    dynamicFields: DynamicBikeFormFields[];
    subcategoryIds: number[];
}

export interface BikeFormField {
    placeholder: string;
    label: Path<BikeFormData>;
    required: boolean;
}

export type BikeFormFields = BikeFormField[];
