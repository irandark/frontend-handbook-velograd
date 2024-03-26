import { useEffect, useLayoutEffect, useState } from "react";
import {
    Product,
    ProductCardProps,
    ProductVariant,
} from "../types/product-types";
import { ClipboardCopy } from "lucide-react";
import { useProductStore } from "../model/store";
import { copyToClipboard } from "../lib/copy-to-clipboard";
import { Modal, useModal } from "@/shared/ui/modal";
import { FullProductCard } from "..";
import { toast } from "sonner";

export const BikeCard = ({
    product,
    isCheckedShowAllProducts,
}: ProductCardProps) => {
    const [activeArticleId, setActiveArticleId] = useState(0);
    const [selectInputProductVariants, setSelectInputProductVariants] =
        useState<
            { id: number; title: string; isInStock: boolean | undefined }[]
        >([]);

    const { openModal, isOpen, closeModal } = useModal();
    const [isStartCloseModalAnimation, setIsStartCloseModalAnimation] =
        useState(false);
    const { setCurrentProduct, currentProduct } = useProductStore();

    const [isShowCard, setIsShowCard] = useState(false);

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
                    isInStock: variant.stockItems?.some(
                        (item) => item.quantity > 0
                    ),
                };
            }
        });
    };

    useEffect(() => {
        if (productVariants) {
            setActiveArticleId(productVariants[0].id);
            setSelectInputProductVariants(
                normalizeProductVariant(productVariants)
            );
        }
    }, []);

    useLayoutEffect(() => {
        let totalQuantity = 0;

        if (!isCheckedShowAllProducts) {
            productVariants.forEach((variant) => {
                variant.stockItems?.forEach((item) => {
                    totalQuantity += item.quantity;
                });
            });

            if (totalQuantity <= 0) {
                setIsShowCard(false);
                return;
            }
        }

        setIsShowCard(true);
    }, [isCheckedShowAllProducts]);

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

        toast.success(`артикул ${article} скопирован в буфер обмена`);
    };

    return (
        isShowCard && (
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
                <div
                    onClick={() => handlerTitleOnClick(product)}
                    className="text-2xl text-center font-bold text-white cursor-pointer p-2 hover:text-sky-500 transition"
                >
                    {name}
                </div>

                <div>
                    <select
                        name="variants"
                        id="1"
                        className="w-full rounded-xl p-1 bg-neutral-700 cursor-pointer text-white hover:bg-neutral-600 transition"
                        onChange={(e) => setActiveArticleId(+e.target.value)}
                    >
                        {selectInputProductVariants.map(
                            (variant) =>
                                variant.isInStock && (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.title}
                                    </option>
                                )
                        )}
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
                    <p>рама</p>
                    <p>{frameMaterial ? frameMaterial : "нет данных"}</p>
                </div>
                <div className="flex justify-between">
                    <p>тип вилки</p>
                    <p>{forkType ? forkType : "нет данных"}</p>
                </div>
                <div className="flex justify-between">
                    <p>вилка</p>
                    <p>{forkName ? forkName : "нет данных"}</p>
                </div>
                <div className="flex justify-between">
                    <p>п. перек.</p>
                    <p>{frontDerailleur ? frontDerailleur : "нет данных"}</p>
                </div>
                <div className="flex justify-between">
                    <p>з. перек.</p>
                    <p>{rearDerailleur ? rearDerailleur : "нет данных"}</p>
                </div>
                <div className="flex justify-between">
                    <p>тип торм.</p>
                    <p>{brakeType ? brakeType : "нет данных"}</p>
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

                <div className="flex flex-col justify-between border p-1 rounded-xl mt-3">
                    <p className="text-center">Наличие</p>
                    <div>
                        {productVariants &&
                            productVariants.map((variant) => (
                                <div key={variant.id}>
                                    {variant.id === activeArticleId &&
                                        variant.stockItems
                                            ?.sort((a, b) => a.id - b.id)
                                            .map((stockItem) => (
                                                <div key={stockItem.id}>
                                                    {stockItem.quantity > 0 && (
                                                        <div className="flex justify-between gap-2">
                                                            <p>
                                                                {
                                                                    stockItem
                                                                        .warehouse
                                                                        .name
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    stockItem.quantity
                                                                }{" "}
                                                                шт
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    );
};
