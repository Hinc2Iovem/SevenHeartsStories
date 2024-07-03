import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MATCHMEDIA } from "../../const/MATCHMEDIA";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import characters from "../../assets/images/Story/characters.png";
import wardrobe from "../../assets/images/Story/wardrobe.png";
import emotion from "../../assets/images/Story/emotion.png";
import info from "../../assets/images/shared/info.png";
import arrowBack from "../../assets/images/shared/prev.png";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import useMatchMedia from "../../hooks/UI/useMatchMedia";
import LightBox from "../shared/utilities/LightBox";

export default function StorySinglePageHeader() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  const [infoModal, setInfoModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutOfModal({ modalRef, setShowModal: setInfoModal, showModal: infoModal });

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
              <aside
                ref={modalRef}
                className={`${
                  infoModal && !isMobile ? "" : "hidden"
                } absolute z-10 bg-neutral-alabaster rounded-md shadow-sm shadow-gray-600 w-[30rem] min-h-[30rem] right-[0rem] flex flex-col`}
              ></aside>
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
        <h1 className="text-[3.5rem] bg-white text-gray-700 rounded-md shadow-md w-fit px-[1rem]">
          Ночь Диких Пчёл
        </h1>
      </header>

      <aside
        className={`${
          infoModal && isMobile ? "" : "hidden"
        } fixed z-10 bg-neutral-alabaster rounded-md shadow-sm shadow-gray-600 w-[30rem] min-h-[30rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`}
      ></aside>
      {isMobile && (
        <LightBox isLightBox={infoModal} setIsLightBox={setInfoModal} />
      )}
    </>
  );
}
