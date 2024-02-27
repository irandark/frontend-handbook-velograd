import { Product } from "../types/product-types";

interface ProductCardProps {
    product: Product;
    categoryId: string;
}

export const ProductCard = ({ product, categoryId }: ProductCardProps) => {
    const {
        name,
        productVariants,
        frameMaterial,
        forkType,
        forkName,
        frontDerailleur,
        rearDerailleur,
        brakeType,
        imageUrl,
    } = product;

    return (
        <div className="w-72 min-h-96 bg-sky-700 rounded-xl p-2 m-2 hover:bg-sky-900 cursor-pointer">
            <p className="text-xl text-center p-2">{name}</p>
            <div className="w-44 h-44 rounded-2xl m-auto">
                <img
                    src={imageUrl}
                    alt="фото товара"
                    className="w-full h-full object-contain"
                />
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
