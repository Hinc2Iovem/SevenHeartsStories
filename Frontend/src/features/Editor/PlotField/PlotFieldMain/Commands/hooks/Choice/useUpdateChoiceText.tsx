import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { ChoiceVariationsTypes } from "../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";

type UpdateChoiceTextTypes = {
  choiceId: string;
  exitBlockId?: string;
  characterId: string;
  characterEmotionId: string;
  isAuthor?: boolean;
  choiceType?: ChoiceVariationsTypes;
  timeLimit?: number;
};

export default function useUpdateChoiceText({
  choiceId,
  characterEmotionId,
  characterId,
  choiceType = "common",
  exitBlockId,
  isAuthor,
  timeLimit,
}: UpdateChoiceTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/choices/${choiceId}`,
        {
          isAuthor,
          choiceType,
          timeLimit,
          characterEmotionId,
          characterId,
          exitBlockId
        }
      ),
  });
}
