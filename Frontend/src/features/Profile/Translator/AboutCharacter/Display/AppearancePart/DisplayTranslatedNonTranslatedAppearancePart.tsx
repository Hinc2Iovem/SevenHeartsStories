import { useEffect, useState } from "react";
import useUpdateAppearancePartTranslation from "../../../../../../hooks/Patching/Translation/useUpdateAppearancePartTranslation";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import { TranslationAppearancePartTypes } from "../../../../../../types/Additional/TranslationTypes";

type DisplayTranslatedNonTranslatedAppearancePartTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  filteredAppearanceType: TranslationTextFieldNameAppearancePartsTypes;
  translated: TranslationAppearancePartTypes;
  nonTranslated: TranslationAppearancePartTypes | null;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
};

export default function DisplayTranslatedNonTranslatedAppearancePart({
  nonTranslated,
  translated,
  languageToTranslate,
  filteredAppearanceType,
  translateFromLanguage,
}: DisplayTranslatedNonTranslatedAppearancePartTypes) {
  const [translatedAppearancePart, setTranslatedAppearancePart] = useState("");

  const [appearancePartTypeToRus, setAppearancePartTypeToRus] = useState("");

  const [appearancePart, setAppearancePart] = useState("");

  const [appearancePartId, setAppearancePartId] = useState("");

  useEffect(() => {
    if (translated) {
      setAppearancePartId(translated.appearancePartId);
      setTranslatedAppearancePart(translated.text);
      const value =
        translated.textFieldName === "accessory"
          ? "украшение"
          : translated.textFieldName === "art"
          ? "татуировка"
          : translated.textFieldName === "body"
          ? "тело"
          : translated.textFieldName === "dress"
          ? "костюм"
          : translated.textFieldName === "hair"
          ? "волосы"
          : "кожа";
      setAppearancePartTypeToRus(value);
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      setAppearancePart(nonTranslated.text);
    } else {
      setAppearancePart("");
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedTranslatedName = useDebounce({
    value: translatedAppearancePart,
    delay: 500,
  });

  const updateCharacterTranslationTranslated =
    useUpdateAppearancePartTranslation({
      language: translateFromLanguage,
      appearancePartId,
    });

  useEffect(() => {
    if (debouncedTranslatedName?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        appearancePartName: debouncedTranslatedName,
        appearancePartType: translated.textFieldName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTranslatedName]);

  const debouncedName = useDebounce({
    value: appearancePart,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateAppearancePartTranslation({
    language: languageToTranslate,
    appearancePartId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        appearancePartName: debouncedName,
        appearancePartType: translated.textFieldName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  return (
    <>
      {filteredAppearanceType ? (
        filteredAppearanceType === translated.textFieldName ? (
          <div
            className={`h-fit flex-col w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
          >
            <div
              className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white`}
            >
              <form
                className="flex flex-col gap-[.5rem] p-[1rem] w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  value={translatedAppearancePart}
                  className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                  onChange={(e) => setTranslatedAppearancePart(e.target.value)}
                />
              </form>
            </div>
            <div
              className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white`}
            >
              <form
                className="flex flex-col gap-[.5rem] p-[1rem] w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  value={appearancePart}
                  placeholder={appearancePartTypeToRus}
                  className="w-full placeholder:capitalize border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                  onChange={(e) => setAppearancePart(e.target.value)}
                />
              </form>
            </div>
          </div>
        ) : null
      ) : (
        <div
          className={`h-fit flex-col w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
        >
          <div
            className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={translatedAppearancePart}
                className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setTranslatedAppearancePart(e.target.value)}
              />
            </form>
          </div>
          <div
            className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={appearancePart}
                placeholder={appearancePartTypeToRus}
                className="w-full placeholder:capitalize border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setAppearancePart(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
