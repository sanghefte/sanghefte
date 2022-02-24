import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import {getAllSongs, Song, createSanghefte, deleteSanghefte} from "./util/firestoreFunctions";
import {ChakraProvider} from "@chakra-ui/react";
import {NewSong} from "./components/NewSong";

function App() {
    const [data, setData] = useState<Array<Song>>([]);
    const [sanghefteName, setSanghefteName] = useState("")

    useEffect(() => {
        fetchSongs();

        }, [])

    const fetchSongs = async () => {
        setData([]);
        await getAllSongs().then(r => setData(r));
    }

    return (
        <ChakraProvider>
            <NewSong />
        </ChakraProvider>
  );
}


export default App;
