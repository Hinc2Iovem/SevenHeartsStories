import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedEpisodeTypes } from "../../Filters/FiltersEverythingStoryForEpisode";
import useUpdateEpisodeTranslation from "../../../../../../hooks/Patching/Translation/useUpdateEpisodeTranslation";
import "../../../../../Editor/Flowchart/FlowchartStyles.css";

type DisplayTranslatedNonTranslatedEpisodeTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedEpisodeTypes;

export default function DisplayTranslatedNonTranslatedEpisode({
  nonTranslated,
  translated,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedEpisodeTypes) {
  const [translatedEpisodeName, setTranslatedEpisodeName] = useState("");
  const [translatedEpisodeDescription, setTranslatedEpisodeDescription] =
    useState("");

  const [episodeName, setEpisodeName] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [episodeId, setEpisodeId] = useState("");

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        setEpisodeId(t.episodeId);
        if (t.textFieldName === "episodeName") {
          setTranslatedEpisodeName(t.text);
        } else if (t.textFieldName === "episodeDescription") {
          setTranslatedEpisodeDescription(t.text);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "episodeName") {
          setEpisodeName(nt.text);
        } else if (nt.textFieldName === "episodeDescription") {
          setEpisodeDescription(nt.text);
        }
      });
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedName = useDebounce({
    value: episodeName,
    delay: 500,
  });

  const debouncedDescription = useDebounce({
    value: episodeDescription,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateEpisodeTranslation({
    language: languageToTranslate,
    episodeId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        episodeName: debouncedName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  useEffect(() => {
    if (debouncedDescription?.trim().length) {
      updateCharacterTranslation.mutate({
        description: debouncedDescription,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDescription]);

  return (
    <div
      className={`sm:h-[15rem] h-[25rem] sm:flex-row flex-col w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
    >
      <div
        className={`h-full w-full sm:w-[calc(50%)] overflow-auto rounded-md shadow-md shadow-gray-400 bg-white | containerScroll`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={translatedEpisodeName}
            placeholder="Тайтл Эпизода"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedEpisodeName(e.target.value)}
          />
          <textarea
            name="TranslatedDescription"
            id="translatedDescription"
            placeholder="Описание Эпизода"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            value={translatedEpisodeDescription}
            onChange={(e) => setTranslatedEpisodeDescription(e.target.value)}
          />
        </form>
      </div>
      <div
        className={`h-full w-full sm:w-[calc(50%)] overflow-auto rounded-md shadow-md shadow-gray-400 bg-white | containerScroll`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={episodeName}
            placeholder="Тайтл Эпизода"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setEpisodeName(e.target.value)}
          />
          <textarea
            name="Description"
            id="description"
            placeholder="Описание Эпизода"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            value={episodeDescription}
            onChange={(e) => setEpisodeDescription(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
