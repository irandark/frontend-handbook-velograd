import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../config/firebase-config";

export const uploadFile = async (file: File) => {
    const storage = getStorage(firebaseApp);

    const storageRef = ref(storage, `images/${file.name}`);

    return await uploadBytes(storageRef, file).then(() => {
        return storageRef.fullPath;
    });
};
