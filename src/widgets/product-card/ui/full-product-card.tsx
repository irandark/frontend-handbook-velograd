import { Product } from "@/widgets/product-card/types/product-types";
import { createFieldsForFullProduct } from "../../../widgets/product-card/model/create-fields";
import { Slider } from "@/shared/ui/slider";
import { copyToClipboard } from "../lib/copy-to-clipboard";
import Link from "next/link";
import { Pencil, X } from "lucide-react";

const TIME_DELAY_MODAL_CLOSE = 400;

interface FullProductCardProps {
    product: Product | null;
    closeModal: () => void;
    setIsStartCloseModalAnimation: (value: boolean) => void;
}

export const FullProductCard = ({
    product,
    closeModal,
    setIsStartCloseModalAnimation,
}: FullProductCardProps) => {
    const productVariants = product?.productVariants?.map((variant) => {
        return (
            <div
                key={variant.id}
                className="flex flex-col gap-5 border border-neutral-500 shadow-md shadow-neutral-500 p-2 w-fit rounded-xl"
            >
                <div className="flex justify-between gap-5">
                    <p>Размер</p>
                    <p>{variant.frameSize}</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Цвет</p>
                    <p>{variant.color}</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Цена</p>
                    <p>{variant.price}р</p>
                </div>
                <div className="flex justify-between gap-5">
                    <p>Диаметр колес</p>
                    <p>{variant.wheelDiameter}</p>
                </div>
                <div
                    onClick={() => copyToClipboard(variant.article)}
                    className="flex justify-between gap-5 cursor-cell hover:text-sky-500"
                >
                    <p> Артикул</p>
                    <p>{variant.article}</p>
                </div>
            </div>
        );
    });

    const handlerCloseModal = () => {
        setIsStartCloseModalAnimation(true);
        setTimeout(() => {
            closeModal();
            setIsStartCloseModalAnimation(false);
        }, TIME_DELAY_MODAL_CLOSE);
    };

    return (
        <div className="absolute right-0 w-10/12 h-full gradient-black-to-gray">
            <div className="flex gap-2">
                <button
                    className="p-3 bg-gradient-to-t from-rose-700 to-red-700 rounded-xl hover:opacity-70 transition"
                    onClick={handlerCloseModal}
                >
                    <X />
                </button>
                <Link
                    onClick={handlerCloseModal}
                    href={`/products/edit/${product?.id}`}
                >
                    <div className="flex w-fit p-3 bg-gradient-to-t from-emerald-700 to-lime-700 rounded-xl hover:opacity-70 transition">
                        <Pencil />
                    </div>
                </Link>
            </div>

            <div className="flex w-full h-full mt-[-3%]">
                <div className="m-auto w-1/2">
                    <h1 className="text-3xl mt-5 font-bold opacity-80 text-amber-500">
                        {product?.name}
                    </h1>

                    <img
                        src={product?.imageUrl}
                        alt="фото товара"
                        className="max-w-[40vw] max-h-[50vh] object-contain"
                    />

                    <div className="flex gap-5 p-5 flex-wrap w-[70vw]">
                        {product?.subcategories?.map((subcategory) => {
                            return (
                                <div
                                    key={subcategory.id}
                                    className="shadow-md shadow-amber-500 text-amber-300 font-bold p-2 rounded-xl"
                                >
                                    <p>{subcategory.name}</p>
                                </div>
                            );
                        })}
                    </div>
                    <Slider className="w-[70vw]">
                        <div className="flex gap-5">
                            {productVariants && productVariants}
                        </div>
                    </Slider>
                </div>

                <div
                    className="self-start mt-16 mr-44 min-w-1/2 border 
                border-neutral-500 shadow-md shadow-neutral-500 p-2 
                rounded-xl flex flex-col gap-2"
                >
                    {createFieldsForFullProduct(product).map((field) => (
                        <div key={field.id}>
                            {field.value && (
                                <div className="flex justify-between gap-10">
                                    <p>{field.title}</p>
                                    <p>{field.value}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
