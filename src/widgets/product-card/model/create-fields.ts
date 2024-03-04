import { Product } from "@/widgets/product-card/types/product-types";

export const createFieldsForFullProduct = (product: Product) => {
    return [
        {
            id: 1,
            title: "Название тормозов",
            value: product?.brakeName,
        },
        {
            id: 2,
            title: "Тип тормозов",
            value: product?.brakeType,
        },
        {
            id: 3,
            title: "Бренд",
            value: product?.brand,
        },
        {
            id: 4,
            title: "Кассета",
            value: product?.cassette,
        },
        {
            id: 5,
            title: "Особенности",
            value: product?.features,
        },
        {
            id: 6,
            title: "Название вилки",
            value: product?.forkName,
        },
        {
            id: 7,
            title: "Тип вилки",
            value: product?.forkType,
        },
        {
            id: 8,
            title: "Материал рамы",
            value: product?.frameMaterial,
        },
        {
            id: 9,
            title: "Передняя трансмиссия",
            value: product?.frontDerailleur,
        },
        {
            id: 10,
            title: "Задняя трансмиссия",
            value: product?.rearDerailleur,
        },
        {
            id: 11,
            title: "Модельный год",
            value: product?.modelYear,
        },
        {
            id: 12,
            title: "Кол-во скоростей",
            value: product?.numberOfSpeeds,
        },
        {
            id: 13,
            title: "Шифтеры",
            value: product?.shifters,
        },

        {
            id: 14,
            title: "Система",
            value: product?.system,
        },
        {
            id: 15,
            title: "Вес",
            value: product?.weight,
        },
    ];
};
