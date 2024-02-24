import { downloadFile } from "@/shared/api/firebase/lib/download-file";
import { uploadFile } from "@/shared/api/firebase/lib/upload-file";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const Dropzone = () => {
    const [url, setUrl] = useState<string>("");
    const onDrop = useCallback((files: File[]) => {
        uploadFile(files[0]).then((url) => {
            setUrl(url);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (url) {
            downloadFile(url).then((res) => {
                console.log(res);
            });
        }
    }, [url]);

    return (
        <div
            {...getRootProps()}
            className={`bg-gray-600 w-80 h-60 rounded-xl cursor-pointer hover:bg-green-400 m-auto ${
                isDragActive && "bg-green-400"
            }`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <p>Перетащите файлы сюда или кликните, чтобы выбрать файлы</p>
            )}
        </div>
    );
};
