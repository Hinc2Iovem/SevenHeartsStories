import { useQuery } from "@tanstack/react-query";
import { TranslationCharacteCharacteristicTypes } from "../../../types/Additional/TranslationTypes";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetTranslationCharacteristicTypes = {
  characterCharacteristicId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useGetTranslationCharacteristic({
  characterCharacteristicId,
  language = "russian",
}: GetTranslationCharacteristicTypes) {
  return useQuery({
    queryKey: ["translation", "characteristic", characterCharacteristicId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCharacteCharacteristicTypes[]>(
          `/translations/characterCharacteristics/${characterCharacteristicId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
    enabled: !!characterCharacteristicId,
  });
}
