import { create } from "zustand";
import { Product } from "../types/product-types";
import axios from "@/shared/api/axios-config";

type ProductStore = {
    products: Product[];

    getProducts: (
        categoryId: number,
        subcategoryIds: number[],
        orderDirection?: "ASC" | "DESC"
    ) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],

    getProducts: async (categoryId, subcategoryIds, orderDirection = "ASC") => {
        console.log("categoryId", categoryId, "subcategoryIds", subcategoryIds);
        const { data } = await axios.post("products/filtered", {
            categoryId,
            subcategoryIds,
            orderDirection,
        });

        set({ products: data });
    },
}));
