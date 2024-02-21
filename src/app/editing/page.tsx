"use client";

import { SelectForm } from "@/features/select-form";
import { useActiveFormStore } from "@/features/select-form/model/store";
import { ProductForm, SubcategoryForm } from "@/widgets/form";

export default function Editing() {
    const { activeFormId } = useActiveFormStore();
    return (
        <div>
            <SelectForm />

            {activeFormId === 0 && <ProductForm />}
            {activeFormId === 1 && <SubcategoryForm />}
        </div>
    );
}
