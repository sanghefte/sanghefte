import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import { db } from "./util/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [data, setData] = useState([]);

  const dataCollectionRef = collection(db, "songs");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef);
      setData(
        data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      );
    };
    getData();
  }, []);

  return (
    <div>
      {data.map((d, index) => {
        return (
          <div key={index}>
            <h1>Name: {d.Name}</h1>
            <h1>Lyric: </h1>
            {d.lyrics}
          </div>
        );
      })}
    </div>
  );
}

export default App;
