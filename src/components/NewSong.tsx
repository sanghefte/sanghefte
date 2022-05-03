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
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_image.jpg";
import { ArrowBackIcon, SmallAddIcon } from "@chakra-ui/icons";

export const NewSong = () => {
  const toast = useToast(); //ChakraUI funksjon for å få en bekreftelses-toast https://chakra-ui.com/docs/feedback/toast
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();

  const pamphletTitle = sessionStorage.getItem("currentPamphlet_title");
  const localStorage_userIdKey = "userID";

  const handleClick_addSongToPamphlet = async () => {
    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null && pamphletTitle !== null) {
      await createSong(userID, pamphletTitle, title, text, artist).catch(
        console.error
      );
      setText("");
      setTitle("");
      setArtist("");
    }
    toast({
      title: "Sang lagt til.",
      description: "Sangen har blitt lagt til i sangheftet.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  /**
   * Takes the user to the hub if it exists
   */
  const handleClick_goBackToMyPamphlets = () => {
    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      navigate("/pamphletMenu");
    }
  };

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="100vh"
      px={8}
      backgroundImage={backgroundImage}
      backgroundSize={"cover"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Container>
        <VStack bg={"whitesmoke"} p={7} borderRadius={"lg"} spacing={3}>
          <Heading>Legg til ny sang i</Heading>
          <Heading>{pamphletTitle}</Heading>
          <Divider />
          <Heading size="sm"> Tittel </Heading>
          <Input
            textAlign="center"
            placeholder="Legg til sangtittel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Heading size="sm"> Artist </Heading>
          <Input
            textAlign="center"
            placeholder="Legg til artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <Heading size="sm"> Sangtekst </Heading>
          <Textarea
            textAlign="center"
            placeholder="Legg inn sangtekst"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleClick_addSongToPamphlet}
            isFullWidth
            colorScheme="teal"
            rightIcon={<SmallAddIcon marginTop={1} />}
          >
            Legg til sang
          </Button>
          <Button
            isFullWidth
            onClick={handleClick_goBackToMyPamphlets}
            rightIcon={<ArrowBackIcon marginTop={1} />}
          >
            Tilbake til Mine Sanghefter
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};
