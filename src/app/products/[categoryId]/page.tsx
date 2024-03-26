"use client";

import { CheckboxShowAllProducts } from "@/features/checkbox-show-all-products";
import { SelectSubcategory } from "@/features/select-subcategory";
import { SortDirection } from "@/features/sort-direction/ui/sort-direction";
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
    const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

    return (
        <>
            <div className="flex justify-between">
                <SelectSubcategory categoryId={+params.categoryId} />
                <div className="flex items-center gap-10">
                    <SortDirection
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                    />
                    <CheckboxShowAllProducts
                        isCheckedShowAllProducts={isCheckedShowAllProducts}
                        setIsCheckedShowAllProducts={
                            setIsCheckedShowAllProducts
                        }
                    />
                </div>
            </div>

            <ProductCards
                categoryId={+params.categoryId}
                sortDirection={sortDirection}
                isCheckedShowAllProducts={isCheckedShowAllProducts}
            />
        </>
    );
}
