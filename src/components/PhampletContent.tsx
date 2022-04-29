import React, { useEffect, useRef, useState } from "react";
import {
  deleteSanghefte,
  deleteSong,
  getAllSongs,
  Song,
} from "../util/firestoreFunctions";
import {
  Accordion,
  Button,
  VStack,
  AccordionItem,
  AccordionButton,
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ModalFooter,
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AddIcon,
  ViewIcon,
  DeleteIcon,
  LinkIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [songsData, setSongsData] = useState<Array<Song>>([]);

  const [deleteSongOrPamphlet, setDeleteSongOrPamphlet] = useState("pamphlet");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenShare,
    onOpen: onOpenShare,
    onClose: onCloseShare,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Magic link
  const [linkTopamphlet, setLinkToPamphlet] = useState("");
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

  const redirectToPamphletView = () => {
    const pamphletTitle = sessionStorage.getItem("currentPamphlet_title");
    if (userReference !== null && pamphletTitle !== null) {
      const pamphletMagicLink = encodeURI(
        "/sing/" + userReference + "/" + pamphletTitle
      );
      window.open("https://sanghefte.no" + pamphletMagicLink, "_blank");
    }
  };

  require("qrcode.react");

  useEffect(() => {
    const displayPamphletInfo = async (pamphletID: string) => {
      if (userID) {
        await getAllSongs(pamphletID, userID).then((r) => setSongsData(r));
      }
    };

    displayPamphletInfo(pamphletId).catch(console.error);
  }, [pamphletId, userID]);

  const handleClick_deletePamphlet = async (pamphletID: string) => {
    if (userID) await deleteSanghefte(userID, pamphletID);
    refreshPage();
  };

  const handleClick_updateSong = (songID: string) => {
    sessionStorage.setItem("currentSong_id", songID);
    setTimeout(() => {
      navigate("/updatesong");
    }, 50);
  };

  const handleClick_addSong = (pamphletTitle: string) => {
    sessionStorage.setItem("currentPamphlet_title", pamphletTitle);
    navigate("/newsong");
  };

  const handleClick_deleteSong = async (songID: string) => {
    const pamphletTitle = await sessionStorage.getItem("currentPamphlet_title");
    if (userID && pamphletTitle !== null)
      await deleteSong(userID, pamphletTitle, songID);
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <VStack
        bg={"white"}
        marginTop={-1}
        p={{ base: 3, md: 6, xl: 10 }}
        borderRadius="md"
        shadow="md"
      >
        <Box>
          <Heading size={"md"} marginTop={{ base: 0, md: -2 }} marginBottom={2}>
            Sangliste
          </Heading>
        </Box>

        <Accordion allowToggle w={"100%"}>
          {songsData &&
            songsData.map((song) => [
              <AccordionItem key={song.id}>
                <Flex
                  align="center"
                  justify={{
                    base: "space-between",
                    md: "space-between",
                    xl: "space-between",
                  }}
                  direction={{ base: "row" }}
                  wrap="nowrap"
                  h={"40px"}
                  paddingLeft={4}
                >
                  <Text fontSize={{ base: 13, sm: 17 }}>
                    {song.title.substring(0, 20)}
                  </Text>
                  <Box>
                    <Tooltip label="Rediger sang" fontSize="sm">
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="update song"
                        size={"xs"}
                        icon={<EditIcon />}
                        onClick={() => handleClick_updateSong(song.id)}
                      />
                    </Tooltip>
                    <Tooltip label="Slett sang" fontSize="sm">
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Send email"
                        size={"xs"}
                        marginLeft={1}
                        bg={"red.50"}
                        _hover={{ bg: "red.300" }}
                        onClick={() => {
                          setDeleteSongOrPamphlet(song.id);
                          onOpen();
                        }}
                        icon={<DeleteIcon />}
                      />
                    </Tooltip>
                  </Box>
                </Flex>
              </AccordionItem>,
            ])}
          <AccordionItem>
            <AccordionButton
              onClick={() => handleClick_addSong(pamphletId)}
              bg={"green.50"}
              _hover={{ bg: "green.100" }}
            >
              <Box flex={"1"} textAlign={"left"}>
                Ny sang
              </Box>
              <AddIcon fontSize="10px" marginRight={1} />
            </AccordionButton>
          </AccordionItem>
        </Accordion>

        <Flex
          align="center"
          justify={{
            base: "space-between",
            sm: "space-between",
            md: "space-between",
            xl: "space-between",
          }}
          direction={{ base: "column", sm: "row", md: "row", xl: "row" }}
          wrap="nowrap"
          w={"100%"}
          h={{ base: "150px", sm: "100px" }}
          paddingTop={{ base: 4, md: 2 }}
        >
          <Button
            onClick={redirectToPamphletView}
            w={{ base: "90%" }}
            fontSize={{ base: "sm", md: "md" }}
            flex={0.3}
            rightIcon={<ViewIcon />}
            bg={"green.200"}
            _hover={{ bg: "green.300" }}
          >
            <a
              href={linkTopamphlet}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Vis hefte
            </a>
          </Button>
          <Button
            onClick={() => {
              onOpenShare();
              updateMagicLink();
              setCopyLinkBackgroundColor("white");
            }}
            w={{ base: "90%" }}
            fontSize={{ base: "sm", md: "md" }}
            flex={0.3}
            rightIcon={<LinkIcon />}
            bg={"blue.200"}
            _hover={{ bg: "blue.300" }}
          >
            Del
          </Button>
          <Button
            onClick={() => {
              setDeleteSongOrPamphlet("pamphlet");
              onOpen();
            }}
            w={{ base: "90%" }}
            fontSize={{ base: "sm", md: "md" }}
            flex={0.3}
            rightIcon={<DeleteIcon />}
            bg={"red.300"}
            _hover={{ bg: "red.400" }}
          >
            Slett hefte
          </Button>

          {/* Alert window for Deleting Pamphlet */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {deleteSongOrPamphlet === "pamphlet"
                    ? "Slett sanghefte"
                    : "Slett sang"}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Er du sikker? Du kan ikke angre denne handlingen.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Avbryt
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      if (deleteSongOrPamphlet === "pamphlet") {
                        handleClick_deletePamphlet(pamphletId).catch(
                          console.error
                        );
                      } else {
                        handleClick_deleteSong(deleteSongOrPamphlet).catch(
                          console.error
                        );
                      }

                      onClose();
                    }}
                    ml={3}
                  >
                    {deleteSongOrPamphlet === "pamphlet"
                      ? "Slett hefte"
                      : "Slett sang"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          {/*Popup-window for Sharing*/}
          <Modal isOpen={isOpenShare} onClose={onCloseShare}>
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
                <Button colorScheme="blue" mr={3} onClick={onCloseShare}>
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
          </Modal>
        </Flex>
      </VStack>
    </>
  );
};
