"use client";

import { CheckboxShowAllProducts } from "@/features/checkbox-show-all-products";
import { SelectSubcategory } from "@/features/select-subcategory";
import { ProductCards } from "@/widgets/product-card";
import { useState } from "react";

interface ProductsProps {
    params: {
        categoryId: string;
    };
}

export default function Products({ params }: ProductsProps) {
    const [isCheckedShowAllProducts, setIsCheckedShowAllProducts] =
        useState(false);

    return (
        <>
            <div className="flex justify-between">
                <SelectSubcategory categoryId={+params.categoryId} />
                <CheckboxShowAllProducts
                    isCheckedShowAllProducts={isCheckedShowAllProducts}
                    setIsCheckedShowAllProducts={setIsCheckedShowAllProducts}
                />
            </div>

            <ProductCards
                categoryId={+params.categoryId}
                isCheckedShowAllProducts={isCheckedShowAllProducts}
            />
        </>
    );
}
