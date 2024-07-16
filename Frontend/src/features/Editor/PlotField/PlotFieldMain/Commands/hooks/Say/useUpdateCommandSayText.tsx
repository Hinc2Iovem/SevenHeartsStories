import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateCommandSayTextTypes = {
  commandSayId: string;
  textValue: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useUpdateCommandSayText({
  commandSayId,
  textValue,
  language = "russian",
}: UpdateCommandSayTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/translations/plotFieldCommands/say/${commandSayId}`,
        {
          currentLanguage: language,
          text: textValue,
        }
      ),
  });
}
