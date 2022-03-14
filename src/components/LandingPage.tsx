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
import { sanghefteState, userState } from "../store/store";

interface Props {
  func: () => void;
  func2: () => void;
}

export const LandingPage = ({ func, func2 }: Props) => {
  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const [userWord, setUserWord] = useRecoilState(sanghefteState);
  const [userID, setUserID] = useRecoilState(userState);

  const handleButton = () => {
    func();
    createSanghefte(userWord, userID);
  };

  const makeUser = () => {
    const uniqueID = "id" + new Date().getTime();
    setUserID(uniqueID);
    generateUser(userID);
  };

  const handleButton2 = () => {
    func2();
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
            <Box p={5} borderRadius="lg" shadow="md" bg={bgcolor}>
              <Button
                isFullWidth
                mt={3}
                onClick={makeUser}
                //variant="outline"
              >
                Generate user
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
};
