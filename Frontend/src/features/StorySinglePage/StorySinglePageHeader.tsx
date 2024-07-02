import { Link } from "react-router-dom";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import characters from "../../assets/images/Story/characters.png";

export default function StorySinglePageHeader() {
  return (
    <header className="flex flex-col gap-[1rem]">
      <h1 className="text-[3.5rem] bg-white text-gray-700 rounded-md shadow-md w-fit px-[1rem]">
        Ночь Диких Пчёл
      </h1>
      <div className="flex gap-[1rem] justify-between items-center md:flex-row flex-col relative">
        <div className="flex gap-[1rem] items-center flex-wrap">
          {...Array.from({ length: 5 }).map((_, i) => (
            <div key={i + 1} className="flex flex-col items-center gap-[.5rem]">
              <div className="h-[5rem] w-[5rem] bg-white rounded-full shadow-md relative">
                <p className="text-[1.5rem] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  {i + 1}
                </p>
              </div>
              <h3 className="text-[1.3rem]">Achievements</h3>
            </div>
          ))}
        </div>
        <ButtonHoverPromptModal
          className="block md:hidden"
          positionForDiv="left-0 bottom-[-4.5rem]"
          position="absolute"
          contentName="Персонажи"
          positionByAbscissa="left"
          asideClasses="text-[1.3rem] top-[5.5rem] bottom-[-3.2rem]"
          variant="rectangle"
        >
          <Link to={"/editor/characters"}>
            <img src={characters} className="w-[5rem]" alt="Characters" />
          </Link>
        </ButtonHoverPromptModal>
        <ButtonHoverPromptModal
          className="md:block hidden"
          contentName="Персонажи"
          positionByAbscissa="right"
          asideClasses="text-[1.3rem] top-[5.5rem] bottom-[-3.2rem]"
          variant="rectangle"
        >
          <Link to={"/editor/characters"}>
            <img src={characters} className="w-[5rem]" alt="Characters" />
          </Link>
        </ButtonHoverPromptModal>
      </div>
    </header>
  );
}
