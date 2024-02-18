"use client";

import { Tag } from "@/features/Tag";
import { formFields } from "@/shared/lib/form-fields";
import { CircleFadingPlus } from "lucide-react";
import {
    FieldErrors,
    Path,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";

interface FormData {
    name: string;
    forkName: string;
}

type InputProps = {
    title: string;
    label: Path<FormData>;
    register: UseFormRegister<FormData>;
    required: boolean;
};

export default function Editing() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    const Input = ({ title, label, register, required }: InputProps) => (
        <div className="flex flex-col">
            <label>{title}</label>
            <input
                {...register(label, { required })}
                className="text-black w-60 rounded-md p-1"
            />
        </div>
    );
    return (
        <div>
            <h1 className="text-2xl text-center mt-2">
                Добавление товара / категорий
            </h1>
            <div className="flex justify-around mt-10">
                <Tag
                    className="flex gap-2 bg-green-700 p-2 rounded-xl hover:bg-green-900 cursor-pointer"
                    iconLucide={<CircleFadingPlus />}
                    name="Добавить товар"
                />
                <Tag
                    className="flex gap-2 bg-green-700 p-2 rounded-xl hover:bg-green-900 cursor-pointer"
                    iconLucide={<CircleFadingPlus />}
                    name="Добавить категорию"
                />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-2 m-10 p-10 bg-emerald-700 rounded-xl"
            >
                {/* FIXME: need correct types for formFields */}
                {formFields.map(({ title, name, required }) => (
                    <div key={title}>
                        <Input
                            title={title}
                            label={name}
                            register={register}
                            required={required}
                        />
                        {errors[name] && <span>This field is required</span>}
                    </div>
                ))}
                <button
                    className="bg-red-700 p-2 rounded-xl hover:bg-red-900 cursor-pointer h-10 w-40"
                    type="submit"
                >
                    Создать товар
                </button>
            </form>
        </div>
    );
}
