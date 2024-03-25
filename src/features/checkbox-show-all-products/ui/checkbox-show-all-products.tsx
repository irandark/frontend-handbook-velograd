interface CheckboxShowAllProductsProps {
    isCheckedShowAllProducts: boolean;
    setIsCheckedShowAllProducts: (value: boolean) => void;
}

export const CheckboxShowAllProducts: React.FC<
    CheckboxShowAllProductsProps
> = ({ isCheckedShowAllProducts, setIsCheckedShowAllProducts }) => {
    return (
        <div className="p-2">
            <label className="flex justify-center items-center cursor-pointer gap-1">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 cursor-pointer"
                    checked={isCheckedShowAllProducts}
                    onChange={() =>
                        setIsCheckedShowAllProducts(!isCheckedShowAllProducts)
                    }
                />
                <span>Показать товары, которых нет на остатках</span>
            </label>
        </div>
    );
};
