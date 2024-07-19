import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { ConditionSignTypes } from "../../../../../../../../types/StoryEditor/PlotField/Condition/ConditionTypes";

type UpdateConditionValueTypes = {
  conditionValueId: string;
  name?: string;
  value?: number;
  sign?: ConditionSignTypes;
};

export default function useUpdateConditionValue({
  conditionValueId,
  name,
  sign,
  value,
}: UpdateConditionValueTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/conditionBlocks/conditionValues/${conditionValueId}`,
        {
          name,
          value,
          sign,
        }
      ),
  });
}
