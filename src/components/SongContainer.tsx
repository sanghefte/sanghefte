import React, { useEffect, useState } from "react";
import { Container, Text, Heading, Button, IconButton } from "@chakra-ui/react";
import { getAllSongs, Song } from "../util/firestoreFunctions";
import { useRecoilValue } from "recoil";
import { sanghefteState } from "../store/store";
import { Carousel } from "react-responsive-carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const SongContainer = () => {
  const [data, setData] = useState<Array<Song>>([]);
  const sanghefteId = useRecoilValue(sanghefteState);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setData([]);
    await getAllSongs(sanghefteId).then((r) => setData(r));
  };

  return (
    <Carousel
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <IconButton
            aria-label={labelPrev}
            icon={<ArrowLeftIcon />}
            onClick={clickHandler}
          />
        )
      }
      renderArrowNext={(clickHandler, hasNext, labelNext) =>
        hasNext && (
          <IconButton
            aria-label={labelNext}
            icon={<ArrowRightIcon />}
            onClick={clickHandler}
          />
        )
      }
      swipeScrollTolerance={100}
      showIndicators={false}
    >
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
  );
};
