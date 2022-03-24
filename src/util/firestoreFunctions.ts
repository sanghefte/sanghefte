import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
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
  const querySnapshot = await getDocs(dataCollectionRef);

  return querySnapshot.docs.map((_data) => ({
    title: _data.data().title,
    text: _data.data().text,
    creator: _data.data().creator,
    id: _data.id,
  }));
};

export type Pamphlet = {
  id: string
}

export const getAllPamphlets = async (
    userID: string
): Promise<Array<Pamphlet>> => {
  const dataCollectionRef = collection(db, "BrukerID", userID, "sanghefter");
  const querySnapshot = await getDocs(dataCollectionRef);

  return querySnapshot.docs.map((_data) => ({
    id: _data.id,
  }));
};

/**
 * Checks if provided pamphlet id already exists
 * @return {Boolean} Returns all songs in a song pamphlet.
 * @param SanghefteId
 * @param docRef
 */
export const checkIfPamphletExist = async (
  SanghefteId: string,
  docRef: string
) => {
  const dataCollectionRef = collection(db, docRef, SanghefteId, "sanger");
  const snapshot = await getDocs(dataCollectionRef);
  return !snapshot.empty;
};

/**
 * Creates a new song pamphlet with a given id
 * @param docName id/name of the song pamphlet
 * @param userID ID of the user
 */
export const createSanghefte = async (docName: string, userID: string) => {
  const docRef = doc(db, "BrukerID", userID, "sanghefter", docName);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(doc(db, "BrukerID", userID, "sanghefter", docName), {});
  }
};

/**
 * Generates a user
 */
export const generateUser = async () => {
  const docRef = await addDoc(collection(db, "BrukerID"), {});
  localStorage.setItem("userID", docRef.id);
};

/**
 * Deletes a song pamphlet if it exists
 * @param userID Id of the user
 * @param docName id/name of the song pamphlet
 */
export const deleteSanghefte = async (userID: string, docName: string) => {
  const docRef = doc(db, "BrukerID", userID, "sanghefter", docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await deleteDoc(docRef);
  }
};

/**
 * Creates a new song and add it to a specific song pamphlet
 *
 * @param userID the id of the user
 * @param pathSegment which song pamphlet we will add a song to
 * @param songTitle Title of the song we want to add
 * @param text Lyrics we want to add
 * @param creator Creator of the song
 */
export const createSong = async (
  userID: string,
  pathSegment: string,
  songTitle: string,
  text: string,
  creator: string
) => {
  const docRef = doc(
    db,
    "BrukerID",
    userID,
    "sanghefter",
    pathSegment,
    "sanger",
    songTitle
  );
  setDoc(docRef, {
    title: songTitle,
    text: text,
    creator: creator,
  });
};

/**
 * Deletes a song from a song pamphlet
 *
 * @param userID Id of the user
 * @param pathSegment Song pamphlet to delete from
 * @param songTitle Title of the song we want to delete
 */
export const deleteSong = async (
  userID: string,
  pathSegment: string,
  songTitle: string
) => {
  const docRef = doc(
    db,
    "BrukerID",
    userID,
    "sanghefter",
    pathSegment,
    "sanger",
    songTitle
  );
  deleteDoc(docRef);
  console.log("Deleted " + songTitle);
};
