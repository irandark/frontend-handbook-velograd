"use client";

import { EditAccessoryForm, EditBikeForm } from "@/widgets/form";
import {
    ACCESSORY_CATEGORY_ID_IN_DATABASE,
    BIKE_CATEGORY_ID_IN_DATABASE,
} from "@/widgets/form/model/constants";
import { useProductStore } from "@/widgets/product-card/model/store";

export default function ProductEditPage({
    params,
}: {
    params: { productId: string };
}) {
    const { currentProduct } = useProductStore();

    return (
        <div>
            {currentProduct?.category.id === BIKE_CATEGORY_ID_IN_DATABASE && (
                <EditBikeForm currentProduct={currentProduct} />
            )}
            {currentProduct?.category.id ===
                ACCESSORY_CATEGORY_ID_IN_DATABASE && (
                <EditAccessoryForm currentProduct={currentProduct} />
            )}
        </div>
    );
}
