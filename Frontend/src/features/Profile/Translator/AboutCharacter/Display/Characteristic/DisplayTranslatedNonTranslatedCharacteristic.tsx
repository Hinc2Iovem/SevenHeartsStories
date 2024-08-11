import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedCharacteristicTypes } from "../../Filters/FiltersEverythingCharacterForCharacteristic";
import useUpdateCharacteristicTranslation from "../../../../../../hooks/Patching/Translation/useUpdateCharacteristicTranslation";

type DisplayTranslatedNonTranslatedCharacteristicTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedCharacteristicTypes;

export default function DisplayTranslatedNonTranslatedCharacteristic({
  nonTranslated,
  translated,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedCharacteristicTypes) {
  const [
    translatedCharacterCharacteristic,
    setTranslatedCharacterCharacteristic,
  ] = useState("");

  const [characterCharacteristic, setCharacterCharacteristic] = useState("");
  const [characterCharacteristicId, setCharacterCharacteristicId] =
    useState("");

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        if (t.textFieldName === "characterCharacteristic") {
          setTranslatedCharacterCharacteristic(t.text);
          setCharacterCharacteristicId(t.characteCharacteristicId);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "characterCharacteristic") {
          setCharacterCharacteristic(nt.text);
        }
      });
    } else {
      setCharacterCharacteristic("");
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedName = useDebounce({
    value: characterCharacteristic,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateCharacteristicTranslation({
    language: languageToTranslate,
    characterCharacteristicId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        characteristicName: debouncedName,
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
            value={translatedCharacterCharacteristic}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) =>
              setTranslatedCharacterCharacteristic(e.target.value)
            }
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
            value={characterCharacteristic}
            placeholder="Имя персонажа"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setCharacterCharacteristic(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
