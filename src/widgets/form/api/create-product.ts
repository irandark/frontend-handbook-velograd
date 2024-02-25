import axios from "@/shared/api/axios-config";
import { ProductFormData } from "../types/product-form-types";

export const createProduct = (
    data: ProductFormData,
    imageUrl: string,
    categoryId: number
) => {
    //console.log(data);
    const productVariants = data.dynamicFields.map((field) => {
        return {
            article: field.article,
            wheelDiameter: field.wheelDiameter,
            color: field.color,
            frameSize: field.frameSize,
            price: field.price,
        };
    });

    const normalizeData = {
        categoryId,
        subcategoryIds: data.subcategoryIds.map((id) => +id),
        name: data.name,
        brand: data.brand,
        forkName: data.forkName,
        frameMaterial: data.frameMaterial,
        forkType: data.forkType,
        rearDerailleur: data.rearDerailleur,
        frontDerailleur: data.frontDerailleur,
        shifters: data.shifters,
        system: data.system,
        cassette: data.cassette,
        brakeType: data.brakeType,
        brakeName: data.brakeName,
        modelYear: +data.modelYear,
        weight: +data.weight,
        numberOfSpeeds: +data.numberOfSpeeds,
        imageUrl,
        productVariants,
    };
    console.log(normalizeData);
    //axios.post("products", normalizeData);
};
