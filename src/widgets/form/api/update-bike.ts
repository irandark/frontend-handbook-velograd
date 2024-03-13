import axios from "@/shared/api/axios-config";
import { BikeFormData } from "../types/bike-form-types";
import { ResponseData } from "../types/response-data-types";
import { BIKE_CATEGORY_ID_IN_DATABASE } from "../model/constants";

export const updateBike = async (
    data: BikeFormData,
    imageUrl: string,
    productId: number
) => {
    let responseData: Partial<ResponseData> = {
        subcategoryIds: data.subcategoryIds.map((id: number) => +id),
        categoryId: BIKE_CATEGORY_ID_IN_DATABASE,
        name: data.name,
        brand: data.brand,
        features: data.features,
        imageUrl,
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

    console.log(responseData);
    await axios.patch(`products/${productId}`, responseData);
};
