import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import {getAllSongs, Song, createSanghefte, deleteSanghefte} from "./util/firestoreFunctions";

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
            <input type={"text"} onChange={e => setSanghefteName(e.target.value)}/>
            <button onClick={() => createSanghefte(sanghefteName)}>Create Sanghefte</button>
            <button onClick={() => deleteSanghefte(sanghefteName)}>Delete Sanghefte</button>
        </div>
  );
}


export default App;
