import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../config/firebase-config";
import { getFileUrlFromFireStorage } from "./get-file-url-from-firestorage";

export const uploadFile = async (file: File) => {
    const storage = getStorage(firebaseApp);

    const storageRef = ref(storage, file.name);

    return await uploadBytes(storageRef, file).then(() => {
        return getFileUrlFromFireStorage(storageRef.fullPath);
    });
};
