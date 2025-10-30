
// Fix: Removed circular import of FormData from './types' which was causing a name collision.
export interface FormData {
  outfitCategory: string;
  skinTone: string;
  ethnicity: string;
  age: string;
  lipColor: string;
  eyeColor: string;
  eyelinerStyle: string;
  eyeshadowColors: string;
  nailStyle: string;
  eyeType: string;
  frameShape: string;
  frameColor: string;
  hairColor: string;
  hairDescription: string;
  hairHighlights: string;
  hairAccessory: string;
  outfitStyle: string;
  outfitColor: string;
  topDescription: string;
  bottomDescription: string;
  indianOutfit: string;
  headwear: string;
  plannerCategory: string;
  plannerType: string;
  plannerPalette: string;
  plannerPropCombination: string;
  layeredOuterwear: string;
  layeredTop: string;
  layeredScarf: string;
  layeredHat: string;
  layeredGloves: string;
  gownStyle: string;
  themedCostume: string;
  summerOutfit: string;
  christmasOutfit: string;
  valentinesOutfit: string;
  chicAutumnOutfit: string;
  chicWinterOutfit: string;
  chicStreetStyle: string;
  freckles: string;
  jewelry: string;
  extraDescription: string;
  style: string;
  sceneDescription: string;
  lightingDescription: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ColorPalette {
  name: string;
  hair: string[];
  eyes: string[];
  lips: string[];
  eyeshadow: string[];
  outfitStyle: string[];
  tops: string[];
  bottoms: string[];
}