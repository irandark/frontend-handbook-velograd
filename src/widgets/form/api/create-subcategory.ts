import axios from "@/shared/api/axios-config";

interface CreateSubcategoryProps {
    name: string;
    category: string;
}

export const createSubcategory = async (data: CreateSubcategoryProps) => {
    const { name, category } = data;

    await axios.post(`subcategory`, {
        name,
        category: +category,
    });
};
