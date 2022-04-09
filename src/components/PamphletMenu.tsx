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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";
import { QRCodeSVG } from "qrcode.react";

export const PamphletMenu = () => {
  const [pamphlets, setPamphlets] = useState<Array<Pamphlet>>([]);
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [, setSanghefte] = useRecoilState(sanghefteState);
  const sanghefte = useRecoilValue(sanghefteState);

  const [pamphletMagicLink, setPamphletMagicLink] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copyLinkBackgroundColor, setCopyLinkBackgroundColor] =
    useState("white");

  const localStorage_userReferenceKey = "userReference";
  const userReference = localStorage.getItem(localStorage_userReferenceKey);

  const updateMagicLink = () => {
    if (userReference !== null) {
      setPamphletMagicLink(
        "sanghefte.no/sing/" + userReference + "/" + sanghefte
      );
    }
  };

  useEffect(() => {
    const fetchPamphlets = async () => {
      setPamphlets([]);
      if (userID) await getAllPamphlets(userID).then((r) => setPamphlets(r));
    };
    fetchPamphlets();
  }, [userID, setPamphlets]);

  const deletePamphlet = async (pamphletID: string) => {
    if (userID) await deleteSanghefte(userID, pamphletID);
    refreshPage();
  };

  const handleButton = () => {
    navigate("/pamphlet");
  };

  function refreshPage() {
    window.location.reload();
  }

  const addSong = (songpamphlet: string) => {
    setSanghefte(songpamphlet);
    navigate("/newsong");
  };
  require("qrcode.react");
  return (
    <>
      <Button onClick={handleButton}>+</Button>
      <Accordion allowToggle>
        {pamphlets.map((pamphlet) => (
          <AccordionItem key={pamphlet.id}>
            <h1>
              <AccordionButton onClick={() => setSanghefte(pamphlet.id)}>
                <Box>{pamphlet.id}</Box>
              </AccordionButton>
            </h1>
            <AccordionPanel>
              <PamphletContent pamphletId={pamphlet.id!} />
              <br />
              <Button onClick={() => deletePamphlet(pamphlet.id)}>
                Delete pamphlet
              </Button>
              <Button
                onClick={() => {
                  onOpen();
                  updateMagicLink();
                  setCopyLinkBackgroundColor("white");
                }}
              >
                Share
              </Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Link til ditt hefte:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p>{pamphletMagicLink}</p>
                    <QRCodeSVG
                      value={pamphletMagicLink}
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
                        navigator.clipboard.writeText(pamphletMagicLink);
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

              <Button onClick={() => addSong(pamphlet.id)}>Add song</Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
