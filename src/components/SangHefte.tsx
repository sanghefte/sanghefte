import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Askepott } from '../songs/Askepott';
import { GodJul } from '../songs/GodJul';
import { HappyNewYear } from '../songs/HappyNewYear';
import { HeyHo } from '../songs/HeyHo';
import { JaViElsker } from '../songs/JaViElsker';
import { MellomBakkarOgBerg } from '../songs/MellomBakkarOgBerg';
import { NorgeIRødtHvitOgBlått } from '../songs/NorgeIRødtHvitOgBlått';
import { NuKlinger } from '../songs/NuKlinger';
import { SognOgFjordane } from '../songs/SognOgFjordane';
import { TilUngdommen } from '../songs/TilUngdommen';
import { Vestlandet } from '../songs/Vestlandet';
import { ViEreEnNasjonViMed } from '../songs/ViEreEnNasjonViMed';
import { SongContainer } from './SongContainer';

type Hefte = 'grunnlovsdag' | 'nyttår';

export function SangHefte() {
	const hefte: Hefte = 'nyttår';

	// @ts-ignore
	if (hefte === 'grunnlovsdag') {
		return (
			<div className="App">
				<Carousel showThumbs={false}>
					<TilUngdommen />
					<ViEreEnNasjonViMed />
					<MellomBakkarOgBerg />
					<NorgeIRødtHvitOgBlått />
					<JaViElsker />
					<Vestlandet />
					<NuKlinger />
					<SognOgFjordane />
				</Carousel>
			</div>
		);
	}
	if (hefte === 'nyttår') {
		return (
			<div className="App">
				<Carousel showThumbs={false} swipeScrollTolerance={100} >
					<SongContainer />
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
	return null;
}
