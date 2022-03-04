import {
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase-config";

/*
Interface to define what a song should contain
 */
export type Song = {
  id: string;
  title: string;
  text: string;
  creator: string;
};

/**
 * Gets all songs in a son pamphlet.
 *
 * @param SanghefteId The Id of the song pamphlet.
 * @return {Array} Returns all songs in a song pamphlet.
 */

export const getAllSongs = async (
  SanghefteId: string
): Promise<Array<Song>> => {
  const dataCollectionRef = collection(db, "sanghefter", SanghefteId, "sanger");
  const snapshot = await getDocs(dataCollectionRef);

  const data: Array<Song> = [];

  snapshot.docs.map((_data) => {
    data.push({
      title: _data.data().title,
      text: _data.data().text,
      creator: _data.data().creator,
      id: _data.id,
    });
  });

  return data as Array<Song>;
};

/**
 * Creates a new song pamphlet with a given id
 * @param docName id/name of the song pamphlet
 */
export const createSanghefte = async (docName: string) => {
  const docRef = doc(db, "sanghefter", docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("JA DEN FINNES");
  } else {
    await setDoc(doc(db, "sanghefter", docName), {});
  }
};

/**
 * Deletes a song pamphlet if it exists
 * @param docName id/name of the song pamphlet
 */
export const deleteSanghefte = async (docName: string) => {
  const docRef = doc(db, "sanghefter", docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await deleteDoc(docRef);
  } else {
    console.log("Sangheftet finnes ikke!");
  }
};

/**
 * Creates a new song and add it to a specific song pamphlet
 *
 * @param pathSegment which song pamphlet we will add a song to
 * @param songTitle Title of the song we want to add
 * @param text Lyrics we want to add
 * @param creator Creator of the song
 */
export const createSong = async (
  pathSegment: string,
  songTitle: string,
  text: string,
  creator: string
) => {
  const docRef = doc(db, "sanghefter", pathSegment, "sanger", songTitle);
  setDoc(docRef, {
    title: songTitle,
    text: text,
    creator: creator,
  });
};

/**
 * Deletes a song from a song pamphlet
 *
 * @param pathSegment Song pamphlet to delete from
 * @param songTitle Title of the song we want to delete
 */
export const deleteSong = async (pathSegment: string, songTitle: string) => {
  const docRef = doc(db, "sanghefter", pathSegment, "sanger", songTitle);
  deleteDoc(docRef);
  console.log("Deleted " + songTitle);
};
