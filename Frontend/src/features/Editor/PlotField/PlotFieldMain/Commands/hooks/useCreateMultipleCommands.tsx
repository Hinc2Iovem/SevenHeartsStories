import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";

type createMultipleCommandsTypes = {
  topologyBlockId: string;
  allCommands?: string;
  amountOfOptions?: number;
  choiceType?: string;
  optionVariations?: string;
  storyId?: string;
  waitValue?: number;
};

export default function useCreateMultipleCommands({
  topologyBlockId,
  allCommands,
  amountOfOptions,
  choiceType,
  optionVariations,
  storyId,
  waitValue,
}: createMultipleCommandsTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotField/topologyBlocks/${topologyBlockId}/multipleCommands`,
        {
          allCommands,
          amountOfOptions,
          choiceType,
          optionVariations,
          storyId,
          waitValue,
        }
      ),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfield", "topologyBlock", topologyBlockId],
      });
    },
  });
}
