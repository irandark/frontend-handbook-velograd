"use client";

import { Tag } from "@/features/Tag";
import { useEffect, useState } from "react";
import axios from "@/shared/api/axiosConfig";
import { ProductCard } from "@/widgets/product-card";
import { Product } from "@/widgets/product-card/ui/ProductCard";

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

    const [products, setProducts] = useState<Product[]>([]);

    //BUG: не выбирается первый тэг по умлочанию и не отправляется запрос на сервер за товарами

    useEffect(() => {
        try {
            const { categoryId } = params;
            const getSubcategories = async (id: number) => {
                const { data } = await axios<Subcategories>(
                    `subcategory/category/${id}`
                );
                setActiveSubcategoryId(data[0].id);
                setSubcategories(data);
            };

            getSubcategories(+categoryId);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handlerTagClick = (id: number) => {
        setActiveSubcategoryId(id);
        getProducts(id);
    };

    const getProducts = async (subcategoryId: number) => {
        try {
            const { data } = await axios.post("products/filtered", {
                categoryId: +params.categoryId,
                subcategoryIds: [subcategoryId],
                orderDirection: "ASC",
            });
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("products page", products);

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
                            name={name}
                        />
                    ))}
                </ul>
            </nav>
            <div className="flex flex-wrap">
                {products.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>
        </div>
    );
}
