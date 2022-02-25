import {collection, deleteDoc, getDoc, getDocs, setDoc, doc} from "firebase/firestore";
import {db} from "./firebase-config";

export type Song = {
    id: string;
    Name: string;
    lyrics: string;
}

const dataCollectionRef = collection(db, "songs");


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
export const createSanghefte = async (docName: string) => {
    const docRef= doc(db, "sanghefter", docName)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        console.log("JA DEN FINNES")
    }
    else{
        await setDoc(doc(db, "sanghefter", docName), {});
    }
}
/*
Hvis sangheftet "tittel" finnes så slettes den
 */
export const deleteSanghefte = async(docName: string) => {
    const docRef= doc(db, "sanghefter", docName)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        await deleteDoc(docRef);
    }
    else{
        console.log("Sangheftet finnes ikke!")
    }
}

/*
update/create sang
 */
export const createSong = async(pathSegment: string, songTitle: string, text: string, creator: string, melody: string) => {
    const docRef= doc(db, "sanghefter", pathSegment, "sanger", songTitle)
    setDoc(docRef, {
        title: songTitle,
        text: text,
        creatot: creator,
        melody: melody,
    })
}

/*
Delete sang
 */
export const deleteSong = async(pathSegment: string, songTitle: string) => {
    const docRef= doc(db, "sanghefter", pathSegment, "sanger", songTitle)
    deleteDoc(docRef);
    console.log("Deleted " + songTitle)
}
