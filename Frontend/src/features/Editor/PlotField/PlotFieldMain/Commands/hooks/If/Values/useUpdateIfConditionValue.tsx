import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { IfValueTypes } from "../../../../../../../../types/StoryEditor/PlotField/IfCommand/IfCommandTypes";
import { ConditionSignTypes } from "../../../../../../../../types/StoryEditor/PlotField/Condition/ConditionTypes";

type UpdateIfConditionValueTypes = {
  ifValueId: string;
  sign: ConditionSignTypes;
  name: string;
  value: number;
};

export default function useUpdateIfConditionValue({
  ifValueId,
  name,
  sign,
  value,
}: UpdateIfConditionValueTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch<IfValueTypes>(
        `/plotFieldCommands/ifs/ifValue/${ifValueId}`,
        {
          name,
          sign,
          value,
        }
      ),
  });
}
