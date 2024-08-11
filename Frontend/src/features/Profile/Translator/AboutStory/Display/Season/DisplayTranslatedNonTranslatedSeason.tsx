import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedSeasonTypes } from "../../Filters/FiltersEverythingStoryForSeason";
import useUpdateSeasonTranslation from "../../../../../../hooks/Patching/Translation/useUpdateSeasonTranslation";

type DisplayTranslatedNonTranslatedSeasonTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedSeasonTypes;

export default function DisplayTranslatedNonTranslatedSeason({
  nonTranslated,
  translated,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedSeasonTypes) {
  const [translatedSeasonName, setTranslatedSeasonName] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [seasonId, setSeasonId] = useState("");

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        setSeasonId(t.seasonId);
        if (t.textFieldName === "seasonName") {
          setTranslatedSeasonName(t.text);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "seasonName") {
          setSeasonName(nt.text);
        }
      });
    }
  }, [nonTranslated, languageToTranslate]);

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
