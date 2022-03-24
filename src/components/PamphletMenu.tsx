import React, {useEffect, useState} from "react";
import {getAllPamphlets, Pamphlet} from "../util/firestoreFunctions";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button} from "@chakra-ui/react";


export const PamphletMenu = () => {
    const [pamphlets, setPamphlets] = useState<Array<Pamphlet>>([]);
    const localStorageKey = "userID";
    const userID = localStorage.getItem(localStorageKey);

    useEffect(() => {
        const fetchPamphlets = async () => {
            setPamphlets([]);
            if(userID)
            await getAllPamphlets(userID).then((r) => setPamphlets(r));
        };
        fetchPamphlets();
    }, [userID, setPamphlets]);

    return (
        <>
        <Accordion allowToggle>{pamphlets.map((pamphlet) =>
            <AccordionItem key={pamphlet.id}>
                <h1>
                    <AccordionButton>
                        <Box>
                            {pamphlet.id}
                        </Box>
                    </AccordionButton>
                </h1>
                <AccordionPanel>
                    <Button>Delete</Button>
                    <Button>Update</Button>
                    <Button>Share</Button>
                </AccordionPanel>
            </AccordionItem>)}
        </Accordion>

        </>

    )
}