import { ClipboardCopy } from "lucide-react";
import {
    Product,
    ProductCardProps,
    ProductVariant,
} from "../types/product-types";
import { useEffect, useState } from "react";
import { useModalStore } from "@/shared/ui/modal/model/store";
import { useProductStore } from "../model/store";

export const AccessoryCard = ({ product }: ProductCardProps) => {
    const [activeArticleId, setActiveArticleId] = useState(0);
    const [variants, setVariants] = useState<{ id: number; title: string }[]>(
        []
    );
    const { openModal } = useModalStore();
    const { setCurrentProduct } = useProductStore();

    const { name, productVariants, imageUrl } = product;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Скопировано в буфер обмена");
        } catch (error) {
            console.error("Error copying text to clipboard:", error);
        }
    };

    const normalizeProductVariant = (productVariants: ProductVariant[]) => {
        return productVariants.map((variant) => {
            {
                return {
                    id: variant.id,
                    title: `${variant.frameSize} ${variant.color}`,
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

    return (
        <div className="min-w-96 min-h-96 bg-sky-700 rounded-xl p-2 m-2 hover:bg-sky-900">
            <div>
                <p
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => handlerTitleOnClick(product)}
                >
                    {name}
                </p>

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
            <div className="flex justify-between border p-1 rounded-xl">
                <p>артикул:</p>
                <div>
                    {productVariants &&
                        productVariants.map((variant) => (
                            <div
                                key={variant.id}
                                onClick={() => copyToClipboard(variant.article)}
                                className="cursor-pointer hover:text-green-700"
                            >
                                {variant.id === activeArticleId &&
                                    variant.article}
                            </div>
                        ))}
                </div>
                <ClipboardCopy className="w-6 h-6" />
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
