"use client";

import { Tag } from "@/features/Tag";
import { useEffect, useState } from "react";
import axios from "@/shared/api/axiosConfig";
import { ProductCard } from "@/widgets/product-card";

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

    //FIXME: create type for products
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        try {
            const { categoryId } = params;
            const getSubcategories = async (id: number) => {
                const { data } = await axios<Subcategories>(
                    `subcategory/category/${id}`
                );
                setActiveSubcategoryId(data[0].id);
                setSubcategories(data);
                getProducts(id);
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

    const getProducts = async (id: number) => {
        try {
            const { data } = await axios.post("products/filtered", {
                categoryId: 1,
                subcategoryIds: [2],
                orderDirection: "ASC",
            });
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

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
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
}
