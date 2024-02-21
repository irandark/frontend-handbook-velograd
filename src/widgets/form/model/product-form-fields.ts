import { ProductFormFields } from "../types/product-form-types";

export const productFormFields: ProductFormFields = [
    {
        title: "Название товара",
        label: "name",
        required: true,
    },
    {
        title: "Название вилки",
        label: "forkName",
        required: false,
    },
    {
        title: "Брэнд",
        label: "brand",
        required: false,
    },
    {
        title: "Материал рамы",
        label: "frameMaterial",
        required: false,
    },
    {
        title: "Год выпуска",
        label: "modelYear",
        required: false,
    },
    {
        title: "Тип вилки",
        label: "forkType",
        required: false,
    },
    {
        title: "Количество скоростей",
        label: "numberOfSpeeds",
        required: false,
    },
    {
        title: "Задний переключатель",
        label: "rearDerailleur",
        required: false,
    },
    {
        title: "Передний переключатель",
        label: "frontDerailleur",
        required: false,
    },
    {
        title: "Шифтеры",
        label: "shifters",
        required: false,
    },
    {
        title: "Система",
        label: "system",
        required: false,
    },
    {
        title: "Кассета",
        label: "cassette",
        required: false,
    },
    {
        title: "Тип тормоза",
        label: "brakeType",
        required: false,
    },
    {
        title: "Название тормоза",
        label: "brakeName",
        required: false,
    },
    {
        title: "Вес",
        label: "weight",
        required: false,
    },
    {
        title: "Артикул",
        label: "article",
        required: false,
    },
    {
        title: "Диаметр колес",
        label: "wheelDiameter",
        required: false,
    },
    {
        title: "Цвет",
        label: "color",
        required: false,
    },
    {
        title: "Размер рамы",
        label: "frameSize",
        required: false,
    },
    {
        title: "Цена",
        label: "price",
        required: false,
    },
];
