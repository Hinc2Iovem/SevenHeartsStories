import { useEffect, useState } from "react";
import useGetTranslationSeason from "../../../../../hooks/Fetching/Translation/useGetTranslationSeason";
import useUpdateSeasonTranslation from "../../../../../hooks/Patching/Translation/useUpdateSeasonTranslation";
import useDebounce from "../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../../../types/Additional/TranslationTypes";
import "../../../../Editor/Flowchart/FlowchartStyles.css";

type DisplayTranslatedNonTranslatedSeasonTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translated: TranslationSeasonTypes;
};

export default function DisplayTranslatedNonTranslatedRecentSeason({
  translated,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedSeasonTypes) {
  const [translatedSeasonName, setTranslatedSeasonName] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [seasonId, setSeasonId] = useState("");

  useEffect(() => {
    if (translated) {
      if (translated.seasonId) {
        setSeasonId(translated.seasonId);
      }
      if (translated.textFieldName === "seasonName") {
        setTranslatedSeasonName(translated.text);
      }
    }
  }, [translated]);

  const { data: nonTranslatedSeason } = useGetTranslationSeason({
    seasonId,
    language: languageToTranslate,
  });

  useEffect(() => {
    if (nonTranslatedSeason) {
      if (nonTranslatedSeason.textFieldName === "seasonName") {
        setSeasonName(nonTranslatedSeason.text);
      }
    }
  }, [nonTranslatedSeason]);

  const debouncedName = useDebounce({
    value: seasonName,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateSeasonTranslation({
    language: languageToTranslate,
    seasonId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        seasonName: debouncedName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  return (
    <div
      className={`flex-col h-fit w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
    >
      <div
        className={`h-full w-full overflow-auto rounded-md shadow-md shadow-gray-400 bg-white`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={translatedSeasonName}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedSeasonName(e.target.value)}
          />
        </form>
      </div>
      <div
        className={`h-full w-full overflow-auto rounded-md shadow-md shadow-gray-400 bg-white`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={seasonName}
            placeholder="Тайтл Сезона"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setSeasonName(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
