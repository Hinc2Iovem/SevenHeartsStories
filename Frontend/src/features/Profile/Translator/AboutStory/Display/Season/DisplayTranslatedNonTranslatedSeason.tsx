import { useEffect, useState } from "react";
import useUpdateSeasonTranslation from "../../../../../../hooks/Patching/Translation/useUpdateSeasonTranslation";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../../../../types/Additional/TranslationTypes";

type DisplayTranslatedNonTranslatedSeasonTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translated: TranslationSeasonTypes;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  nonTranslated: TranslationSeasonTypes | null;
};

export default function DisplayTranslatedNonTranslatedSeason({
  nonTranslated,
  translated,
  languageToTranslate,
  translateFromLanguage,
}: DisplayTranslatedNonTranslatedSeasonTypes) {
  const [translatedSeasonName, setTranslatedSeasonName] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [seasonId, setSeasonId] = useState("");

  useEffect(() => {
    if (translated) {
      setSeasonId(translated.seasonId);
      if (translated.textFieldName === "seasonName") {
        setTranslatedSeasonName(translated.text);
      }
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      if (nonTranslated.textFieldName === "seasonName") {
        setSeasonName(nonTranslated.text);
      }
    } else {
      setSeasonName("");
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedTranslatedName = useDebounce({
    value: translatedSeasonName,
    delay: 500,
  });

  const updateCharacterTranslationTranslated = useUpdateSeasonTranslation({
    language: translateFromLanguage,
    seasonId,
  });

  useEffect(() => {
    if (debouncedTranslatedName?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        seasonName: debouncedTranslatedName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTranslatedName]);

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
