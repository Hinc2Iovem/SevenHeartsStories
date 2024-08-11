import { useEffect, useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationAppearancePartTypes } from "../../../../../types/Additional/TranslationTypes";
import useUpdateAppearancePartTranslation from "../../../../../hooks/Patching/Translation/useUpdateAppearancePartTranslation";
import useDebounce from "../../../../../hooks/utilities/useDebounce";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import useGetTranslationAppearancePart from "../../../../../hooks/Fetching/Translation/useGetTranslationAppearancePart";

type DisplayTranslatedNonTranslatedRecentAppearancePartTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translated: TranslationAppearancePartTypes;
};

export default function DisplayTranslatedNonTranslatedRecentAppearancePart({
  translated,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedRecentAppearancePartTypes) {
  const [translatedAppearancePart, setTranslatedAppearancePart] = useState("");
  const [appearancePartType, setAppearancePartType] =
    useState<TranslationTextFieldNameAppearancePartsTypes>(
      "" as TranslationTextFieldNameAppearancePartsTypes
    );
  const [appearancePartTypeToRus, setAppearancePartTypeToRus] = useState("");

  const [appearancePart, setAppearancePart] = useState("");

  const [appearancePartId, setAppearancePartId] = useState("");

  useEffect(() => {
    if (translated) {
      setAppearancePartId(translated.appearancePartId);
      setTranslatedAppearancePart(translated.text);
      if (translated.textFieldName === "accessory") {
        setAppearancePartType("accessory");
      } else if (translated.textFieldName === "art") {
        setAppearancePartType("art");
      } else if (translated.textFieldName === "body") {
        setAppearancePartType("body");
      } else if (translated.textFieldName === "dress") {
        setAppearancePartType("dress");
      } else if (translated.textFieldName === "hair") {
        setAppearancePartType("hair");
      } else if (translated.textFieldName === "skin") {
        setAppearancePartType("skin");
      }
    }
  }, [translated]);

  useEffect(() => {
    if (appearancePartType) {
      const value =
        appearancePartType === "accessory"
          ? "украшение"
          : appearancePartType === "art"
          ? "татуировка"
          : appearancePartType === "body"
          ? "тело"
          : appearancePartType === "dress"
          ? "костюм"
          : appearancePartType === "hair"
          ? "волосы"
          : "кожа";
      setAppearancePartTypeToRus(value);
    }
  }, [appearancePartType]);

  const { data: nonTranslatedAppearancePart } = useGetTranslationAppearancePart(
    { appearancePartId, language: languageToTranslate }
  );

  useEffect(() => {
    if (nonTranslatedAppearancePart) {
      setAppearancePart(nonTranslatedAppearancePart.text);
    }
  }, [nonTranslatedAppearancePart]);

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
        appearancePartType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  return (
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
  );
}
