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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {sanghefteState} from "../store/store";

export const PamphletMenu = () => {
  const [pamphlets, setPamphlets] = useState<Array<Pamphlet>>([]);
  const localStorageKey = "userID";
  const userID = localStorage.getItem(localStorageKey);
  const navigate = useNavigate();
  const [sanghefte, setSanghefte] = useRecoilState(sanghefteState)

  useEffect(() => {
    const fetchPamphlets = async () => {
      setPamphlets([]);
      if (userID) await getAllPamphlets(userID).then((r) => setPamphlets(r));
    };
    fetchPamphlets();
  }, [userID, setPamphlets]);

  const deletePamphlet = async (pamphletID: string) => {
    if (userID) await deleteSanghefte(userID, pamphletID);
  };

  const handleButton = () => {
    navigate("/pamphlet");
  };

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
              <br/>
              <Button onClick={() => deletePamphlet(pamphlet.id)}>
                Delete
              </Button>
              <Button>Share</Button>
              <Button>Add song</Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
