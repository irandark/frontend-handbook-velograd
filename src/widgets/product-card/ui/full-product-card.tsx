import { useProductStore } from "@/widgets/product-card/model/store";
import { Product } from "@/widgets/product-card/types/product-types";
import { useEffect, useState } from "react";
import { createFieldsForFullProduct } from "../../../widgets/product-card/model/create-fields";
import { Slider } from "@/shared/ui/slider";
import { copyToClipboard } from "../lib/copy-to-clipboard";
import Link from "next/link";
import { Modal, useModal } from "@/shared/ui/modal";

export const FullProductCard = ({ product }: { product: Product | null }) => {
    const { closeModal } = useModal();

    const productVariants = product?.productVariants?.map((variant) => {
        return (
            <div
                key={variant.id}
                className="flex flex-col gap-5 border p-2 w-fit rounded-xl"
            >
                <div className="flex justify-between gap-5">
                    <p>Размер</p>
                    <p>{variant.frameSize}</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Цвет</p>
                    <p>{variant.color}</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Цена</p>
                    <p>{variant.price}р</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Диаметр колес</p>
                    <p>{variant.wheelDiameter}</p>
                </div>
                <div
                    onClick={() => copyToClipboard(variant.article)}
                    className="flex justify-between gap-5 cursor-pointer"
                >
                    <p> Артикул</p>
                    <p>{variant.article}</p>
                </div>
            </div>
        );
    });

    return (
        <div className="flex">
            <button onClick={closeModal}>Закрыть</button>

            <Link onClick={closeModal} href={`/products/edit/${product?.id}`}>
                Редактрировать
            </Link>
            <div className="m-auto w-1/2">
                <h1 className="text-3xl mt-5 font-bold">{product?.name}</h1>
                <img
                    src={product?.imageUrl}
                    alt="фото товара"
                    className="w-96 h-96 object-contain"
                />
                <div className="flex gap-5">
                    <p>Подкатегории</p>
                    {product?.subcategories?.map((subcategory) => {
                        return (
                            <div key={subcategory.id}>
                                <p>{subcategory.name}</p>
                            </div>
                        );
                    })}
                </div>
                <Slider className="border border-red-500 rounded-xl p-5">
                    <div className="flex gap-5 p-2">
                        {productVariants && productVariants}
                    </div>
                </Slider>
            </div>

            <div className="self-start mt-10 mr-44 min-w-1/2 border p-2 rounded-xl flex flex-col gap-2">
                {createFieldsForFullProduct(product).map((field) => (
                    <div key={field.id}>
                        {field.value && (
                            <div className="flex justify-between gap-10">
                                <p>{field.title}</p>
                                <p>{field.value}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
