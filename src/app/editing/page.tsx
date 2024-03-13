"use client";

import { SelectForm } from "@/features/select-form";
import { useActiveFormStore } from "@/features/select-form/model/store";
import {
    EditSubcategoryForm,
    NewAccessoryForm,
    NewBikeForm,
    NewSubcategoryForm,
} from "@/widgets/form";

export default function Editing() {
    const { activeFormId } = useActiveFormStore();
    return (
        <div>
            <SelectForm />

            {activeFormId === 1 && <NewBikeForm />}
            {activeFormId === 2 && <NewAccessoryForm />}
            {activeFormId === 3 && <NewSubcategoryForm />}
            {activeFormId === 4 && <EditSubcategoryForm />}
        </div>
    );
}
