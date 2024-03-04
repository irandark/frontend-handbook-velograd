import { useEffect, useState } from "react";
import {
    Product,
    ProductCardProps,
    ProductVariant,
} from "../types/product-types";
import { ClipboardCopy } from "lucide-react";
import { useModalStore } from "@/shared/ui/modal/model/store";
import { useProductStore } from "../model/store";
import { copyToClipboard } from "../lib/copy-to-clipboard";

export const BikeCard = ({ product }: ProductCardProps) => {
    const [activeArticleId, setActiveArticleId] = useState(0);
    const [variants, setVariants] = useState<{ id: number; title: string }[]>(
        []
    );

    const { openModal } = useModalStore();
    const { setCurrentProduct } = useProductStore();

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

    const normalizeProductVariant = (productVariants: ProductVariant[]) => {
        return productVariants.map((variant) => {
            {
                return {
                    id: variant.id,
                    title: `${variant.frameSize} ${variant.color} ${variant.wheelDiameter}`,
                };
            }
        });
    };

    useEffect(() => {
        if (productVariants) {
            setActiveArticleId(productVariants[0].id);
            setVariants(normalizeProductVariant(productVariants));
        }
    }, []);

    const handlerTitleOnClick = (product: Product) => {
        setCurrentProduct(product);
        openModal();
    };

    const handlerCopyToClipboard = async () => {
        const currentVariant = productVariants?.find((variant) => {
            return variant.id === activeArticleId;
        });

        const article = currentVariant?.article || "";

        await copyToClipboard(article);
    };

    return (
        <div className="min-w-96 min-h-96 bg-sky-700 rounded-xl p-2 m-2 hover:bg-sky-900">
            <div
                onClick={() => handlerTitleOnClick(product)}
                className="text-2xl text-center text-red-400 cursor-pointer"
            >
                {name}
            </div>

            <div>
                <select
                    name="variants"
                    id="1"
                    className="w-full rounded-xl p-1 bg-sky-600 cursor-pointer text-white"
                    onChange={(e) => setActiveArticleId(+e.target.value)}
                >
                    {variants.map((variant) => (
                        <option
                            key={variant.id}
                            value={variant.id}
                            className="cursor-pointer"
                        >
                            {variant.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full h-64 m-auto p-2">
                <img
                    src={imageUrl}
                    alt="фото товара"
                    className="w-full h-full object-contain"
                />
            </div>
            <div
                className="flex justify-between border p-1 rounded-xl cursor-pointer hover:bg-green-800"
                onClick={handlerCopyToClipboard}
            >
                <p>артикул:</p>
                <div>
                    {productVariants &&
                        productVariants.map((variant) => (
                            <div key={variant.id}>
                                {variant.id === activeArticleId &&
                                    variant.article}
                            </div>
                        ))}
                </div>
                <ClipboardCopy className="w-6 h-6" />
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
                <p>пер. торм.</p>
                <p>{frontDerailleur}</p>
            </div>
            <div className="flex justify-between">
                <p>здн. торм.</p>
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
                <div>
                    {productVariants &&
                        productVariants.map((variant) => (
                            <p key={variant.id}>
                                {variant.id === activeArticleId &&
                                    variant.price}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
};
