import { useQuery } from "@tanstack/react-query";
import { ChoiceOptionTypes } from "../../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import { axiosCustomized } from "../../../../../../../../api/axios";

type GetChoiceTypes = {
  plotFieldCommandChoiceId: string;
};

export default function useGetAllChoiceOptionsByChoiceId({
  plotFieldCommandChoiceId,
}: GetChoiceTypes) {
  return useQuery({
    queryKey: ["choice", plotFieldCommandChoiceId, "option"],
    queryFn: async () =>
      await axiosCustomized
        .get<ChoiceOptionTypes[]>(
          `/plotFieldCommands/choice/${plotFieldCommandChoiceId}/options`
        )
        .then((r) => r.data),
  });
}
