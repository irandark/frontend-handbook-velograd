import { getAnalytics } from "firebase/analytics";
import firebase, { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: Partial<FirebaseConfig> = {
    apiKey: "AIzaSyC6MJInBRO1iW8scoG9GGTbTcmDTgyr3nY",
    authDomain: "handbook-velograd.firebaseapp.com",
    projectId: "handbook-velograd",
    storageBucket: "handbook-velograd.appspot.com",
    messagingSenderId: "485990814697",
    appId: "1:485990814697:web:2afb81a17118534e7a3178",
    measurementId: "G-413396BVD9",
};

const firebaseApp = initializeApp(firebaseConfig);
//const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp };
