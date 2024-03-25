import { create } from "zustand";
import { Product } from "../types/product-types";
import axios from "@/shared/api/axios-config";

type ProductStore = {
    products: Product[];
    currentProduct: Product | null;

    getProducts: (
        categoryId: number,
        subcategoryIds: (number | "All")[],
        orderDirection?: "ASC" | "DESC"
    ) => void;

    setCurrentProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    currentProduct: null,

    getProducts: async (categoryId, subcategoryIds, orderDirection = "ASC") => {
        const { data } = await axios.post("products/filtered", {
            categoryId,
            subcategoryIds,
            orderDirection,
        });
        set({ products: data });
    },

    setCurrentProduct: (product) => {
        set({ currentProduct: product });
    },
}));
