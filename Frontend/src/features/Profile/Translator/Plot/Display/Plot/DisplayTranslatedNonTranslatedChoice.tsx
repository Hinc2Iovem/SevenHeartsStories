import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import useGetAllChoiceOptionsByChoiceId from "../../../../../Editor/PlotField/PlotFieldMain/Commands/hooks/Choice/ChoiceOption/useGetChoiceAllChoiceOptionsByChoiceId";
import { CombinedTranslatedAndNonTranslatedChoiceTypes } from "../../Filters/FiltersEverythingPlotChoice";
import DisplayTranslatedNonTranslatedChoiceOption from "./DisplayTranslatedNonTranslatedChoiceOption";
import useUpdateChoiceTranslation from "../../../../../../hooks/Patching/Translation/PlotfieldCoomands/useUpdateChoiceTranslation";
import { TranslationTextFieldName } from "../../../../../../const/TRANSLATION_TEXT_FIELD_NAMES";
import { TranslationTextFieldNameChoiceTypes } from "../../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import "../../../../../Editor/Flowchart/FlowchartStyles.css";
import useInvalidateTranslatorChoiceOptionQueries from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorChoiceOptionQueries";

type DisplayTranslatedNonTranslatedCommandTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  topologyBlockId: string;
} & CombinedTranslatedAndNonTranslatedChoiceTypes;

export default function DisplayTranslatedNonTranslatedChoice({
  nonTranslated,
  translated,
  languageToTranslate,
  translateFromLanguage,
  topologyBlockId,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: DisplayTranslatedNonTranslatedCommandTypes) {
  useInvalidateTranslatorChoiceOptionQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage: languageToTranslate,
    plotFieldCommandChoiceId: translated?.commandId || "",
  });

  const [initialTranslatedCommandName, setInitialTranslatedCommandName] =
    useState("");
  const [translatedCommandName, setTranslatedCommandName] = useState("");

  const [initialCommandName, setInitialCommandName] = useState("");
  const [commandName, setCommandName] = useState("");
  const [commandId, setCommandId] = useState("");

  useEffect(() => {
    if (translated) {
      setCommandId(translated.commandId);
      setTranslatedCommandName((translated.translations || [])[0]?.text || "");
      setInitialTranslatedCommandName(
        (translated.translations || [])[0]?.text || ""
      );
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      setCommandName((nonTranslated.translations || [])[0]?.text || "");
      setInitialCommandName((nonTranslated.translations || [])[0]?.text || "");
    } else {
      setCommandName("");
      setInitialCommandName("");
    }
  }, [nonTranslated, languageToTranslate]);

  const translatedDebouncedName = useDebounce({
    value: translatedCommandName,
    delay: 500,
  });

  const updateCharacterTranslationTranslated = useUpdateChoiceTranslation({
    language: translateFromLanguage,
    commandId,
    topologyBlockId,
  });

  useEffect(() => {
    if (
      initialTranslatedCommandName !== translatedDebouncedName &&
      translatedDebouncedName?.trim().length
    ) {
      updateCharacterTranslationTranslated.mutate({
        text: translatedDebouncedName,
        textFieldName:
          TranslationTextFieldName.ChoiceQuestion as TranslationTextFieldNameChoiceTypes,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translatedDebouncedName]);

  const debouncedName = useDebounce({
    value: commandName,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateChoiceTranslation({
    language: languageToTranslate,
    commandId,
    topologyBlockId,
  });

  useEffect(() => {
    if (initialCommandName !== debouncedName && debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        text: debouncedName,
        textFieldName:
          TranslationTextFieldName.ChoiceQuestion as TranslationTextFieldNameChoiceTypes,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  const { data: allTranslatedOptions } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: commandId,
    language: translateFromLanguage,
  });
  const { data: allNonTranslatedOptions } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: commandId,
    language: languageToTranslate,
  });

  return (
    <div
      className={`h-[50rem] sm:h-[25rem] sm:flex-row flex-col w-full flex gap-[.5rem] bg-blue-200 p-[.5rem] rounded-md`}
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
            value={translatedCommandName}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setTranslatedCommandName(e.target.value)}
          />
          <div className="flex gap-[1rem] w-full flex-wrap">
            {allTranslatedOptions?.map((o) => (
              <DisplayTranslatedNonTranslatedChoiceOption
                key={o._id + `-${translateFromLanguage}`}
                currentLanguage={translateFromLanguage}
                {...o}
              />
            ))}
          </div>
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
            value={commandName}
            placeholder="Вопрос"
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setCommandName(e.target.value)}
          />
          <div className="flex gap-[1rem] w-full flex-wrap">
            {allNonTranslatedOptions?.map((o, i) => (
              <DisplayTranslatedNonTranslatedChoiceOption
                key={o._id + `-${languageToTranslate}`}
                currentLanguage={languageToTranslate}
                currentChoiceId={
                  (allTranslatedOptions || [])[i].plotFieldCommandChoiceId
                }
                currentType={(allTranslatedOptions || [])[i].type}
                {...o}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

// /stories/6688f3748d53bb51df96603b
