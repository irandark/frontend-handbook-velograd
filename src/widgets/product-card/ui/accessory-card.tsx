import { ClipboardCopy } from "lucide-react";
import { ProductCardProps, ProductVariant } from "../types/product-types";
import { useEffect, useState } from "react";
import Link from "next/link";

export const AccessoryCard = ({ product }: ProductCardProps) => {
    const [activeArticleId, setActiveArticleId] = useState(0);
    const [variants, setVariants] = useState<{ id: number; title: string }[]>(
        []
    );
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

    return (
        <div className="min-w-96 min-h-96 bg-sky-700 rounded-xl p-2 m-2 hover:bg-sky-900">
            <Link
                href={`/fullproduct/${product.id}`}
                className="text-xl text-center p-2 cursor-pointer hover:text-green-700"
            >
                {name}
            </Link>
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
            <div className="flex justify-between border p-1 rounded-xl">
                <p>артикул:</p>
                <p>
                    {productVariants &&
                        productVariants.map((variant) => (
                            <p
                                key={variant.id}
                                onClick={() => copyToClipboard(variant.article)}
                                className="cursor-pointer hover:text-green-700"
                            >
                                {variant.id === activeArticleId &&
                                    variant.article}
                            </p>
                        ))}
                </p>
                <ClipboardCopy className="w-6 h-6" />
            </div>
            <div className="flex justify-between">
                <p>наличие шт</p>
                <p>наличие</p>
            </div>
            <div className="flex justify-between">
                <p>цена</p>
                <p>
                    {productVariants &&
                        productVariants.map((variant) => (
                            <p key={variant.id}>
                                {variant.id === activeArticleId &&
                                    variant.price}
                            </p>
                        ))}
                </p>
            </div>
        </div>
    );
};
