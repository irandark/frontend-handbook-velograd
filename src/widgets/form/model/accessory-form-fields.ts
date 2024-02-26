import { AccessoryFormFields } from "../types/accessory-form-types";

export const accessoryFormFields: AccessoryFormFields = [
    {
        placeholder: "Название товара",
        label: "name",
        required: true,
    },
    {
        placeholder: "Брэнд",
        label: "brand",
        required: false,
    },
    {
        placeholder: "Особенности",
        label: "features",
        required: false,
    },
];
