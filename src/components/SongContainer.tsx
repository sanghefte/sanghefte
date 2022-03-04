import React, { useEffect, useState } from "react";
import { Container, Text, Heading } from "@chakra-ui/react";
import { getAllSongs, Song } from "../util/firestoreFunctions";
import { useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";

export const SongContainer = () => {
  const [data, setData] = useState<Array<Song>>([]);
  const sanghefteId = useRecoilValue(sanghefteState);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setData([]);
    await getAllSongs(sanghefteId).then((r) => setData(r));
  };

  return (
    <Container mt={3}>
      {data &&
        data.map((d, index) => {
          return (
            <div key={index}>
              <Heading>{d.title}</Heading>
              <Text as="i">Av: {d.creator}</Text>
              <Text mt={3}>{d.text}</Text>
            </div>
          );
        })}
    </Container>
  );
};
