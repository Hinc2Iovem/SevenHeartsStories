import { useEffect, useState } from "react";
import plus from "../../../../../../assets/images/shared/add.png";
import useGetCharacterById from "../../../../../../hooks/Fetching/Character/useGetCharacterById";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import ButtonHoverPromptModal from "../../../../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import useGetTranslationCharacterEnabled from "../hooks/Character/useGetTranslationCharacterEnabled";
import useGetCommandChoiceTranslation from "../hooks/Choice/useGetCommandChoiceTranslation";
import useUpdateChoiceText from "../hooks/Choice/useUpdateChoiceText";
import useUpdateChoiceTranslationText from "../hooks/Choice/useUpdateChoiceTranslationText";
import useGetEmotionEnabled from "../hooks/Emotion/useGetEmotionEnabled";
import PlotfieldCharacterPromptMain from "../Prompts/Characters/PlotfieldCharacterPromptMain";
import PlotfieldEmotionPromptMain from "../Prompts/Emotions/PlotfieldEmotionPromptMain";
import CreateChoiceOptionTypeModal from "./Option/CreateChoiceOptionTypeModal";

type ChoiceQuestionFieldTypes = {
  characterId: string;
  characterEmotionId: string;
  isAuthor: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  choiceId: string;
  topologyBlockId: string;
};

export default function ChoiceQuestionField({
  characterId,
  characterEmotionId,
  isAuthor,
  choiceId,
  setCharacterId,
  topologyBlockId,
}: ChoiceQuestionFieldTypes) {
  const [showCreateChoiceOptionModal, setShowCreateChoiceOptionModal] =
    useState(false);

  const { data: translatedQuestion } = useGetCommandChoiceTranslation({
    choiceId,
  });

  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (translatedQuestion) {
      translatedQuestion.map((tq) => {
        if (tq.textFieldName === "choiceQuestion") {
          setQuestion(tq.text);
        }
      });
    }
  }, [translatedQuestion]);

  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [characterName, setCharacterName] = useState("");

  const [characterImg, setCharacterImg] = useState<string>("");

  const { data: translatedCharacter } = useGetTranslationCharacterEnabled({
    commandSayType: "character",
    characterId,
  });
  const { data: currentCharacter } = useGetCharacterById({ characterId });

  useEffect(() => {
    if (translatedCharacter) {
      translatedCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCharacterName(tc.text || "");
        }
      });
    }
  }, [translatedCharacter]);

  useEffect(() => {
    if (currentCharacter) {
      setCharacterImg(currentCharacter?.img || "");
    }
  }, [currentCharacter]);

  const [showAllEmotions, setShowAllEmotions] = useState(false);
  const [emotionName, setEmotionName] = useState("");
  const [emotionId, setEmotionId] = useState("");
  const [emotionImg, setEmotionImg] = useState<string>("");

  const { data: currentEmotion } = useGetEmotionEnabled({
    characterEmotionId,
    commandSayType: "character",
  });

  useEffect(() => {
    if (currentEmotion) {
      setEmotionName(currentEmotion.emotionName);
      setEmotionImg(currentEmotion?.imgUrl || "");
    }
  }, [currentEmotion]);

  const updateChoice = useUpdateChoiceText({ choiceId });

  const updateChoiceTranslation = useUpdateChoiceTranslationText({
    choiceId,
    choiceQuestion: question,
  });

  const debouncedValue = useDebounce({ value: question, delay: 700 });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      updateChoiceTranslation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (characterId?.trim().length) {
      updateChoice.mutate({ characterId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  useEffect(() => {
    if (emotionId?.trim().length) {
      updateChoice.mutate({ characterEmotionId: emotionId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotionId]);

  useEscapeOfModal({
    setValue: setShowAllCharacters,
    value: showAllCharacters,
  });

  useEscapeOfModal({
    setValue: setShowAllEmotions,
    value: showAllEmotions,
  });
  return (
    <div className="w-full flex-grow flex gap-[1rem] bg-neutral-magnolia rounded-md shadow-md p-[.5rem] flex-wrap items-center">
      {isAuthor ? (
        <div className="flex-grow bg-white rounded-md shadow-md px-[1rem] py-[.5rem]">
          <h4 className="text-[1.4rem] text-gray-700">Author</h4>
        </div>
      ) : (
        <>
          <div className="relative flex-grow ">
            <button
              onClick={() => {
                setShowAllEmotions(false);
                setShowAllCharacters((prev) => !prev);
              }}
              className="outline-gray-400 text-[1.3rem] w-full bg-white rounded-md shadow-md px-[1rem] py-[.5rem]"
            >
              {characterName?.trim().length ? (
                <div className="flex gap-[1rem] justify-between items-center">
                  <h4 className="text-[1.5rem]">{characterName}</h4>
                  <img
                    src={characterImg}
                    alt="CharacterIcon"
                    className={`${
                      characterImg ? "" : "hidden"
                    } w-[3.5rem] rounded-md object-contain`}
                  />
                </div>
              ) : (
                "Имя Персонажа"
              )}
            </button>
            <PlotfieldCharacterPromptMain
              characterName={characterName}
              setCharacterId={setCharacterId}
              setCharacterName={setCharacterName}
              setShowCharacterModal={setShowAllCharacters}
              showCharacterModal={showAllCharacters}
              setCharacterImg={setCharacterImg}
            />
          </div>

          <div className="relative flex-grow">
            <button
              onClick={() => {
                setShowAllCharacters(false);
                setShowAllEmotions((prev) => !prev);
              }}
              className="outline-gray-400 text-[1.3rem] w-full bg-white rounded-md shadow-md px-[1rem] py-[.5rem]"
            >
              {emotionName?.trim().length ? (
                <div className="flex gap-[1rem] justify-between items-center">
                  <h4 className="text-[1.5rem]">{emotionName}</h4>
                  <img
                    src={emotionImg}
                    alt="EmotionIcon"
                    className={`${
                      emotionImg ? "" : "hidden"
                    } w-[3.5rem] rounded-md object-contain`}
                  />
                </div>
              ) : (
                "Эмоция"
              )}
            </button>
            <PlotfieldEmotionPromptMain
              characterId={characterId}
              emotionName={emotionName}
              setEmotionImg={setEmotionImg}
              setEmotionName={setEmotionName}
              setEmotionId={setEmotionId}
              setShowEmotionModal={setShowAllEmotions}
              showEmotionModal={showAllEmotions}
            />
          </div>
        </>
      )}

      <form className="flex-grow" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Вопрос"
          className="w-full px-[1rem] py-[.5rem] outline-gray-300 bg-white rounded-md shadow-md text-gray-600 text-[1.4rem]"
        />
      </form>

      <div className="relative ml-auto">
        <ButtonHoverPromptModal
          onClick={() => setShowCreateChoiceOptionModal((prev) => !prev)}
          variant={"rectangle"}
          contentName="Создать Ответ"
          positionByAbscissa="right"
          asideClasses="text-[1.4rem] text-gray-700"
          className="bg-white rounded-md shadow-md p-[.2rem]"
        >
          <img src={plus} alt="Add" className="w-[3rem] object-contain" />
        </ButtonHoverPromptModal>

        <CreateChoiceOptionTypeModal
          choiceId={choiceId}
          setShowCreateChoiceOptionModal={setShowCreateChoiceOptionModal}
          showCreateChoiceOptionModal={showCreateChoiceOptionModal}
          topologyBlockId={topologyBlockId}
        />
      </div>
    </div>
  );
}
