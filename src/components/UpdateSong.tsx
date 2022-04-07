import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { sanghefteState, songIDState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  updateSongInPamphlet,
  getSong,
  Song,
} from "../util/firestoreFunctions";

export const UpdateSong = () => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [artist, setArtist] = useState("");
  const sanghefte = useRecoilValue(sanghefteState);
  const songID = useRecoilValue(songIDState);
  const navigate = useNavigate();
  const [songInfo, setSongInfo] = useState<Song>();

  const localStorage_userIdKey = "userID";

  const updateSong = () => {
    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      updateSongInPamphlet(
        userID,
        sanghefte,
        songID,
        title,
        text,
        artist
      ).catch(console.error);
    }
    toast({
      title: "Sang er redigert.",
      description: "Den oppdaterte sangen ligger nå i heftet.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const backToMenu = () => {
    navigate("/");
  };

  useEffect(() => {
    const userID = localStorage.getItem(localStorage_userIdKey);
    if (userID) getSong(userID, sanghefte, songID).then((r) => setSongInfo(r));
  }, []);

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="100vh"
      px={8}
    >
      <Container>
        <VStack spacing={3}>
          <Heading>Rediger sang</Heading>
          <Divider />
          <Heading size="sm"> Tittel </Heading>
          <Input
            textAlign="center"
            value={songInfo && songInfo.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Heading size="sm"> Artist </Heading>
          <Input
            textAlign="center"
            value={songInfo && songInfo.creator}
            onChange={(e) => setArtist(e.target.value)}
          />
          <Heading size="sm"> Sangtekst </Heading>
          <Textarea
            textAlign="center"
            value={songInfo && songInfo.text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={updateSong} isFullWidth colorScheme="teal">
            Lagre endringer
          </Button>
          <Button isFullWidth onClick={backToMenu}>
            Tilbake
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};
