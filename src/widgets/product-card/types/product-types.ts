export interface Category {
    id: number;
    name: string;
}

export interface Subcategory extends Category {}

interface Warehouse {
    id: number;
    name: string;
}

interface StockItem {
    id: number;
    quantity: number;
    warehouse: Warehouse;
}

export interface ProductVariant {
    id: number;
    article: string;
    wheelDiameter?: string;
    color?: string;
    frameSize?: string;
    price: number;
    stockItems?: StockItem[];
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
    productVariants: ProductVariant[];
    subcategories?: Subcategory[];
    category: Category;
}

export interface ProductCardProps {
    product: Product;
}
