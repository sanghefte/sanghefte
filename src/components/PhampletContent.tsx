import React, { useEffect, useState } from "react";
import { deleteSong, getAllSongs, Song } from "../util/firestoreFunctions";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [songsData, setSongsData] = useState<Array<Song>>([]);

  useEffect(() => {
    const displayPamphletInfo = async (pamphletID: string) => {
      if (userID) {
        await getAllSongs(pamphletID, userID).then((r) => setSongsData(r));
      }
    };

    displayPamphletInfo(pamphletId).catch(console.error);
  }, [pamphletId, userID]);

  const handleClick_updateSong = (songID: string) => {
    sessionStorage.setItem("currentSong_id", songID);
    navigate("/updatesong");
  };

  const handleClick_deleteSong = async (songID: string) => {
    const pamphletTitle = await sessionStorage.getItem("currentPamphlet_title");
    if (userID && pamphletTitle !== null)
      await deleteSong(userID, pamphletTitle, songID);
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {songsData &&
        songsData.map((song) => [
          <div key={song.id}>
            <p>{song.title}</p>
            <Button onClick={() => handleClick_updateSong(song.id)}>
              Oppdater sang
            </Button>
            <Button onClick={() => handleClick_deleteSong(song.id)}>
              Slett sang
            </Button>
          </div>,
        ])}
    </>
  );
};
