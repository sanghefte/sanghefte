import React, { useEffect, useState } from "react";
import { getAllSongs, Song } from "../util/firestoreFunctions";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { songIDState } from "../store/store";
import { useRecoilState } from "recoil";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [songID, setSongID] = useRecoilState(songIDState);
  const [songsData, setSongsData] = useState<Array<Song>>([]);

  useEffect(() => {
    const displayPamphletInfo = async (pamphletID: string) => {
      if (userID) {
        await getAllSongs(pamphletID, userID).then((r) => setSongsData(r));
      }
    };

    displayPamphletInfo(pamphletId).catch(console.error);
  }, [pamphletId, userID]);

  const updateSong = (songID: string) => {
    setSongID(songID);
    navigate("/updatesong");
  };

  return (
    <div>
      {songsData &&
        songsData.map((song) => [
          <p key={song.id}>{song.title}</p>,
          <Button onClick={() => updateSong(song.id)}>Update</Button>,
        ])}
    </div>
  );
};
