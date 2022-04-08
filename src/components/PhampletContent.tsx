import React, { useEffect, useState } from "react";
import { deleteSong, getAllSongs, Song } from "../util/firestoreFunctions";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { sanghefteState, songIDState } from "../store/store";
import { useRecoilState, useRecoilValue } from "recoil";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [, setSongID] = useRecoilState(songIDState);
  const pamphlet = useRecoilValue(sanghefteState);
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

  const handleDeleteSong = async (songID: string) => {
    if (userID) await deleteSong(userID, pamphlet, songID);
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {songsData &&
        songsData.map((song) => [
          <p key={song.id}>{song.title}</p>,
          <Button onClick={() => updateSong(song.id)}>Update</Button>,
          <Button onClick={() => handleDeleteSong(song.id)}>
            Delete song
          </Button>,
        ])}
    </div>
  );
};
