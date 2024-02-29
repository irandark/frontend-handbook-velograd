"use client";

import { useRouter } from "next/router";

export default function ProductPage({ params }) {
    // Здесь вы можете использовать ID для загрузки данных товара...

    return (
        <div>
            <h1>Товар {params.productId}</h1>
            {/* Отображение деталей товара */}
        </div>
    );
}
