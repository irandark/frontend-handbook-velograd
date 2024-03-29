import { ClipboardCopy } from "lucide-react";
import {
    Product,
    ProductCardProps,
    ProductVariant,
} from "../types/product-types";
import { useEffect, useState } from "react";
import { useProductStore } from "../model/store";
import { Modal, useModal } from "@/shared/ui/modal";
import { FullProductCard } from "..";

export const AccessoryCard = ({ product }: ProductCardProps) => {
    const [activeArticleId, setActiveArticleId] = useState(0);
    const [variants, setVariants] = useState<{ id: number; title: string }[]>(
        []
    );
    const { openModal, isOpen, closeModal } = useModal();
    const [isStartCloseModalAnimation, setIsStartCloseModalAnimation] =
        useState(false);
    const { setCurrentProduct, currentProduct } = useProductStore();

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

    const handlerCopyToClipboard = async () => {
        const currentVariant = productVariants?.find((variant) => {
            return variant.id === activeArticleId;
        });

        const article = currentVariant?.article || "";

        await copyToClipboard(article);
    };

    return (
        <div
            className="min-w-96 min-h-96 
        bg-gradient-to-r from-neutral-800 via-neutral-800 to-neutral-900 rounded-xl p-2 m-2
         hover:shadow-lg hover:shadow-sky-500 transition ease-in-out duration-500 hover:scale-105"
        >
            <Modal
                isOpen={isOpen}
                className={`fixed top-0 right-0 w-full h-full transition animate-modal-open ${
                    isStartCloseModalAnimation
                        ? "animate-modal-close"
                        : "opacity-100"
                }`}
            >
                <FullProductCard
                    product={currentProduct}
                    closeModal={closeModal}
                    setIsStartCloseModalAnimation={
                        setIsStartCloseModalAnimation
                    }
                />
            </Modal>
            <div>
                <p
                    className="text-2xl text-center font-bold text-white cursor-pointer p-2 hover:text-sky-500 transition"
                    onClick={() => handlerTitleOnClick(product)}
                >
                    {name}
                </p>

                <select
                    name="variants"
                    id="1"
                    className="w-full rounded-xl p-1 bg-neutral-700 cursor-pointer text-white hover:bg-neutral-600 transition"
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
                className="flex justify-between border p-1 rounded-xl cursor-cell hover:bg-sky-800 transition"
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
