import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import {getAllSongs, Song} from "./util/firestoreFunctions";
import {ChakraProvider} from "@chakra-ui/react";
import {NewSong} from "./components/NewSong";
import {LandingPage} from "./components/LandingPage";
import {RecoilRoot} from "recoil";

function App() {
    const [data, setData] = useState<Array<Song>>([]);

    useEffect(() => {
        fetchSongs();

        }, [])

    const fetchSongs = async () => {
        setData([]);
        await getAllSongs().then(r => setData(r));
    }

    const [input, setInput] = useState("")

    const updateInput = () => {
        setInput("noe")
    }

    useEffect(() =>{
        console.log(input)
    }, [input])

    return (
        <ChakraProvider>
            <RecoilRoot>
                {input == "" ? <LandingPage func={updateInput}/> : <NewSong />}
            </RecoilRoot>
        </ChakraProvider>
  );
}


export default App;
