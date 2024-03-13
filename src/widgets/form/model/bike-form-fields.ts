import { BikeFormFields } from "../types/bike-form-types";

export const bikeFormFields: BikeFormFields = [
    {
        placeholder: "Название товара",
        label: "name",
        required: true,
    },
    {
        placeholder: "Название вилки",
        label: "forkName",
        required: false,
    },
    {
        placeholder: "Брэнд",
        label: "brand",
        required: false,
    },
    {
        placeholder: "Материал рамы",
        label: "frameMaterial",
        required: false,
    },
    {
        placeholder: "Год выпуска",
        label: "modelYear",
        required: false,
    },
    {
        placeholder: "Тип вилки",
        label: "forkType",
        required: false,
    },
    {
        placeholder: "Количество скоростей",
        label: "numberOfSpeeds",
        required: false,
    },
    {
        placeholder: "Задний переключатель",
        label: "rearDerailleur",
        required: false,
    },
    {
        placeholder: "Передний переключатель",
        label: "frontDerailleur",
        required: false,
    },
    {
        placeholder: "Шифтеры",
        label: "shifters",
        required: false,
    },
    {
        placeholder: "Система",
        label: "system",
        required: false,
    },
    {
        placeholder: "Кассета",
        label: "cassette",
        required: false,
    },
    {
        placeholder: "Тип тормоза",
        label: "brakeType",
        required: false,
    },
    {
        placeholder: "Особенности",
        label: "features",
        required: false,
    },
    {
        placeholder: "Название тормоза",
        label: "brakeName",
        required: false,
    },
    {
        placeholder: "Вес",
        label: "weight",
        required: false,
    },
];
