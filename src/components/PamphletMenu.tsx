import React, { useEffect, useState } from "react";
import { getAllPamphlets, Pamphlet } from "../util/firestoreFunctions";
import { PamphletContent } from "./PhampletContent";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  VStack,
  Container,
  Heading,
  AccordionIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

import backgroundImage from "../assets/background_image.jpg";

export const PamphletMenu = () => {
  const [pamphlets, setPamphlets] = useState<Array<Pamphlet>>([]);
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPamphlets = async () => {
      setPamphlets([]);
      if (userID) await getAllPamphlets(userID).then((r) => setPamphlets(r));
    };
    fetchPamphlets().catch(console.error);
  }, [userID, setPamphlets]);

  const handleClick_createNewPamphlet = () => {
    navigate("/pamphlet");
  };

  require("qrcode.react");
  return (
    <>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="nowrap"
        minH="100vh"
        px={8}
        p={5}
        backgroundImage={backgroundImage}
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Container>
          <VStack>
            <Heading color={"white"} marginBottom={5}>
              Mine sanghefter
            </Heading>
            <Box
              bg={"whitesmoke"}
              w={{ base: "90vw", md: "60vw", lg: "60vw", xl: "30vw" }}
              minW={{base: "90vw", lg: "550px"}}
              maxW={"600px"}
              p={{ base: 5, md: 7, xl: 10 }}
              borderRadius="lg"
              shadow="md"
            >
              <Accordion allowToggle>
                {pamphlets.map((pamphlet) => (
                  <AccordionItem key={pamphlet.id}>
                    <h1>
                      <AccordionButton
                        onClick={() => {
                          sessionStorage.setItem(
                            "currentPamphlet_title",
                            pamphlet.id
                          );
                        }}
                        _expanded={{
                          bg: "purple.100",
                          border: "0.2px purple",
                          borderRadius: 5,
                        }}
                      >
                        <Box flex={"1"} textAlign={"left"}>
                          {pamphlet.id}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel>
                      <PamphletContent pamphletId={pamphlet.id!} />
                    </AccordionPanel>
                  </AccordionItem>
                ))}
                <AccordionItem>
                  <AccordionButton
                    onClick={handleClick_createNewPamphlet}
                    borderRadius={5}
                    marginTop={5}
                    bg={"green.100"}
                    _hover={{ bg: "green.200" }}
                  >
                    <Box flex={"1"} textAlign={"left"}>
                      Opprett nytt sanghefte
                    </Box>
                    <AddIcon fontSize="10px" marginRight={1} />
                  </AccordionButton>
                </AccordionItem>
              </Accordion>
            </Box>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};
