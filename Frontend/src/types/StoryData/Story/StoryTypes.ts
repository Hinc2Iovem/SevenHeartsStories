import { EpisodeStatusTypes } from "../Episode/EpisodeTypes";

export type StoryTypes = {
  _id: string;
  amountOfEpisodes: number;
  storyStatus: EpisodeStatusTypes;
  imgUrl?: string;
};
