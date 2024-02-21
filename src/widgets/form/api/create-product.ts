import axios from "@/shared/api/axiosConfig";
import { ProductFormData } from "../types/product-form-types";

export const createProduct = (data: ProductFormData) => {
    console.log(data);
    const normalizeData = {
        categoryId: 1,
        subcategoryIds: [1],
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
        productVariants: [
            {
                price: +data.price,
                article: data.article,
                wheelDiameter: +data.wheelDiameter,
                color: data.color,
                frameSize: data.frameSize,
                photos: [],
            },
        ],
    };
    //console.log(normalizeData);
    //axios.post("products", normalizeData);
};
