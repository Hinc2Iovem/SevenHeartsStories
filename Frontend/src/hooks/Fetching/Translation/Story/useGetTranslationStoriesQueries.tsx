import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationStoryTypes } from "../../../../types/Additional/TranslationTypes";
import useGetAllStories from "../../Story/useGetAllStories";

export default function useGetTranslationStoriesQueries({
  language = "russian",
}: {
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  const { data: stories } = useGetAllStories();
  return useQueries({
    queries: (stories ?? []).map((c) => {
      return {
        queryKey: ["translation", language, "story", c._id],
        queryFn: async () =>
          await axiosCustomized
            .get<TranslationStoryTypes[]>(
              `/translations/stories/${c._id}?currentLanguage=${language}`
            )
            .then((r) => r.data),
      };
    }),
  });
}
