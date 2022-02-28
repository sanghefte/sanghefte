import React from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Header = () => {
  return (
    <Flex p={3} mr={3} right="0" position="fixed">
      <Box />
      <Spacer />
      <Box p={3}>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
};
