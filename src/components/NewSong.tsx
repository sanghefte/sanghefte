import React, { useState } from "react";
import {
  useToast,
  Flex,
  Input,
  Container,
  VStack,
  Button,
  Heading,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { createSong } from "../util/firestoreFunctions";
import { useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";

export const NewSong = () => {
  const toast = useToast(); //ChakraUI funksjon for å få en bekreftelses-toast https://chakra-ui.com/docs/feedback/toast
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [artist, setArtist] = useState("");
  const sanghefte = useRecoilValue(sanghefteState);

  const handleClick = () => {
    toast({
      title: "Sang lagt til.",
      description: "Sangen har blitt lagt til i sangheftet.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    createSong(sanghefte, title, text, artist, "fintakt");
  };

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
          <Heading>Legg til ny sang</Heading>
          <Divider />
          <Heading size="sm"> Tittel </Heading>
          <Input
            textAlign="center"
            placeholder="Legg til sangtittel"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Heading size="sm"> Artist </Heading>
          <Input
            textAlign="center"
            placeholder="Legg til artist"
            onChange={(e) => setArtist(e.target.value)}
          />
          <Heading size="sm"> Sangtekst </Heading>
          <Textarea
            textAlign="center"
            placeholder="Legg inn sangtekst"
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleClick} isFullWidth colorScheme="teal">
            Legg til ny sang
          </Button>
          <Button isFullWidth>Fullfør sanghefte</Button>
        </VStack>
      </Container>
    </Flex>
  );
};
