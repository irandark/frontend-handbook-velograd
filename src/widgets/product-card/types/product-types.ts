export interface ProductVariant {
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
    features?: string;
    imageUrl?: string;
    weight?: number;
    productVariants?: ProductVariant[];
}

export interface ProductCardProps {
    product: Product;
}
