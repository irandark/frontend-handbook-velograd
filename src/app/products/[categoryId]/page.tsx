"use client";

import { Tag } from "@/features/Tag";
import { useEffect, useState } from "react";
import axios from "@/shared/api/axios-config";
import { useProductStore } from "@/widgets/product-card/model/store";
import { BIKE_CATEGORY_ID_IN_DATABASE } from "@/widgets/form/model/constants";
import { AccessoryCard, BikeCard } from "@/widgets/product-card";

interface Subcategory {
    id: number;
    name: string;
}

type Subcategories = Subcategory[];

export default function Products({
    params,
}: {
    params: {
        categoryId: string;
    };
}) {
    const [subcategories, setSubcategories] = useState<Subcategories>([]);

    const [activeSubcategoryId, setActiveSubcategoryId] = useState(0);

    const { products, getProducts } = useProductStore((state) => ({
        products: state.products,
        getProducts: state.getProducts,
    }));

    useEffect(() => {
        try {
            const { categoryId } = params;
            const getSubcategories = async (id: number) => {
                const { data } = await axios<Subcategories>(
                    `subcategory/category/${id}`
                );

                const firstSubcategoryId = data[0].id;

                setActiveSubcategoryId(firstSubcategoryId);
                setSubcategories(data);
                getProducts(+categoryId, [firstSubcategoryId], "ASC");
            };

            getSubcategories(+categoryId);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handlerTagClick = (id: number) => {
        setActiveSubcategoryId(id);
        getProducts(+params.categoryId, [id], "ASC");
    };

    //console.log("products page", products);

    return (
        <div>
            <nav>
                <ul className="flex flex-wrap p-2 gap-1">
                    {subcategories.map(({ id, name }) => (
                        <Tag
                            onClick={() => handlerTagClick(id)}
                            className={`p-2 cursor-pointer hover:bg-slate-800 rounded-xl + ${
                                activeSubcategoryId === id ? "bg-slate-800" : ""
                            }`}
                            key={id}
                            title={name}
                        />
                    ))}
                </ul>
            </nav>
            <div className="flex flex-wrap">
                {products.map((product) =>
                    +params.categoryId === BIKE_CATEGORY_ID_IN_DATABASE ? (
                        <BikeCard product={product} key={product.id} />
                    ) : (
                        <AccessoryCard product={product} key={product.id} />
                    )
                )}
            </div>
        </div>
    );
}
