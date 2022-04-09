import React from "react";
import {
  Flex,
  Box,
  Input,
  Container,
  VStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { createSanghefte, generateUser } from "../util/firestoreFunctions";
import { useRecoilState } from "recoil";
import { sanghefteState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { PamphletMenu } from "./PamphletMenu";

export const LandingPage = () => {
  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const [pamphletTitle, setPamphletTitle] = useRecoilState(sanghefteState);
  const navigate = useNavigate();

  /* Local storage */
  const localStorage_userIdKey = "userID";

  const handleButton = async () => {
    /* Sjekke om localstorage allerede har en brukerID */
    if (!localStorage.getItem(localStorage_userIdKey)) {
      await generateUser().catch(console.error);
    }

    const userID = localStorage.getItem(localStorage_userIdKey);

    if (userID !== null) {
      await createSanghefte(pamphletTitle, userID).catch(console.error);
    }

    setPamphletTitle(pamphletTitle);

    navigate("/newsong");
  };

  if (!localStorage.getItem(localStorage_userIdKey)) {
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
                  placeholder="Navn på ditt sanghefte (eks: 'Bursdagsfest')"
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
              </Box>
            </VStack>
          </Container>
        </Flex>
      </Box>
    );
  } else return <PamphletMenu />;
};
