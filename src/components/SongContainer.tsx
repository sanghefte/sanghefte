import React from "react";
import { Container, Text, Heading } from "@chakra-ui/react";

export const SongContainer = () => {
  return (
    <Container mt={3}>
      <Heading>Nu klinger</Heading>
      <Text as="i">Av: Studentersamfundet</Text>
      <Text mt={3}>
        Nu klinger igjennom den gamle stad, påny en studentersang,
        <br />
        og alle mann alle i rekker og rad, svinger opp under begerklang!
        <br />
        Og mens borgerne våkner i køia og hører det glade "kang-kang",
        <br />
        stemmer alle mann, alle mann, alle mann, alle mann, alle mann, alle mann
        an;
      </Text>
    </Container>
  );
};
