import { SubcategoryFormData } from "../types/subcategory-form-types";
import axios from "@/shared/api/axios-config";

export const updateSubcategory = async (data: SubcategoryFormData) => {
    const { name, subcategoryId } = data.dynamicFields[0];

    await axios.patch(`subcategory/${subcategoryId}`, { name });
};
