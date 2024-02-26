import axios from "@/shared/api/axios-config";
import { ProductFormData } from "../types/product-form-types";
import {
    BIKE_CATEGORY_ID_IN_DATABASE,
    SUBCATEGORY_CATEGORY_ID_IN_DATABASE,
} from "../model/constants";
import { AccessoryFormData } from "../types/accessory-form-types";
import { ResponseData } from "../types/response-data-types";

function isProductFormData(data: unknown): data is ProductFormData {
    return (data as ProductFormData).cassette !== undefined;
}

export const createProduct = (
    data: AccessoryFormData | ProductFormData,
    imageUrl: string,
    categoryId: number
) => {
    let responseData: ResponseData = {
        categoryId,
        subcategoryIds: data.subcategoryIds.map((id: number) => +id),
        name: data.name,
        brand: data.brand,
        features: data.features,
        imageUrl,
    };

    if (
        isProductFormData(data) &&
        categoryId === BIKE_CATEGORY_ID_IN_DATABASE
    ) {
        responseData = {
            ...responseData,
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
            productVariants: data.dynamicFields.map((field) => ({
                article: field.article,
                wheelDiameter: field.wheelDiameter,
                color: field.color,
                frameSize: field.frameSize,
                price: +field.price,
            })),
        };
    }

    if (
        !isProductFormData(data) &&
        categoryId === SUBCATEGORY_CATEGORY_ID_IN_DATABASE
    ) {
        responseData = {
            ...responseData,
            productVariants: data.dynamicFields.map((field) => ({
                article: field.article,
                color: field.color,
                frameSize: field.frameSize,
                price: +field.price,
            })),
        };
    }

    console.log(responseData);
    axios.post("products", responseData);
};
