import { useEffect, useRef, useState } from "react";
import useUpdateCommandTranslation, {
  CommandDynamicBodyNameVariationsTypes,
  CommandEndPointVariationsTypes,
} from "../../../../../../hooks/Patching/Translation/useUpdateCommandTranslation";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameCommandTypes } from "../../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import useGetAllChoiceOptionsByChoiceId from "../../../../../Editor/PlotField/PlotFieldMain/Commands/hooks/Choice/ChoiceOption/useGetChoiceAllChoiceOptionsByChoiceId";
import { CombinedTranslatedAndNonTranslatedPlotTypes } from "../../Filters/FiltersEverythingPlot";
import DisplayTranslatedNonTranslatedChoiceOption from "./DisplayTranslatedNonTranslatedChoiceOption";
import "../../../../../Editor/Flowchart/FlowchartStyles.css";

type DisplayTranslatedNonTranslatedCommandTypes = {
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedPlotTypes;

export default function DisplayTranslatedNonTranslatedChoice({
  nonTranslated,
  translated,
  languageToTranslate,
  translateFromLanguage,
}: DisplayTranslatedNonTranslatedCommandTypes) {
  const [translatedCommandName, setTranslatedCommandName] = useState("");
  const [commandType, setCommandType] =
    useState<TranslationTextFieldNameCommandTypes>(
      "" as TranslationTextFieldNameCommandTypes
    );
  const [commandName, setCommandName] = useState("");
  const [commandId, setCommandId] = useState("");
  const [dynamicCommandName, setDynamicCommandName] =
    useState<CommandDynamicBodyNameVariationsTypes>(
      "" as CommandDynamicBodyNameVariationsTypes
    );
  const [dynamicCommandEndPoint, setDynamicCommandEndPoint] =
    useState<CommandEndPointVariationsTypes>(
      "" as CommandEndPointVariationsTypes
    );

  const hasMounted = useRef(false);

  useEffect(() => {
    if (translated) {
      setCommandId(translated.commandId);
      setTranslatedCommandName(translated.text);
      setDynamicCommandName("choiceQuestion");
      setDynamicCommandEndPoint("choices");
      setCommandType("choiceQuestion");
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      setCommandName(nonTranslated.text);
    } else {
      setCommandName("");
    }
  }, [nonTranslated, languageToTranslate]);

  const translatedDebouncedName = useDebounce({
    value: translatedCommandName,
    delay: 500,
  });

  const updateCharacterTranslationTranslated = useUpdateCommandTranslation({
    language: translateFromLanguage,
    commandId,
    commandEndPoint: dynamicCommandEndPoint,
    dynamicCommandName,
  });

  useEffect(() => {
    if (hasMounted.current && translatedDebouncedName?.trim().length) {
      updateCharacterTranslationTranslated.mutate({
        commandText: translatedDebouncedName,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translatedDebouncedName]);

  const debouncedName = useDebounce({
    value: commandName,
    delay: 500,
  });

  const updateCharacterTranslation = useUpdateCommandTranslation({
    language: languageToTranslate,
    commandId,
    commandEndPoint: dynamicCommandEndPoint,
    dynamicCommandName,
  });

  useEffect(() => {
    if (hasMounted.current && debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({
        commandText: debouncedName,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  const { data: allOptions } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: commandId,
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
            {allOptions?.map((o) => (
              <DisplayTranslatedNonTranslatedChoiceOption
                key={o._id + `-${translateFromLanguage}`}
                language={translateFromLanguage}
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
            placeholder={commandType}
            className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
            onChange={(e) => setCommandName(e.target.value)}
          />
          <div className="flex gap-[1rem] w-full flex-wrap">
            {allOptions?.map((o) => (
              <DisplayTranslatedNonTranslatedChoiceOption
                key={o._id + `-${languageToTranslate}`}
                language={languageToTranslate}
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
