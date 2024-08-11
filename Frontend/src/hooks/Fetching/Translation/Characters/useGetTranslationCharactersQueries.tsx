import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";
import useGetAllCharactersByStoryId from "../../Character/useGetAllCharactersByStoryId";

export default function useGetTranslationCharactersQueries({
  storyId,
  language = "russian",
}: {
  storyId: string;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  // const queryClient = useQueryClient();
  const { data: characters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });
  // useEffect(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: ["translation", language, "character"],
  //   });
  // }, [language, queryClient]);

  return useQueries({
    queries: (characters ?? []).map((c) => {
      return {
        queryKey: ["translation", language, "character", c._id],
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
