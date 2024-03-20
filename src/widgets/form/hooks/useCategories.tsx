import { Subcategory } from "@/widgets/product-card/types/product-types";
import { useEffect, useState } from "react";
import { SUBCATEGORY_CATEGORY_ID_IN_DATABASE } from "../model/constants";
import axios from "@/shared/api/axios-config";

export const useCategories = (categoryId: number) => {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    useEffect(() => {
        try {
            getSubcategories();
        } catch (error) {
            console.log("ошибка при получении подкатегорий", error);
        }
    }, [categoryId]);

    const getSubcategories = async () => {
        const { data } = await axios.get(`subcategory/category/${categoryId}`);

        setSubcategories(data);
    };

    return {
        subcategories,
        getSubcategories,
    };
};
