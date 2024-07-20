import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateWardrobeTextTypes = {
  commandWardrobeId: string;
  title: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useUpdateWardrobeTranslationText({
  commandWardrobeId,
  title,
  language = "russian",
}: UpdateWardrobeTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/translations/plotFieldCommands/wardrobes/${commandWardrobeId}`,
        {
          currentLanguage: language,
          title,
        }
      ),
  });
}
