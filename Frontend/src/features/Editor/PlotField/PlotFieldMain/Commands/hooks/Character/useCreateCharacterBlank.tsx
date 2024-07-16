import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CharacterGetTypes } from "../../../../../../../types/StoryData/Character/CharacterTypes";
import { CharacterTypes } from "../../../../../../Character/CharacterListPage";

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
  //   const queryClient = useQueryClient();

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
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["story", storyId, "characters", searchCharacterType],
    //     exact: true,
    //     type: "active",
    //   });
    // },
  });
}
