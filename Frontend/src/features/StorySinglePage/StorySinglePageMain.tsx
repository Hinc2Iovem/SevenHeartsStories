import add from "../../assets/images/shared/add.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrowDown from "../../assets/images/shared/arrowDown.png";
import arrowUp from "../../assets/images/shared/arrowUp.png";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";

export default function StorySinglePageMain() {
  const [shrinkEpisodes, setShrinkEpisodes] = useState(false);

  return (
    <main className="flex flex-col gap-[2rem] mt-[5rem] mb-[3rem]">
      <div className="flex w-full justify-between items-center relative">
        <div className="bg-white p-[1rem] px-[2rem] rounded-md shadow-md">
          <h2 className="text-[2.5rem] text-gray-700">Случай в лесу</h2>
        </div>
        <ButtonHoverPromptModal
          asideClasses="text-[1.5rem] top-[3.9rem] bottom-[-3.9rem]"
          contentName="Создать Сезон"
          positionByAbscissa="right"
          className="w-fit bg-white rounded-md shadow-sm shadow-gray-500 p-[.2rem]"
          variant={"rectangle"}
        >
          <img src={add} alt="NewSeason" className="w-[3rem]" />
        </ButtonHoverPromptModal>

        <button
          onClick={() => setShrinkEpisodes((prev) => !prev)}
          className={`${
            shrinkEpisodes ? "hidden" : ""
          } absolute top-[3rem] left-[21.5rem]`}
        >
          <img src={arrowUp} alt="See more" className="w-[3rem]" />
        </button>
        <button
          onClick={() => setShrinkEpisodes((prev) => !prev)}
          className={`${
            shrinkEpisodes ? "" : "hidden"
          } absolute top-[3rem] left-[21.5rem]`}
        >
          <img src={arrowDown} alt="See less" className="w-[3rem]" />
        </button>
      </div>

      <ul
        className={`flex flex-col gap-[1rem] ${
          shrinkEpisodes ? "h-[5rem] overflow-hidden" : ""
        }`}
      >
        {...Array.from({ length: 10 }).map((_, i) => (
          <Link key={i + 1} to={"/episodes/:episodeId"}>
            <li className="text-[1.5rem] text-gray-700 bg-white w-full rounded-md shadow-sm shadow-gray-300 p-[1rem] hover:scale-[1.01]">
              Эпизод {i + 1}
            </li>
          </Link>
        ))}
        <ButtonHoverPromptModal
          asideClasses="text-[1.5rem] top-[3.9rem] bottom-[-3.9rem]"
          contentName="Создать Эпизод"
          positionByAbscissa="left"
          className="w-fit bg-white rounded-md shadow-sm shadow-gray-500 p-[.2rem]"
          variant={"rectangle"}
        >
          <img src={add} alt="NewEpisode" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </ul>
    </main>
  );
}
