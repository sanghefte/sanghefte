import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import {getAllSongs, Song} from "./util/firestoreFunctions";

function App() {
    const [data, setData] = useState<Array<Song>>([]);

    useEffect(() => {
        fetchSongs();

        }, [])

    const fetchSongs = async () => {
        setData([]);
        await getAllSongs().then(r => setData(r));
    }

    return (
        <div>
            {(data && data.map((d, index) =>{
                return (
                    <div key={index}>
                        <h1 >Name: {d.Name}</h1>
                        <h1 >Lyric: </h1>
                        {d.lyrics}
                    </div>
                )
            }))}
      </div>
  );
}

export default App;
