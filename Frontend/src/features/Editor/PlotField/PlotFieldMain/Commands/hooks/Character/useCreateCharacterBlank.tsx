import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import {
  CharacterGetTypes,
  CharacterTypes,
} from "../../../../../../../types/StoryData/Character/CharacterTypes";

type CreateCharacterTypes = {
  storyId: string;
  name: string;
  characterType: CharacterTypes;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useCreateCharacterBlank({
  storyId,
  name,
  characterType,
  language = "russian",
}: CreateCharacterTypes) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["story", storyId, "new", "character", name],
    mutationFn: async () =>
      await axiosCustomized
        .post<CharacterGetTypes>(`/characters/stories/${storyId}/blank`, {
          name,
          currentLanguage: language,
          type: characterType.toLowerCase(),
        })
        .then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["translation", language, "character", "story", storyId],
        exact: true,
        type: "active",
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["plotfieldComamnd", plotFieldCommandId, "say"],
      //   exact: true,
      //   type: "active",
      // });
    },
  });
}
