import {collection, getDoc, getDocs, setDoc, doc} from "firebase/firestore";
import {db} from "./firebase-config";

export type Song = {
    id: string;
    Name: string;
    lyrics: string;
}

const dataCollectionRef = collection(db, "songs");
const docRef = doc(db, "sanghefter", "Update")

export const getAllSongs = async (): Promise<Array<Song>> => {
    const snapshot = await getDocs(dataCollectionRef);

    const data: Array<Song> = []

    snapshot.docs.map((_data) => {
        data.push({
            Name: _data.data().Name,
            lyrics: _data.data().lyrics,
            id: _data.id,
        });
    });

    return data as Array<Song>;
}

/*
Creates a new "sanghefte" in the sanghefte collection. path="sanghefter" id=2nd parameter" data afterwards.
Checks if the document allready exist.
 */
export const createSanghefte = async () => {
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        console.log("JA DEN FINNES")
    }
    else{
        setDoc(doc(db, "sanghefter", "Update"), {
            title: "test4"
        });
    }
}