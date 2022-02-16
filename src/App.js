import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "./Song.css";
import {db} from "./util/firebase-config"
import {collection, getDocs, setDoc, doc} from "firebase/firestore"
import { ChakraProvider, Button, Input  } from '@chakra-ui/react'

function App() {
const [data, setData] = useState([]);
const [sanghefteTitle, setSanghefteTitle] = useState();


const sanghefterRef = collection(db, "sanghefter")
const dataCollectionRef = collection(db, "songs");

useEffect(() => {
  const getData = async() => {
    const data = await getDocs(dataCollectionRef);
    setData(data.docs.map((doc)=>({
      ...doc.data(), id: doc.id,
    })))
  }
  getData()
  }, [])

  const createNewSang = async () => {
    await setDoc(doc(db, "sanghefter", sanghefteTitle), {
    });

  }

  return (
    <ChakraProvider>
      <Input placeholder={"Sanghefte tittel"} onChange={e => setSanghefteTitle(e.target.value)}></Input>
      <Button onClick={createNewSang} >Test</Button>
    </ChakraProvider>
  );
}

export default App;
