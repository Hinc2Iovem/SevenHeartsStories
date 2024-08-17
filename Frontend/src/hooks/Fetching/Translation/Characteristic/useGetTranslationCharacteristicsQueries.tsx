import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterCharacteristicTypes } from "../../../../types/Additional/TranslationTypes";
import useGetAllCharacteristicsByStoryId from "../../CharacterCharacteristic/useGetAllCharacteristicsByStoryId";

export default function useGetTranslationCharacteristicsQueries({
  storyId,
  language = "russian",
}: {
  storyId: string;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  const { data: characteristics } = useGetAllCharacteristicsByStoryId({
    storyId: storyId ?? "",
  });
  return useQueries({
    queries: (characteristics ?? []).map((c) => {
      return {
        queryKey: ["translation", language, "characteristic", c._id],
        queryFn: async () =>
          await axiosCustomized
            .get<TranslationCharacterCharacteristicTypes[]>(
              `/translations/characterCharacteristics/${c._id}?currentLanguage=${language}`
            )
            .then((r) => r.data),
      };
    }),
  });
}
