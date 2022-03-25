import React from "react";
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
import { createSanghefte } from "../util/firestoreFunctions";
import { useRecoilState } from "recoil";
import { sanghefteState } from "../store/store";

export const NewPamphlet = () => {
  const [userWord, setUserWord] = useRecoilState(sanghefteState);

  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();

  const handleButton = async () => {
    if (userID !== null) {
      await createSanghefte(userWord, userID).catch(console.error);
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
          </VStack>
        </Container>
      </Flex>
    </Box>
  );
};
