import React, { useEffect, useState } from "react";
import { Container, Text, Heading } from "@chakra-ui/react";
import { getAllSongs, Song } from "../util/firestoreFunctions";
import { useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
//import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const SongContainer = () => {
  const [data, setData] = useState<Array<Song>>([]);
  const sanghefteId = useRecoilValue(sanghefteState);

  useEffect(() => {
    const fetchSongs = async () => {
      setData([]);
      await getAllSongs(sanghefteId).then((r) => setData(r));
    };
    fetchSongs();
  }, [sanghefteId, setData]);

  return (
    <div className="carousel-wrapper">
      <Carousel swipeScrollTolerance={100} showIndicators={false}>
        {data &&
          data.map((d, index) => {
            return (
              <Container key={index}>
                <Heading mt={5}>{d.title}</Heading>
                <Text as="i">Av: {d.creator}</Text>
                <Text mt={3}>{d.text}</Text>
              </Container>
            );
          })}
      </Carousel>
    </div>
  );
};
