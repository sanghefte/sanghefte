import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import { db } from "./util/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ChakraProvider } from '@chakra-ui/react'
import { LandingPage } from "./components/LandingPage"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"

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
      <ChakraProvider>
        <LandingPage />
      </ChakraProvider>
  );
}

export default App;
