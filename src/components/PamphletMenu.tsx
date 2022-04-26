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
import { QRCodeSVG } from "qrcode.react";

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
      <Button onClick={handleClick_createNewPamphlet}>+ Lag nytt hefte</Button>
      <Accordion allowToggle>
        {pamphlets.map((pamphlet) => (
          <AccordionItem key={pamphlet.id}>
            <h1>
              <AccordionButton
                onClick={() =>
                  sessionStorage.setItem("currentPamphlet_title", pamphlet.id)
                }
              >
                <Box>{pamphlet.id}</Box>
              </AccordionButton>
            </h1>
            <AccordionPanel>
              <PamphletContent pamphletId={pamphlet.id!} />
              <br />
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

              {/* Popup-window for Sharing */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Link til ditt hefte:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <a href={linkTopamphlet} target={"_blank"} rel={"noopener noreferrer"}>{linkTopamphlet}</a>
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
              </Modal>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
