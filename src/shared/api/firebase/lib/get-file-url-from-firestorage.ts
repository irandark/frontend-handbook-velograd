import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../config/firebase-config";

export const getFileUrlFromFireStorage = async (fileName: string) => {
    const storage = getStorage(firebaseApp);
    const pathReference = ref(storage, fileName);

    return await getDownloadURL(pathReference);
};
