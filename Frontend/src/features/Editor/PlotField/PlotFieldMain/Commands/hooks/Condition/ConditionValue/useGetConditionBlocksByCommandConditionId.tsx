import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { ConditionBlockTypes } from "../../../../../../../../types/StoryEditor/PlotField/Condition/ConditionTypes";

type GetGetConditionValueByConditionBlockIdTypes = {
  conditionBlockId: string;
};

export default function useGetGetConditionValueByConditionBlockId({
  conditionBlockId,
}: GetGetConditionValueByConditionBlockIdTypes) {
  return useQuery({
    queryKey: ["conditionBlock", conditionBlockId, "conditionValue"],
    queryFn: async () =>
      await axiosCustomized
        .get<ConditionBlockTypes[]>(
          `/plotFieldCommands/conditionBlocks/${conditionBlockId}/conditionValues`
        )
        .then((r) => r.data),
  });
}
