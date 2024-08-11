import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedAppearancePartTypes } from "../../Filters/FiltersEverythingCharacterForAppearancePart";
import useUpdateAppearancePartTranslation from "../../../../../../hooks/Patching/Translation/useUpdateAppearancePartTranslation";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";

type DisplayTranslatedNonTranslatedAppearancePartTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  filteredAppearanceType: TranslationTextFieldNameAppearancePartsTypes;
} & CombinedTranslatedAndNonTranslatedAppearancePartTypes;

export default function DisplayTranslatedNonTranslatedAppearancePart({
  nonTranslated,
  translated,
  languageToTranslate,
  filteredAppearanceType,
}: DisplayTranslatedNonTranslatedAppearancePartTypes) {
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
      translated.map((t) => {
        setAppearancePartId(t.appearancePartId);
        if (t.textFieldName === "accessory") {
          setAppearancePartType("accessory");
          setTranslatedAppearancePart(t.text);
        } else if (t.textFieldName === "art") {
          setAppearancePartType("art");
          setTranslatedAppearancePart(t.text);
        } else if (t.textFieldName === "body") {
          setAppearancePartType("body");
          setTranslatedAppearancePart(t.text);
        } else if (t.textFieldName === "dress") {
          setAppearancePartType("dress");
          setTranslatedAppearancePart(t.text);
        } else if (t.textFieldName === "hair") {
          setAppearancePartType("hair");
          setTranslatedAppearancePart(t.text);
        } else if (t.textFieldName === "skin") {
          setAppearancePartType("skin");
          setTranslatedAppearancePart(t.text);
        }
      });
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

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        setAppearancePart(nt.text);
      });
    }
  }, [nonTranslated, languageToTranslate]);

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
    <>
      {filteredAppearanceType ? (
        filteredAppearanceType === appearancePartType ? (
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
