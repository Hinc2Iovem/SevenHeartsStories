import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";
import useGetAllCharactersByStoryId from "../../Character/useGetAllCharactersByStoryId";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

export default function useGetTranslationCharactersQueries({
  storyId,
  language = "russian",
}: {
  storyId: string;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  const { data: characters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });

  return useQueries({
    queries: (characters ?? []).map((c) => {
      return {
        queryKey: ["translation", "character", c._id],
        queryFn: async () =>
          await axiosCustomized
            .get<TranslationCharacterTypes[]>(
              `/translations/characters/${c._id}?currentLanguage=${language}`
            )
            .then((r) => r.data),
      };
    }),
  });
}
