import axios from "@/shared/api/axios-config";

export const deleteSubcategory = async (id: number) => {
    await axios.delete(`subcategory/${id}`);
};
