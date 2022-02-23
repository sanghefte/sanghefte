import React from "react";
import { useToast, Link, Flex, Box, Input, Container, VStack, Button, useColorModeValue, Heading, Textarea, Divider } from "@chakra-ui/react";
import { Header } from "./Header";

export const NewSong = () => {
    const toast = useToast() //ChakraUI funksjon for å få en bekreftelses-toast https://chakra-ui.com/docs/feedback/toast

    return(
        <Flex
            align="center"
              justify={{ base: "center", md: "space-around", xl: "space-between" }}
              direction={{ base: "column-reverse", md: "row" }}
              wrap="nowrap"
              minH="100vh"
              px={8}>
            <Container>
                <VStack spacing={3}>
                    <Heading>Legg til ny sang</Heading>
                    <Divider />
                    <Heading size="sm"> Tittel </Heading>
                    <Input textAlign="center" placeholder="Legg til sangtittel"/>
                    <Heading size="sm"> Artist </Heading>
                    <Input textAlign="center" placeholder="Legg til artist"/>
                    <Heading size="sm"> Sangtekst </Heading>
                    <Textarea textAlign="center" placeholder="Legg inn sangtekst" />
                    <Button
                        onClick={() =>
                            toast({
                                title: 'Sang lagt til.',
                                description: "Sangen har blitt lagt til i sangheftet.",
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            })
                        } isFullWidth colorScheme="teal">Legg til ny sang</Button>
                    <Button isFullWidth>Fullfør sanghefte</Button>
                </VStack>
            </Container>
        </Flex>

        )

}