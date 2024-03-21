import { deleteProduct } from "../api/delete-product";

interface DeleteModalProps {
    deletedProductId: number;
    closeModal: () => void;
}

export const DeleteProduct = ({
    deletedProductId,
    closeModal,
}: DeleteModalProps) => {
    const handlerDeleteProduct = () => {
        deleteProduct(deletedProductId);
        closeModal();
    };

    return (
        <div className="flex flex-col w-48 h-44 bg-neutral-900 opacity-90 rounded-xl justify-center items-center text-center">
            <div>Вы точно хотите удалить товар?</div>
            <div className="flex gap-2 mt-5">
                <button
                    className="bg-red-500 p-2 rounded-xl hover:opacity-70 transition cursor-pointer"
                    onClick={handlerDeleteProduct}
                >
                    Да
                </button>
                <button
                    className="bg-green-500 p-2 rounded-xl hover:opacity-70 transition cursor-pointer"
                    onClick={closeModal}
                >
                    Нет
                </button>
            </div>
        </div>
    );
};
