export interface ResponseData {
    categoryId: number;
    subcategoryIds: number[];
    name: string;
    brand: string;
    features: string;
    imageUrl: string;
    forkName?: string;
    frameMaterial?: string;
    forkType?: string;
    rearDerailleur?: string;
    frontDerailleur?: string;
    shifters?: string;
    system?: string;
    cassette?: string;
    brakeType?: string;
    brakeName?: string;
    weight?: number;
    modelYear?: number;
    numberOfSpeeds?: number;
    productVariants?: {
        article: string;
        color?: string;
        frameSize?: string;
        price?: number;
        wheelDiameter?: string;
    }[];
}
