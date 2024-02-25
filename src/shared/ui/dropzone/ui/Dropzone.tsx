import { uploadFile } from "@/shared/api/firebase/lib/upload-file";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
    setImageUrl: Dispatch<SetStateAction<string>>;
}

export const Dropzone = ({ setImageUrl }: DropzoneProps) => {
    const onDrop = useCallback((files: File[]) => {
        uploadFile(files[0]).then((url) => {
            return setImageUrl(url);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div
            {...getRootProps()}
            className={`bg-gray-600 p-2 text-center flex items-center w-52 h-40 rounded-xl cursor-pointer hover:bg-green-400 ${
                isDragActive && "bg-green-400"
            }`}
        >
            <input {...getInputProps()} />
            <p className="">
                Перетащите файлы сюда или кликните, чтобы добавить картинку
            </p>
        </div>
    );
};
