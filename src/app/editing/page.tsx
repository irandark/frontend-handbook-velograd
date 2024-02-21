"use client";

import { SelectForm } from "@/features/select-form";
import { useActiveFormStore } from "@/features/select-form/model/store";
import { AccessoryForm, ProductForm, SubcategoryForm } from "@/widgets/form";

export default function Editing() {
    const { activeFormId } = useActiveFormStore();
    return (
        <div>
            <SelectForm />

            {activeFormId === 1 && <ProductForm />}
            {activeFormId === 2 && <AccessoryForm />}
            {activeFormId === 3 && <SubcategoryForm />}
        </div>
    );
}
