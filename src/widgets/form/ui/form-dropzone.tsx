import { Dropzone } from "@/shared/ui/dropzone";
import { Dispatch, SetStateAction } from "react";

interface FormDropzoneProps {
    imageUrl: string;
    setImageUrl: Dispatch<SetStateAction<string>>;
}

export const FormDropzone: React.FC<FormDropzoneProps> = ({
    imageUrl,
    setImageUrl,
}) => {
    return (
        <div
            className={`flex flex-col w-fit h-fit p-3  rounded-xl  ml-4 mt-20 ${
                imageUrl !== ""
                    ? "shadow-md shadow-amber-600 bg-neutral-800"
                    : "form-bg"
            }`}
        >
            <h3 className="text-xl text-center mb-5">Добавить фото</h3>
            <div className="flex gap-10">
                <div className="flex flex-col w-40 h-40 overflow-hidden">
                    <p className="text-center">Предпросмотр</p>
                    <img
                        src={imageUrl}
                        alt="нет фото"
                        className="w-full h-full object-contain"
                    />
                </div>
                <Dropzone setImageUrl={setImageUrl} />
            </div>
        </div>
    );
};
