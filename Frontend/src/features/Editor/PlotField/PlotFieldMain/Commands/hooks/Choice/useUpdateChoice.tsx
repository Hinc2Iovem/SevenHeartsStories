import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { ChoiceVariationsTypes } from "../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";

type UpdateChoiceTextTypes = {
  choiceId: string;
};

type UpdateChoiceOnMutationTypes = {
  exitBlockId?: string;
  characterId?: string;
  characterEmotionId?: string;
  choiceType?: ChoiceVariationsTypes;
  timeLimit?: number;
};

export default function useUpdateChoice({ choiceId }: UpdateChoiceTextTypes) {
  return useMutation({
    mutationFn: async ({
      characterEmotionId,
      characterId,
      choiceType,
      exitBlockId,
      timeLimit,
    }: UpdateChoiceOnMutationTypes) => {
      await axiosCustomized.patch(`/plotFieldCommands/choices/${choiceId}`, {
        choiceType,
        timeLimit,
        characterEmotionId,
        characterId,
        exitBlockId,
      });
    },
  });
}
