import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import { SongContainer } from "./components/SongContainer";
import { Header } from "./components/Header";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Header />
      <SongContainer />
    </ChakraProvider>
  )
}

export default App;
