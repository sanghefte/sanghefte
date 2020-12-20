import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import './Song.css';
import { Carousel } from 'react-responsive-carousel';
import { Vestlandet } from './songs/Vestlandet';
import { NuKlinger } from './songs/NuKlinger';
import { SognOgFjordane } from './songs/SognOgFjordane';
import { HappyNewYear } from './songs/HappyNewYear';
import { Askepott } from './songs/Askepott';
import { HeyHo } from './songs/HeyHo';
import { GodJul } from './songs/GodJul';

function App() {
  return (
    <div className="App">
      <Carousel showThumbs={false}>
        <Vestlandet />
        <NuKlinger />
        <SognOgFjordane />
        <HappyNewYear />
        <Askepott />
        <HeyHo />
        <GodJul />
      </Carousel>
    </div>
  );
}

export default App;
