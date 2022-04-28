import React, { useEffect, useState } from "react";
import { deleteSong, getAllSongs, Song } from "../util/firestoreFunctions";
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
  Center, HStack, Flex, IconButton
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

  useEffect(() => {
    const displayPamphletInfo = async (pamphletID: string) => {
      if (userID) {
        await getAllSongs(pamphletID, userID).then((r) => setSongsData(r));
      }
    };

    displayPamphletInfo(pamphletId).catch(console.error);
  }, [pamphletId, userID]);

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
          <VStack bg={"white"} marginTop={-1} p={{base: 3, md: 6, xl: 10}} borderRadius="sm" shadow="md">

            <Box>
              <Heading size={"md"} marginTop={{base: 0, md: -2}} marginBottom={2}>Sangliste</Heading>
            </Box>


            <Accordion allowToggle w={"100%"}>
              {songsData &&
                songsData.map((song) => [
                  <AccordionItem key={song.id}>
                      <AccordionButton disabled={true}>
                        <Box flex={"1"} textAlign={"left"}>
                          {song.title}
                        </Box>
                        <IconButton variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    size={"xs"}
                                    icon={<EditIcon />}
                        />
                        <IconButton variant='outline'
                                    colorScheme='teal'
                                    aria-label='Send email'
                                    size={"xs"}
                                    marginLeft={1}
                                    icon={<DeleteIcon />}
                        />
                      </AccordionButton>
                    {/*<p>{song.title}</p>
                      <Button onClick={() => handleClick_updateSong(song.id)}>
                        Oppdater sang
                      </Button>
                      <Button onClick={() => handleClick_deleteSong(song.id)}>
                        Slett sang
                      </Button>*/}
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
              <Button w={{base: "90%"}} fontSize={{base: "sm", md: "md"}} flex={0.3} rightIcon={<DeleteIcon/>} bg={"red.300"} _hover={{bg: "red.400"}}>Slett hefte</Button>
            </Flex>

            <Box>
            </Box>

          </VStack>
    </>
  );
};
