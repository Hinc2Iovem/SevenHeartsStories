import { useEffect, useRef, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCommandTypes } from "../../../../../../types/Additional/TranslationTypes";
import useUpdateGetItemTranslation from "../../../../../../hooks/Patching/Translation/useUpdateGetItemTranslation";
import "../../../../../Editor/Flowchart/FlowchartStyles.css";

type CombinedTranslatedAndNonTranslatedPlotTypes = {
  translated: TranslationCommandTypes[];
  nonTranslated: TranslationCommandTypes[] | null;
};

type DisplayTranslatedNonTranslatedPlotGetItemTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedPlotTypes;

export default function DisplayTranslatedNonTranslatedPlotGetItem({
  nonTranslated,
  translated,
  languageToTranslate,
  translateFromLanguage,
}: DisplayTranslatedNonTranslatedPlotGetItemTypes) {
  const [itemId, setItemId] = useState("");

  const [translatedItemName, setTranslatedItemName] = useState("");
  const [translatedItemDescription, setTranslatedItemDescription] =
    useState("");
  const [translatedButtonText, setTranslatedButtonText] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const hasMounted = useRef(false);

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        setItemId(t.commandId);
        if (t.textFieldName === "itemName") {
          setTranslatedItemName(t.text);
        } else if (t.textFieldName === "itemDescription") {
          setTranslatedItemDescription(t.text);
        } else if (t.textFieldName === "buttonText") {
          setTranslatedButtonText(t.text);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "itemName") {
          setItemName(nt.text);
        } else if (nt.textFieldName === "itemDescription") {
          setItemDescription(nt.text);
        } else if (nt.textFieldName === "buttonText") {
          setButtonText(nt.text);
        }
      });
    } else {
      setItemName("");
      setItemDescription("");
      setButtonText("");
    }
  }, [nonTranslated]);

  const debouncedNameTranslated = useDebounce({
    value: translatedItemName,
    delay: 500,
  });
  const debouncedDescriptionTranslated = useDebounce({
    value: translatedItemDescription,
    delay: 500,
  });
  const debouncedButtonTextTranslated = useDebounce({
    value: translatedButtonText,
    delay: 500,
  });

  const updateCharacterTranslationTranslated = useUpdateGetItemTranslation({
    language: translateFromLanguage,
    getItemId: itemId,
  });

  useEffect(() => {
    if (hasMounted.current && debouncedNameTranslated?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        itemName: debouncedNameTranslated,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameTranslated]);

  useEffect(() => {
    if (hasMounted.current && debouncedDescriptionTranslated?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        itemDescription: debouncedDescriptionTranslated,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDescriptionTranslated]);

  useEffect(() => {
    if (hasMounted.current && debouncedButtonTextTranslated?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        buttonText: debouncedButtonTextTranslated,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedButtonTextTranslated]);

  const debouncedName = useDebounce({
    value: itemName,
    delay: 500,
  });
  const debouncedDescription = useDebounce({
    value: itemDescription,
    delay: 500,
  });
  const debouncedButtonText = useDebounce({
    value: buttonText,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateGetItemTranslation({
    language: languageToTranslate,
    getItemId: itemId,
  });

  useEffect(() => {
    if (hasMounted.current && debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        itemName: debouncedName,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  useEffect(() => {
    if (hasMounted.current && debouncedDescription?.trim().length) {
      updateCharacterTranslation.mutate({
        itemDescription: debouncedDescription,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDescription]);

  useEffect(() => {
    if (hasMounted.current && debouncedButtonText?.trim().length) {
      updateCharacterTranslation.mutate({
        buttonText: debouncedButtonText,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedButtonText]);

  return (
    <div
      className={`h-fit max-h-[20rem] overflow-auto sm:flex-row flex-col w-full flex gap-[.5rem] bg-purple-200 p-[.5rem] rounded-md | containerScroll`}
    >
      <div
        className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white overflow-auto | containerScroll`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={translatedItemName}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedItemName(e.target.value)}
          />
          <input
            type="text"
            value={translatedButtonText}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedButtonText(e.target.value)}
          />
          <textarea
            name="TranslatedItemDescription"
            id="translatedItemDescription"
            value={translatedItemDescription}
            onChange={(e) => setTranslatedItemDescription(e.target.value)}
            className="w-full max-h-[10rem] border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
          />
        </form>
      </div>
      <div
        className={`h-full w-full rounded-md shadow-md shadow-gray-400 bg-white overflow-auto | containerScroll`}
      >
        <form
          className="flex flex-col gap-[.5rem] p-[1rem] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={itemName}
            placeholder="Название Предмета"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            value={buttonText}
            placeholder="Текст Кнопки Предмета"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setButtonText(e.target.value)}
          />
          <textarea
            name="ItemDescription"
            id="itemDescription"
            value={itemDescription}
            placeholder="Описание Предмета"
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full max-h-[10rem] h-full border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
          />
        </form>
      </div>
    </div>
  );
}
