// src/hooks/useFirestoreBooks.js
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "../context/authContext"; // adjust path
import { app } from "../firebase/firebaseConfig"; // Firebase config file

const db = getFirestore(app);

export function useFirestoreBooks() {
    const { currentUser } = useAuth();

    async function addDocument(data) {

        if (!currentUser) return;
        const docRef = doc(db, "users", currentUser.uid);
        console.log(currentUser.uid);

        await setDoc(docRef, { books: data });
    }

    async function getDocument() {

        if (!currentUser) return [];
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().books : [];
    }

    return { addDocument, getDocument };
}
