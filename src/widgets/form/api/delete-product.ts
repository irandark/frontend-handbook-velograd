import axios from "@/shared/api/axios-config";

export const deleteProduct = async (id: number) => {
    console.log("DELETE");
    await axios.delete(`products/${id}`);
};
