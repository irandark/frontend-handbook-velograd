import { FC } from "react";

interface ProductVariant {
    photos?: string[];
    id: number;
    article: string;
    wheelDiameter?: string;
    color?: string;
    frameSize?: string;
    price: number;
    stockItems?: any[]; //FIXME:Здесь следует уточнить тип данных для элементов в stockItems
}

export interface Product {
    id: number;
    name?: string;
    brand?: string;
    frameMaterial?: string;
    modelYear?: number;
    forkType?: string;
    forkName?: string;
    numberOfSpeeds?: string;
    rearDerailleur?: string;
    frontDerailleur?: string;
    shifters?: string;
    system?: string;
    cassette?: string;
    brakeType?: string;
    brakeName?: string;
    weight?: number;
    productVariants?: ProductVariant[];
}

export const ProductCard = ({ product }: { product: Product }) => {
    const {
        name,
        productVariants,
        frameMaterial,
        forkType,
        forkName,
        frontDerailleur,
        rearDerailleur,
        brakeType,
    } = product;
    return (
        <div className="w-72 min-h-96 bg-red-400 rounded-xl p-2 m-2">
            <p className="text-xl text-center p-2">{name}</p>
            <div className="w-32 h-32 bg-orange-300 rounded-2xl m-auto">
                {productVariants && productVariants[0].photos}
            </div>
            <div className="flex justify-between">
                <p>артикул:</p>
                <p>{productVariants && productVariants[0].article}</p>
            </div>
            <div className="flex justify-between">
                <p>рама</p>
                <p>{frameMaterial}</p>
            </div>
            <div className="flex justify-between">
                <p>тип вилки</p>
                <p>{forkType}</p>
            </div>
            <div className="flex justify-between">
                <p>вилка</p>
                <p>{forkName}</p>
            </div>
            <div className="flex justify-between">
                <p>пер. тр.</p>
                <p>{frontDerailleur}</p>
            </div>
            <div className="flex justify-between">
                <p>здн. тр.</p>
                <p>{rearDerailleur}</p>
            </div>
            <div className="flex justify-between">
                <p>тип торм.</p>
                <p>{brakeType}</p>
            </div>
            <div className="flex justify-between">
                <p>наличие шт</p>
                <p>наличие</p>
            </div>
            <div className="flex justify-between">
                <p>цена</p>
                <p>{productVariants && productVariants[0].price}</p>
            </div>
        </div>
    );
};
