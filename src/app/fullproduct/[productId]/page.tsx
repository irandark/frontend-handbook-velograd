"use client";

import { useProductStore } from "@/widgets/product-card/model/store";
import { Product } from "@/widgets/product-card/types/product-types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createFieldsForFullProduct } from "./create-fields";

export default function ProductPage({
    params,
}: {
    params: { productId: string };
}) {
    const { products } = useProductStore();
    const [currentProduct, setCurrentProduct] = useState<Product>();

    useEffect(() => {
        const currentProduct = products.find(
            (product) => product.id === +params.productId
        );
        setCurrentProduct(currentProduct);
    }, []);

    const productVariants = currentProduct?.productVariants?.map((variant) => {
        return (
            <div className="flex flex-col gap-5 border p-2 w-fit rounded-xl">
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
                <div className="flex justify-between gap-5">
                    <p> Артикул</p>
                    <p>{variant.article}</p>
                </div>
            </div>
        );
    });

    return (
        <div className="flex">
            <div className="m-auto w-1/2">
                <h1 className="text-3xl mt-5 font-bold">
                    {currentProduct?.name}
                </h1>
                <img
                    src={currentProduct?.imageUrl}
                    alt="фото товара"
                    className="w-96 h-96 object-contain"
                />
                <div className="flex flex-wrap gap-5">
                    {productVariants && productVariants}
                </div>
            </div>

            <div className="self-start mt-10 mr-44 min-w-1/2 border p-2 rounded-xl flex flex-col gap-2">
                {createFieldsForFullProduct(currentProduct as Product).map(
                    (field) => (
                        <>
                            {field.value && (
                                <div
                                    className="flex justify-between gap-10"
                                    key={field.id}
                                >
                                    <p>{field.title}</p>
                                    <p>{field.value}</p>
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
}
