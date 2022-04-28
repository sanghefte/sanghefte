import React, { useEffect, useState } from "react";
import {
  deleteSanghefte,
  getAllPamphlets,
  Pamphlet,
} from "../util/firestoreFunctions";
import { PamphletContent } from "./PhampletContent";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  VStack,
  Container,
  Heading,
  AccordionIcon,
  Center, Divider
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { SmallAddIcon, AddIcon } from "@chakra-ui/icons";
import { url } from "inspector";

import backgroundImage from "../assets/background_image.jpg"

export const PamphletMenu = () => {
  const [pamphlets, setPamphlets] = useState<Array<Pamphlet>>([]);
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();

  // Magic link
  const [linkTopamphlet, setLinkToPamphlet] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copyLinkBackgroundColor, setCopyLinkBackgroundColor] =
    useState("white");

  const localStorage_userReferenceKey = "userReference";
  const userReference = localStorage.getItem(localStorage_userReferenceKey);

  const updateMagicLink = () => {
    const pamphletTitle = sessionStorage.getItem("currentPamphlet_title");
    if (userReference !== null && pamphletTitle !== null) {
      const pamphletMagicLink = encodeURI(
        "/sing/" + userReference + "/" + pamphletTitle
      );
      setLinkToPamphlet("https://sanghefte.no" + pamphletMagicLink);
    }
  };

  useEffect(() => {
    const fetchPamphlets = async () => {
      setPamphlets([]);
      if (userID) await getAllPamphlets(userID).then((r) => setPamphlets(r));
    };
    fetchPamphlets().catch(console.error);
  }, [userID, setPamphlets]);

  const handleClick_deletePamphlet = async (pamphletID: string) => {
    if (userID) await deleteSanghefte(userID, pamphletID);
    refreshPage();
  };

  const handleClick_createNewPamphlet = () => {
    navigate("/pamphlet");
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleClick_addSong = (pamphletTitle: string) => {
    sessionStorage.setItem("currentPamphlet_title", pamphletTitle);
    navigate("/newsong");
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
        backgroundImage={backgroundImage}
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Container>
          <VStack>
            <Heading color={"white"} marginBottom={5}>MINE HEFTER</Heading>
            <Box bg={"whitesmoke"} w={{base: "90vw", md: "60vw", xl: "30vw"}} maxW={"600px"} p={{base: 5, md: 7, xl: 10}} borderRadius="lg" shadow="md">
              <Accordion allowToggle>
                {pamphlets.map((pamphlet) => (
                  <AccordionItem key={pamphlet.id}>
                    <h1>
                      <AccordionButton
                        onClick={() =>
                          sessionStorage.setItem("currentPamphlet_title", pamphlet.id)
                        }
                        _expanded={{ bg: "blue.50" }}
                      >
                        <Box flex={"1"} textAlign={"left"}>{pamphlet.id}</Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel>
                      <PamphletContent pamphletId={pamphlet.id!} />
                      {/*<br />
                      <Button onClick={() => handleClick_addSong(pamphlet.id)}>
                        Legg til sang
                      </Button>
                      <Button onClick={() => handleClick_deletePamphlet(pamphlet.id)}>
                        Slett hefte
                      </Button>
                      <Button
                        onClick={() => {
                          onOpen();
                          updateMagicLink();
                          setCopyLinkBackgroundColor("white");
                        }}
                      >
                        Del hefte
                      </Button>

                      //Popup-window for Sharing
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Link til ditt hefte:</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <a
                              href={linkTopamphlet}
                              target={"_blank"}
                              rel={"noopener noreferrer"}
                            >
                              {linkTopamphlet}
                            </a>
                            <QRCodeSVG
                              value={linkTopamphlet}
                              size={128}
                              bgColor={"#ffffff"}
                              fgColor={"#000000"}
                              level={"L"}
                              includeMargin={false}
                            />
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                              Lukk
                            </Button>
                            <Button
                              color={
                                copyLinkBackgroundColor === "white" ? "black" : "white"
                              }
                              backgroundColor={copyLinkBackgroundColor}
                              variant="ghost"
                              onClick={() => {
                                navigator.clipboard.writeText(linkTopamphlet);
                                setCopyLinkBackgroundColor("#4BB543");
                              }}
                            >
                              {copyLinkBackgroundColor === "white"
                                ? "Kopiér Link"
                                : "Link Kopiert!"}
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>*/}
                    </AccordionPanel>
                  </AccordionItem>


                ))}
                <AccordionItem>
                  <AccordionButton onClick={handleClick_createNewPamphlet} marginTop={5} bg={"green.100"} _hover={{bg: "green.100"}}>
                    <Box flex={"1"} textAlign={"left"}>Opprett nytt sanghefte</Box>
                    <AddIcon fontSize='10px' marginRight={1} />
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
