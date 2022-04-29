import React, { useEffect, useRef, useState } from "react";
import { deleteSanghefte, deleteSong, getAllSongs, Song } from "../util/firestoreFunctions";
import {
  Accordion,
  Button,
  Container,
  VStack,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Heading, Divider,
  Center, HStack, Flex, IconButton,
  Text, Tooltip, useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon, DeleteIcon, LinkIcon, EmailIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const PamphletContent: React.FC<{ pamphletId: string }> = ({
  pamphletId,
}) => {
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [songsData, setSongsData] = useState<Array<Song>>([]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);

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
    navigate("/updatesong");
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
          <VStack bg={"white"} marginTop={-1} p={{base: 3, md: 6, xl: 10}} borderRadius="md" shadow="md">

            <Box>
              <Heading size={"md"} marginTop={{base: 0, md: -2}} marginBottom={2}>Sangliste</Heading>
            </Box>


            <Accordion allowToggle w={"100%"}>
              {songsData &&
                songsData.map((song) => [
                  <AccordionItem key={song.id}>
                    <Flex
                      align="center"
                      justify={{ base: "space-between", md: "space-between", xl: "space-between" }}
                      direction={{ base: "row", md: "row" }}
                      wrap="nowrap"
                      h={"40px"}
                      paddingLeft={4}
                    >
                        <Text >{song.title}</Text>
                      <Box>
                        <Tooltip label='Rediger sang' fontSize='sm'>
                          <IconButton variant='outline'
                                      colorScheme='teal'
                                      aria-label='Send email'
                                      size={"xs"}
                                      icon={<EditIcon />}
                                      onClick={() => handleClick_updateSong(song.id)}
                          />
                        </Tooltip>
                        <Tooltip label='Slett sang' fontSize='sm'>
                          <IconButton variant='outline'
                                      colorScheme='teal'
                                      aria-label='Send email'
                                      size={"xs"}
                                      marginLeft={1}
                                      bg={"red.50"}
                                      _hover={{bg: "red.300"}}
                                      onClick={() => handleClick_deleteSong(song.id)}
                                      icon={<DeleteIcon />}
                          />
                        </Tooltip>
                      </Box>
                    </Flex>
                  </AccordionItem>
                ])
              }
              <AccordionItem>
                <AccordionButton bg={"green.50"} _hover={{bg: "green.100"}}>
                  <Box flex={"1"} textAlign={"left"}>Ny sang</Box>
                  <AddIcon fontSize='10px' marginRight={1} />
                </AccordionButton>
              </AccordionItem>
            </Accordion>

            <Flex
              align="center"
              justify={{ base: "space-between", sm: "space-between", md: "space-between", xl: "space-between" }}
              direction={{ base: "column", sm: "row", md: "row", xl: "row" }}
              wrap="nowrap"
              w={"100%"}
              h={{base: "150px", sm: "100px"}}
              paddingTop={{base: 4, md: 2}}
            >
              <Button w={{base: "90%"}} fontSize={{base: "sm", md: "md"}} flex={0.3} rightIcon={<ViewIcon />} bg={"green.200"} _hover={{bg: "green.300"}}>Vis hefte</Button>
              <Button w={{base: "90%"}} fontSize={{base: "sm", md: "md"}} flex={0.3} rightIcon={<LinkIcon />} bg={"blue.200"} _hover={{bg: "blue.300"}}>Del</Button>
              <Button onClick={onOpen} w={{base: "90%"}} fontSize={{base: "sm", md: "md"}} flex={0.3} rightIcon={<DeleteIcon/>} bg={"red.300"} _hover={{bg: "red.400"}}>Slett hefte</Button>

              {/* Alert window for Deleting Pamphlet */}
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Slett hefte
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Er du sikker? Du kan ikke angre denne handlingen.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Avbryt
                      </Button>
                      <Button colorScheme='red' onClick={() => {handleClick_deletePamphlet(pamphletId).catch(console.error); onClose()}} ml={3}>
                        Slett hefte
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>

            <Box>
            </Box>

          </VStack>
    </>
  );
};
