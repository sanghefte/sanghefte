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
import { createSanghefte } from "../util/firestoreFunctions";
import { useRecoilState } from "recoil";
import { sanghefteState } from "../store/store";

interface Props {
  func: () => void;
}

export const LandingPage = ({ func }: Props) => {
  const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  const [userWord, setUserWord] = useRecoilState(sanghefteState);

  const handleButton = () => {
    func();
    createSanghefte(userWord);
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
