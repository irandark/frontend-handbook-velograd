import { AccessoryFormFields } from "../types/accessory-form-types";

export const accessoryFormFields: AccessoryFormFields = [
    {
        title: "Название товара",
        label: "name",
        required: true,
    },
    {
        title: "Брэнд",
        label: "brand",
        required: false,
    },
    {
        title: "Артикул",
        label: "article",
        required: true,
    },
    {
        title: "Размер",
        label: "frameSize",
        required: false,
    },
    {
        title: "Цвет",
        label: "color",
        required: false,
    },
    {
        title: "Цена",
        label: "price",
        required: false,
    },
];
