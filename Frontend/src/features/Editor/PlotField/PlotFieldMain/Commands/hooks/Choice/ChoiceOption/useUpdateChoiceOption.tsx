import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";

type UpdateChoiceOptionTypes = {
  choiceOptionId: string;
  option: string | undefined;
  priceAmethysts: number | undefined;
  amountOfPoints: number | undefined;
  characterCharacteristicId: string | undefined;
  characterId: string | undefined;
};

export default function useUpdateChoiceOption({
  amountOfPoints,
  characterCharacteristicId,
  characterId,
  choiceOptionId,
  option,
  priceAmethysts,
}: UpdateChoiceOptionTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/choices/options/${choiceOptionId}`,
        {
          option,
          priceAmethysts,
          characterId,
          amountOfPoints,
          characterCharacteristicId,
        }
      ),
  });
}
