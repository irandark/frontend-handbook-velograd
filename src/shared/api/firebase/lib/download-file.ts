import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../config/firebase-config";

export const downloadFile = async (fileUrl: string) => {
    const storage = getStorage(firebaseApp);
    const pathReference = ref(storage, fileUrl);

    return await getDownloadURL(pathReference);
};
