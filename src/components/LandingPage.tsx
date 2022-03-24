import React from "react";
import {
  Flex,
  Box,
  Input,
  Container,
  VStack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  checkIfPamphletExist,
  createSanghefte,
  generateUser,
} from "../util/firestoreFunctions";
import { useRecoilState, useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {PamphletMenu} from "./PamphletMenu";

export const LandingPage = () => {
  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const [userWord, setUserWord] = useRecoilState(sanghefteState);
  const toast = useToast(); //ChakraUI funksjon for å få en bekreftelses-toast https://chakra-ui.com/docs/feedback/toast
  const sanghefteId = useRecoilValue(sanghefteState);
  const navigate = useNavigate();

  /* Local storage */
  const localStorageKey = "userID";

  const handleButton = async () => {
    /* Sjekke om localstorage allerede har en brukerID */
    if (!localStorage.getItem(localStorageKey)) {
      await generateUser().catch(console.error);
    }

    const userID = localStorage.getItem(localStorageKey);

    if (userID !== null) {
      await createSanghefte(userWord, userID).catch(console.error);
    }

    navigate("/newsong");
  };

  const handleButton2 = async () => {
    if (await checkIfPamphletExist(sanghefteId, "sanghefter")) {
      console.log("Success! vi fant sanghefte", sanghefteId);
      navigate("/sing");
    } else {
      toast({
        title: "Fant ikke sanghefte med id: " + sanghefteId,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("fant ikke hefte med sanghefteID: ", sanghefteId);
    }
  };

if(!localStorage.getItem(localStorageKey)) {
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
                    placeholder="Your Pin"
                    onChange={(e) => setUserWord(e.target.value)}
                />
                <Button
                    isFullWidth
                    mt={3}
                    onClick={handleButton}
                    //variant="outline"
                >
                  Create Sanghefte
                </Button>
              </Box>
              <Box p={5} borderRadius="lg" shadow="md" bg={bgcolor}>
                <Input
                    size="lg"
                    placeholder="Enter pin"
                    onChange={(e) => setUserWord(e.target.value)}
                />
                <Button
                    isFullWidth
                    mt={3}
                    onClick={handleButton2}
                    //variant="outline"
                >
                  Join
                </Button>
              </Box>
            </VStack>
          </Container>
        </Flex>
      </Box>
  );
} else return (<PamphletMenu />)

};
