import { BIKE_CATEGORY_ID_IN_DATABASE } from "@/widgets/form/model/constants";
import { AccessoryCard } from "./accessory-card";
import { BikeCard } from "./bike-card";
import { useProductStore } from "../model/store";
import { useEffect } from "react";
import { useSelectSubcategoryStore } from "@/features/select-subcategory/model/store";

export const ProductCards = ({
    categoryId,
    isCheckedShowAllProducts,
}: {
    categoryId: number;
    isCheckedShowAllProducts: boolean;
}) => {
    const { products, getProducts } = useProductStore();
    const { activeSubcategoryId } = useSelectSubcategoryStore();

    useEffect(() => {
        getProducts(categoryId, [activeSubcategoryId], "DESC");
    }, [activeSubcategoryId]);

    return (
        <div className="flex flex-wrap">
            {products.map((product) =>
                categoryId === BIKE_CATEGORY_ID_IN_DATABASE ? (
                    <BikeCard
                        product={product}
                        key={product.id}
                        isCheckedShowAllProducts={isCheckedShowAllProducts}
                    />
                ) : (
                    <AccessoryCard
                        product={product}
                        key={product.id}
                        isCheckedShowAllProducts={isCheckedShowAllProducts}
                    />
                )
            )}
        </div>
    );
};
