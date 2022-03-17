import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NewSong } from "./components/NewSong";
import { LandingPage } from "./components/LandingPage";
import { RecoilRoot } from "recoil";
import { SongContainer } from "./components/SongContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/newsong" element={<NewSong />} />
            <Route path="/sing" element={<SongContainer />} />
          </Routes>
        </BrowserRouter>
        ,
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
