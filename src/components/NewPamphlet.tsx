import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { createSanghefte, generateUser } from "../util/firestoreFunctions";
import backgroundImage from "../assets/background_image.jpg";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export const NewPamphlet = () => {
  const { width, height } = useWindowSize();
  const toast = useToast();
  const [pamphletTitle, setPamphletTitle] = useState("");

  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const navigate = useNavigate();

  /* Local storage */
  const localStorage_userIdKey = "userID";

  const handleButton_createPamphlet = async () => {
    if (pamphletTitle === "") {
      toast({
        title: "Feil input",
        description: "Fyll inn Navn på Sanghefte",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (
      pamphletTitle.includes("/") ||
      pamphletTitle.includes(".") ||
      pamphletTitle.includes("(") ||
      pamphletTitle.includes(")")
    ) {
      toast({
        title: "Feil input",
        description: "Navn på Sanghefte kan ikke inneholde / ) ( eller . ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    /* Sjekke om localstorage allerede har en brukerID */
    if (!localStorage.getItem(localStorage_userIdKey)) {
      await generateUser().catch(console.error);
    }

    await sessionStorage.setItem("currentPamphlet_title", pamphletTitle);

    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      await createSanghefte(pamphletTitle, userID).catch(console.error);
    }

    navigate("/newsong");
  };

  return (
    <Box>
      <Confetti width={width} height={height} numberOfPieces={60} />
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
          <VStack>
            <Heading color={"yellow"} marginBottom={3} size={"2xl"}>
              Sanghefte.no
            </Heading>
            <Heading color={"yellow.200"} paddingBottom={10} size={"lg"}>
              Lag, del og syng!
            </Heading>
            <Box p={5} borderRadius="lg" shadow="md" bg={bgcolor}>
              <Input
                size="lg"
                placeholder="Navn på ditt sanghefte"
                textAlign={"center"}
                onChange={(e) => setPamphletTitle(e.target.value)}
              />
              <Button
                isFullWidth
                mt={3}
                onClick={handleButton_createPamphlet}
                //variant="outline"
              >
                Opprett Sanghefte
              </Button>
              <Button
                isFullWidth
                mt={3}
                onClick={() => navigate("/pamphletMenu")}
                //variant="outline"
              >
                Gå til Mine Hefter
              </Button>
            </Box>
          </VStack>
        </Container>
      </Flex>
    </Box>
  );
};
