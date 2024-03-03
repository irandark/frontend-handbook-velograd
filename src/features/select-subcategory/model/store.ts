import { create } from "zustand";
import axios from "@/shared/api/axios-config";

interface Subcategory {
    id: number;
    name: string;
}

type Subcategories = Subcategory[];

type SelectSubcategoryStore = {
    activeSubcategoryId: number;
    subcategories: Subcategories;

    setActiveSubcategoryId: (id: number) => void;

    getSubcategories: (categoryId: number) => void;
};

export const useSelectSubcategoryStore = create<SelectSubcategoryStore>(
    (set) => ({
        activeSubcategoryId: 0,
        subcategories: [],

        setActiveSubcategoryId: (id) => {
            set({ activeSubcategoryId: id });
        },

        getSubcategories: async (categoryId) => {
            const { data } = await axios<Subcategories>(
                `subcategory/category/${categoryId}`
            );

            const firstSubcategoryId = data[0].id;

            set({
                subcategories: data,
                activeSubcategoryId: firstSubcategoryId,
            });
        },
    })
);
