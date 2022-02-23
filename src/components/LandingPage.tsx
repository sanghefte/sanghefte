import React from "react";
import { Link, Flex, Box, Input, Container, VStack, Button, useColorModeValue } from "@chakra-ui/react";
import { Header } from "./Header";

export const LandingPage = () => {
    const bgcolor = useColorModeValue("white", "whiteAlpha.50");
  return (
    <Box>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="nowrap"
        minH="100vh"
        px={8}
        //bg="blue.800"
      >
        <Container>
          <VStack>
            <Box p={5} borderRadius="lg" shadow="md" bg={bgcolor}>
              <Input size="lg" placeholder="Enter PIN" />
              <Button
                isFullWidth
                mt={3}
                //variant="outline"
              >
                Enter
              </Button>
            </Box>
          </VStack>
        </Container>
      </Flex>
    </Box>
  );
};
