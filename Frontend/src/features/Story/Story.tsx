import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosCustomized } from "../../api/axios";
import useDebounce from "../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationStoryTypes } from "../../types/Additional/TranslationTypes";
import PaginatedSkeleton from "./Skeleton/PaginatedSkeleton";
import StoryDebounced from "./StoryDebounced/StoryDebounced";
import StoryFilterTypesHeader from "./StoryFilterTypes";
import StoryHeader from "./StoryHeader";
import StoryList from "./StoryList";

export type StoryFilterTypes = "all" | "done" | "doing";

type DebouncedTranslationsTypes = {
  language?: CurrentlyAvailableLanguagesTypes;
  text: string;
  textFieldName: string;
};

const getDebouncedStories = async ({
  language = "russian",
  text,
  textFieldName,
}: DebouncedTranslationsTypes): Promise<TranslationStoryTypes[]> => {
  return await axiosCustomized
    .get(
      `/translations/textFieldNames?currentLanguage=${language}&textFieldName=${textFieldName}&text=${text}`
    )
    .then((r) => r.data);
};

export default function Story() {
  const [storiesType, setStoriesType] = useState<StoryFilterTypes>("all");
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce({ value: searchValue, delay: 500 });

  const {
    data: translations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["translation", "stories", debouncedValue],
    queryFn: () =>
      getDebouncedStories({ text: debouncedValue, textFieldName: "storyName" }),
    enabled: debouncedValue?.trim().length > 0,
  });

  if (isLoading) {
    return (
      <section className="max-w-[146rem] px-[1rem] mx-auto flex flex-col gap-[3rem] mb-[2rem]">
        <StoryHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <StoryFilterTypesHeader
          setStoriesType={setStoriesType}
          storiesType={storiesType}
        />
        <PaginatedSkeleton />;
      </section>
    );
  } else if (isError) {
    console.error(error.message);
    return (
      <h2 className="text-center text-[3.5rem] text-gray-700">
        Something went wrong
      </h2>
    );
  }

  return (
    <section className="max-w-[146rem] px-[1rem] mx-auto flex flex-col gap-[3rem] mb-[2rem]">
      <StoryHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      {!debouncedValue.trim().length ? (
        <>
          <StoryFilterTypesHeader
            setStoriesType={setStoriesType}
            storiesType={storiesType}
          />

          <StoryList storiesType={storiesType} />
        </>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
          {translations?.map((t) => (
            <StoryDebounced key={t._id} {...t} />
          ))}
        </div>
      )}
    </section>
  );
}
