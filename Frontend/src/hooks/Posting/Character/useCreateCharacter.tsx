import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import {
  CharacterTypes,
  SearchCharacterVariationTypes,
} from "../../../features/Character/CharacterListPage";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type CreateCharacterTypes = {
  searchCharacterType: SearchCharacterVariationTypes;
  storyId: string;
  unknownName?: string;
  description?: string;
  name: string;
  nameTag?: string;
  characterType: CharacterTypes;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useCreateCharacter({
  searchCharacterType,
  storyId,
  unknownName,
  description,
  name,
  nameTag,
  characterType,
  language = "russian",
}: CreateCharacterTypes) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story", storyId, "new", "character", name],
    mutationFn: async () =>
      await axiosCustomized.post(`/characters/stories/${storyId}`, {
        name,
        currentLanguage: language,
        unknownName,
        description,
        nameTag,
        type: characterType.toLowerCase(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["story", storyId, "characters", searchCharacterType],
        exact: true,
        type: "active",
      });
    },
  });
}
