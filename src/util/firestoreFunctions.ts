import {collection, getDocs} from "firebase/firestore";
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