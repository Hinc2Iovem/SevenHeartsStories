import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import characters from "../../assets/images/Story/characters.png";
import emotion from "../../assets/images/Story/emotion.png";
import wardrobe from "../../assets/images/Story/wardrobe.png";
import info from "../../assets/images/shared/info.png";
import arrowBack from "../../assets/images/shared/prev.png";
import { MATCHMEDIA } from "../../const/MATCHMEDIA";
import useMatchMedia from "../../hooks/UI/useMatchMedia";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import LightBox from "../shared/utilities/LightBox";
import AssignStory from "./AssignStory";
import StoryInfoModal from "./StoryInfoModal";
import useGetTranslationStory from "../../hooks/Fetching/Translation/useGetTranslationStory";
import { TranslationStoryTypes } from "../../types/Additional/TranslationTypes";

export default function StorySinglePageHeader() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  const { storyId } = useParams();
  const [infoModal, setInfoModal] = useState(false);
  const translationStory = useGetTranslationStory({
    id: storyId ?? "",
    language: "russian",
  });
  const [storyName, setStoryName] = useState<
    TranslationStoryTypes | undefined
  >();

  useEffect(() => {
    if (translationStory.data) {
      setStoryName(
        translationStory.data?.find((ts) => ts.textFieldName === "storyName")
      );
    }
  }, [translationStory.data]);

  return (
    <>
      <header className="flex flex-col gap-[2rem]">
        <div className="flex justify-between flex-wrap">
          <Link to={"/stories"} className="w-fit outline-none">
            <img
              src={arrowBack}
              alt="GoBack"
              className="w-[3.5rem] hover:scale-[1.01]"
            />
          </Link>
          <div className="flex gap-[.5rem]">
            <div className="relative">
              <ButtonHoverPromptModal
                className=""
                contentName="Информация по истории"
                positionByAbscissa="right"
                asideClasses="text-[1.3rem] top-[4.5rem] bottom-[-3.2rem]"
                variant="rectangle"
                onClick={(e) => {
                  e.stopPropagation();
                  setInfoModal(true);
                }}
              >
                <img
                  src={info}
                  className="w-[4rem] bg-white rounded-md shadow-sm shadow-gray-400 active:scale-[0.98]"
                  alt="Info"
                />
              </ButtonHoverPromptModal>
              {infoModal && !isMobile ? (
                <StoryInfoModal
                  infoModal={infoModal}
                  setInfoModal={setInfoModal}
                  className="w-[30rem] min-h-[30rem] right-[0rem] absolute"
                />
              ) : null}
            </div>
            <ButtonHoverPromptModal
              contentName="Эмоции"
              positionByAbscissa="right"
              asideClasses="text-[1.3rem] top-[4.5rem] bottom-[-3.2rem]"
              variant="rectangle"
            >
              <Link to={"/emotions"}>
                <img
                  src={emotion}
                  className="w-[4rem] bg-white rounded-md shadow-sm shadow-gray-400"
                  alt="Emotion"
                />
              </Link>
            </ButtonHoverPromptModal>
            <ButtonHoverPromptModal
              contentName="Гардероб"
              positionByAbscissa="right"
              asideClasses="text-[1.3rem] top-[4.5rem] bottom-[-3.2rem]"
              variant="rectangle"
            >
              <Link to={"/wardrobes"}>
                <img
                  src={wardrobe}
                  className="w-[4rem] bg-white rounded-md shadow-sm shadow-gray-400"
                  alt="Wardrobe"
                />
              </Link>
            </ButtonHoverPromptModal>
            <ButtonHoverPromptModal
              contentName="Персонажи"
              positionByAbscissa="right"
              asideClasses="text-[1.3rem] top-[4.5rem] bottom-[-3.2rem]"
              variant="rectangle"
            >
              <Link to={"/editor/characters"}>
                <img
                  src={characters}
                  className="w-[4rem] bg-white rounded-md shadow-sm shadow-gray-400"
                  alt="Characters"
                />
              </Link>
            </ButtonHoverPromptModal>
          </div>
        </div>
        <AssignStory />

        <h1 className="text-[3.5rem] bg-white text-gray-700 rounded-md shadow-md w-fit px-[1rem]">
          {storyName?.text}
        </h1>
      </header>

      {infoModal && isMobile ? (
        <StoryInfoModal
          infoModal={infoModal}
          setInfoModal={setInfoModal}
          className={`fixed w-[30rem] min-h-[30rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`}
        />
      ) : null}
      {isMobile && (
        <LightBox isLightBox={infoModal} setIsLightBox={setInfoModal} />
      )}
    </>
  );
}
