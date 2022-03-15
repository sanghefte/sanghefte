import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NewSong } from "./components/NewSong";
import { LandingPage } from "./components/LandingPage";
import { RecoilRoot } from "recoil";
import { SongContainer } from "./components/SongContainer";

function App() {
  const [input, setInput] = useState("");
  const updateInput = () => {
    setInput("noe");
  };

  const updateInput2 = () => {
    setInput("noe2");
  };

  return (
    <ChakraProvider>
      <RecoilRoot>
        {input === "" ? (
          <LandingPage func={updateInput} func2={updateInput2} />
        ) : input === "noe" ? (
          <NewSong />
        ) : (
          <SongContainer />
        )}
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
