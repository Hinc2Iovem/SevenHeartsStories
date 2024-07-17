import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { SexualOrientationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Choice/SEXUAL_ORIENTATION_TYPES";

type UpdateChoiceOptionSexualOrientationTypes = {
  choiceOptionId: string;
  sexualOrientationType: SexualOrientationTypes;
};

export default function useUpdateChoiceOptionSexualOrientation({
  choiceOptionId,
  sexualOrientationType,
}: UpdateChoiceOptionSexualOrientationTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/choices/options/${choiceOptionId}/sexualOrientation`,
        {
          sexualOrientationType,
        }
      ),
  });
}
