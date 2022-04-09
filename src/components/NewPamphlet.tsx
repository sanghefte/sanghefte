import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { createSanghefte, generateUser } from "../util/firestoreFunctions";

export const NewPamphlet = () => {
  const [pamphletTitle, setPamphletTitle] = useState("")

  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const navigate = useNavigate();

  /* Local storage */
  const localStorage_userIdKey = "userID";

  const handleButton = async () => {
    /* Sjekke om localstorage allerede har en brukerID */
    if (!localStorage.getItem(localStorage_userIdKey)) {
      await generateUser().catch(console.error);
    }

    await sessionStorage.setItem("currentPamphlet_title", pamphletTitle)

    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      await createSanghefte(pamphletTitle, userID).catch(console.error);
    }

    navigate("/newsong");
  };

  return (
    <Box>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="nowrap"
        minH="100vh"
        px={8}
        //bg="blue.800"
      >
        <Container>
          <VStack>
            <Box p={5} borderRadius="lg" shadow="md" bg={bgcolor}>
              <Input
                size="lg"
                placeholder="Navn på ditt sanghefte (eks: 'Julebord')"
                onChange={(e) => setPamphletTitle(e.target.value)}
              />
              <Button
                isFullWidth
                mt={3}
                onClick={handleButton}
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
