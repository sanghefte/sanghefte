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
  const sanghefte = useRecoilValue(sanghefteState);
  const songID = useRecoilValue(songIDState);
  const navigate = useNavigate();
  const [songTitle, setSongTitle] = useState("");
  const [songCreator, setSongCreator] = useState("");
  const [songText, setSongText] = useState("");

  const localStorage_userIdKey = "userID";

  const updateSong = () => {
    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      updateSongInPamphlet(
        userID,
        sanghefte,
        songID,
        songTitle,
        songText,
        songCreator
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

  const updateValueOfFields = async (result: Song) => {
    setSongTitle(result.title);
    setSongCreator(result.creator);
    setSongText(result.text);
  };

  useEffect(() => {
    const userID = localStorage.getItem(localStorage_userIdKey);
    if (userID)
      getSong(userID, sanghefte, songID).then((r) => updateValueOfFields(r));
  }, [sanghefte, songID]);

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
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <Heading size="sm"> Artist </Heading>
          <Input
            textAlign="center"
            value={songCreator}
            onChange={(e) => setSongCreator(e.target.value)}
          />
          <Heading size="sm"> Sangtekst </Heading>
          <Textarea
            textAlign="center"
            value={songText}
            onChange={(e) => setSongText(e.target.value)}
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

