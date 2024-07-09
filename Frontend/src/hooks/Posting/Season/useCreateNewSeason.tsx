import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { axiosCustomized } from "../../../api/axios";

type CreateSeasonByStoryIdTypes = {
  storyId: string;
  title: string;
  currentLanguage?: CurrentlyAvailableLanguagesTypes;
};

const createNewSeason = async ({
  storyId,
  title,
  currentLanguage = "russian",
}: CreateSeasonByStoryIdTypes) => {
  return await axiosCustomized.post(`/stories/${storyId}/seasons`, {
    title,
    currentLanguage,
  });
};

export default function useCreateNewSeason({
  storyId,
  currentLanguage = "russian",
  title,
}: CreateSeasonByStoryIdTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["stories", storyId, "newSeason"],
    mutationFn: () => createNewSeason({ storyId, title, currentLanguage }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["stories", storyId, "seasons"],
        exact: true,
        type: "all",
      }),
  });
}
