import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateGetItemTranslationTypes = {
  getItemId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateGetItemTranslationOnMutationTypes = {
  itemDescription?: string;
  buttonText?: string;
  itemName?: string;
};

export default function useUpdateGetItemTranslation({
  getItemId,
  language,
}: UpdateGetItemTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      buttonText,
      itemDescription,
      itemName,
    }: UpdateGetItemTranslationOnMutationTypes) =>
      await axiosCustomized.patch(
        `/translations/plotFieldCommands/getItems/${getItemId}`,
        {
          currentLanguage: language,
          itemName,
          itemDescription,
          buttonText,
        }
      ),
  });
}
