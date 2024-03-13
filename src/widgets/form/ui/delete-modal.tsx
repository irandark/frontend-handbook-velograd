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
        <div className="flex flex-col w-96 h-96">
            <div>Вы точно хотите удалить товар?</div>
            <div className="flex gap-2">
                <button className="bg-red-500" onClick={handlerDeleteProduct}>
                    Да
                </button>
                <button className="bg-green-500" onClick={closeModal}>
                    Нет
                </button>
            </div>
        </div>
    );
};
