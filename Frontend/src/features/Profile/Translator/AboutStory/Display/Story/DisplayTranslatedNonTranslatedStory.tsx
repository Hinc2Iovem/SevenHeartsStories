import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedStoryTypes } from "../../Filters/FiltersEverythingStoryForStory";
import useUpdateStoryTranslation from "../../../../../../hooks/Patching/Translation/useUpdateStoryTranslation";
import "../../../../../Editor/Flowchart/FlowchartStyles.css";

type DisplayTranslatedNonTranslatedStoryTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedStoryTypes;

export default function DisplayTranslatedNonTranslatedStory({
  nonTranslated,
  translated,
  languageToTranslate,
  translateFromLanguage,
}: DisplayTranslatedNonTranslatedStoryTypes) {
  const [translatedStoryName, setTranslatedStoryName] = useState("");
  const [translatedStoryDescription, setTranslatedStoryDescription] =
    useState("");
  const [translatedStoryGenre, setTranslatedStoryGenre] = useState("");

  const [storyName, setStoryName] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [storyId, setStoryId] = useState("");

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        setStoryId(t.storyId);
        if (t.textFieldName === "storyName") {
          setTranslatedStoryName(t.text);
        } else if (t.textFieldName === "storyDescription") {
          setTranslatedStoryDescription(t.text);
        } else if (t.textFieldName === "storyGenre") {
          setTranslatedStoryGenre(t.text);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "storyName") {
          setStoryName(nt.text);
        } else if (nt.textFieldName === "storyDescription") {
          setStoryDescription(nt.text);
        } else if (nt.textFieldName === "storyGenre") {
          setStoryGenre(nt.text);
        }
      });
    } else {
      setStoryDescription("");
      setStoryName("");
      setStoryGenre("");
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedTranslatedName = useDebounce({
    value: translatedStoryName,
    delay: 500,
  });

  const debouncedTranslatedDescription = useDebounce({
    value: translatedStoryDescription,
    delay: 500,
  });
  const debouncedTranslatedGenre = useDebounce({
    value: translatedStoryGenre,
    delay: 500,
  });

  const updateCharacterTranslationTranslated = useUpdateStoryTranslation({
    language: translateFromLanguage,
    storyId,
  });

  useEffect(() => {
    if (debouncedTranslatedName?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        storyName: debouncedTranslatedName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTranslatedName]);
  useEffect(() => {
    if (debouncedTranslatedGenre?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        storyGenre: debouncedTranslatedGenre,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTranslatedGenre]);
  useEffect(() => {
    if (debouncedTranslatedDescription?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        storyDescription: debouncedTranslatedDescription,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTranslatedDescription]);

  const debouncedName = useDebounce({
    value: storyName,
    delay: 500,
  });

  const debouncedDescription = useDebounce({
    value: storyDescription,
    delay: 500,
  });
  const debouncedGenre = useDebounce({
    value: storyGenre,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateStoryTranslation({
    language: languageToTranslate,
    storyId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        storyName: debouncedName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);
  useEffect(() => {
    if (debouncedGenre?.trim().length) {
      updateCharacterTranslation.mutate({
        storyGenre: debouncedGenre,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGenre]);

  useEffect(() => {
    if (debouncedDescription?.trim().length) {
      updateCharacterTranslation.mutate({
        storyDescription: debouncedDescription,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDescription]);

  return (
    <div
      className={`sm:h-[20rem] h-[25rem] sm:flex-row flex-col w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
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
            value={translatedStoryName}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedStoryName(e.target.value)}
          />
          <input
            type="text"
            value={translatedStoryGenre}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedStoryGenre(e.target.value)}
          />
          <textarea
            name="TranslatedDescription"
            id="translatedDescription"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
            value={translatedStoryDescription}
            onChange={(e) => setTranslatedStoryDescription(e.target.value)}
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
            value={storyName}
            placeholder="Тайтл Истории"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setStoryName(e.target.value)}
          />
          <input
            type="text"
            value={storyGenre}
            placeholder="Жанры Истории"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setStoryGenre(e.target.value)}
          />
          <textarea
            name="Description"
            id="description"
            placeholder="Описание Истории"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
            value={storyDescription}
            onChange={(e) => setStoryDescription(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
