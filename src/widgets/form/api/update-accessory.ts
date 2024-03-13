import axios from "@/shared/api/axios-config";
import { ResponseData } from "../types/response-data-types";
import { BIKE_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import { AccessoryFormData } from "../types/accessory-form-types";

export const updateAccessory = async (
    data: AccessoryFormData,
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

        productVariants: data.dynamicFields.map((field) => ({
            article: field.article,
            color: field.color,
            frameSize: field.frameSize,
            price: +field.price,
        })),
    };

    console.log(responseData);
    await axios.patch(`products/${productId}`, responseData);
};
