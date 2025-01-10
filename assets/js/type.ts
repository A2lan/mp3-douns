import { Howl } from "howler";

export type Track = {
  title: string;
  src: string;
  duration: string;
};

export type HowlTrack = {
  title: string;
  src: string;
  duration: string;
  id: number;
  howl: Howl;
};
