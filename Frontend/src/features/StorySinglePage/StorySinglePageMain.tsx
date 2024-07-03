import add from "../../assets/images/shared/add.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrowDown from "../../assets/images/shared/arrowDown.png";
import arrowUp from "../../assets/images/shared/arrowUp.png";

export default function StorySinglePageMain() {
  const [shrinkEpisodes, setShrinkEpisodes] = useState(true);

  return (
    <main className="flex flex-col gap-[2rem] mt-[5rem]">
      <div className="flex w-full justify-between items-center relative">
        <div className="bg-white p-[1rem] px-[2rem] rounded-md shadow-md">
          <h2 className="text-[2.5rem] text-gray-700">Случай в лесу</h2>
        </div>
        <button>
          <img src={add} alt="NewSeason" className="w-[4rem]" />
        </button>

        <button
          onClick={() => setShrinkEpisodes((prev) => !prev)}
          className={`${
            shrinkEpisodes ? "hidden" : ""
          } absolute top-[0rem] left-[21.5rem]`}
        >
          <img src={arrowUp} alt="See more" className="w-[3rem]" />
        </button>
        <button
          onClick={() => setShrinkEpisodes((prev) => !prev)}
          className={`${
            shrinkEpisodes ? "" : "hidden"
          } absolute top-[0rem] left-[21.5rem]`}
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
        <button>
          <img src={add} alt="NewSeason" className="w-[4rem]" />
        </button>
      </ul>
    </main>
  );
}
