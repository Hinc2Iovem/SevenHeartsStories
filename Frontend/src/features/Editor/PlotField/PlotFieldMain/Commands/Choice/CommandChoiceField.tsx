import { useEffect, useState } from "react";
import { ChoiceVariationsTypes } from "../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useGetCommandChoice from "../hooks/Choice/useGetCommandChoice";
import ChoiceQuestionField from "./ChoiceQuestionField";
import ChoiceVariationTypeBlock from "./ChoiceVariationTypeBlock";
import useUpdateChoiceText from "../hooks/Choice/useUpdateChoiceText";
import ChoiceOptionBlocksList from "./Option/ChoiceOptionBlocksList";

type CommandChoiceFieldTypes = {
  plotFieldCommandId: string;
  command: string;
  topologyBlockId: string;
};

export default function CommandChoiceField({
  plotFieldCommandId,
  command,
  topologyBlockId,
}: CommandChoiceFieldTypes) {
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [exitBlockId, setExitBlockId] = useState("");

  const [nameValue] = useState<string>(command ?? "Choice");
  const [commandChoiceId, setCommandChoiceId] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [isAuthor, setIsAuthor] = useState<boolean>();
  const [choiceVariationTypes, setChoiceVariationTypes] =
    useState<ChoiceVariationsTypes>("" as ChoiceVariationsTypes);

  const { data: commandChoice } = useGetCommandChoice({
    plotFieldCommandId,
  });

  useEffect(() => {
    if (commandChoice) {
      setCommandChoiceId(commandChoice._id);
      if (commandChoice.timeLimit) {
        setTimeLimit(commandChoice.timeLimit);
      }
      if (commandChoice.exitBlockId) {
        setExitBlockId(commandChoice.exitBlockId);
      }
      console.log("commandChoice.choiceType: ", commandChoice.choiceType);
      if (commandChoice.choiceType) {
        setChoiceVariationTypes(commandChoice.choiceType);
      }
      if (commandChoice.characterId) {
        setCharacterId(commandChoice.characterId);
      }
      setIsAuthor(commandChoice.isAuthor || false);
    }
  }, [commandChoice]);

  const updateChoice = useUpdateChoiceText({ choiceId: commandChoiceId });

  useEffect(() => {
    updateChoice.mutate({ isAuthor });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthor]);

  return (
    <div className="flex gap-[1rem] w-full flex-wrap bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>

      <ChoiceVariationTypeBlock
        choiceVariationTypes={choiceVariationTypes}
        setChoiceVariationTypes={setChoiceVariationTypes}
        setExitBlockId={setExitBlockId}
        setTimeLimit={setTimeLimit}
        choiceId={commandChoiceId}
        exitBlockId={exitBlockId}
        timeLimit={timeLimit}
      />

      <button
        onClick={() => setIsAuthor((prev) => !prev)}
        className={`rounded-md ${
          isAuthor ? "text-white bg-green-300" : "bg-white text-gray-700"
        } shadow-md text-[1.3rem] px-[1rem] py-[.5rem]`}
      >
        Автор
      </button>
      <ChoiceQuestionField
        topologyBlockId={topologyBlockId}
        characterEmotionId={commandChoice?.characterEmotionId || ""}
        characterId={characterId}
        setCharacterId={setCharacterId}
        isAuthor={isAuthor || false}
        choiceId={commandChoice?._id || ""}
      />

      <ChoiceOptionBlocksList choiceId={commandChoiceId} />
    </div>
  );
}
