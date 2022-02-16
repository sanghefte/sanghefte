import React from "react";
import { Heading, Flex, Spacer } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Header = () => {
  return (
    <Flex p={3} mr={3}>
      <Spacer />
      <ColorModeSwitcher />
    </Flex>
  );
};
