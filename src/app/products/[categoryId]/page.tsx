"use client";

import { SelectSubcategory } from "@/features/select-subcategory";
import { ProductCards } from "@/widgets/product-card";

interface ProductsProps {
    params: {
        categoryId: string;
    };
}

export default function Products({ params }: ProductsProps) {
    return (
        <>
            <SelectSubcategory categoryId={+params.categoryId} />
            <ProductCards categoryId={+params.categoryId} />
        </>
    );
}
