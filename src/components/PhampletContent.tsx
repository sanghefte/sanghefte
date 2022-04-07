import React, { useEffect, useState } from "react";
import { getAllSongs, Song } from "../util/firestoreFunctions";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);

  const [songsData, setSongsData] = useState<Array<Song>>([]);

  useEffect(() => {
    const displayPamphletInfo = async (pamphletID: string) => {
      if (userID) {
        await getAllSongs(pamphletID, userID).then((r) => setSongsData(r));
      }
    };

    displayPamphletInfo(pamphletId).catch(console.error);
  }, [pamphletId, userID]);

  return (
    <div>
      {songsData && songsData.map((song) => <p key={song.id}>{song.title}</p>)}
    </div>
  );
};
