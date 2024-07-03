import { useState } from "react";
import { Link } from "react-router-dom";
import createStory from "../../assets/images/Story/createStory.png";
import profile from "../../assets/images/Story/profile.png";
import LightBox from "../shared/utilities/LightBox";

type StoryHeaderTypes = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
};

export default function StoryHeader({
  setSearchValue,
  searchValue,
}: StoryHeaderTypes) {
  const [showCreatingModal, setShowCreatingModal] = useState(false);

  return (
    <>
      <header className="flex justify-between mt-[1rem] p-[1rem] bg-white rounded-md shadow-md">
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <input
            type="text"
            value={searchValue}
            className="py-[.5rem] px-[1rem] rounded-md outline-none sm:w-[30rem] w-[20rem] placeholder:text-gray-300 placeholder:font-medium text-gray-700 text-[1.6rem]"
            placeholder="Зомби Апокалипсис"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <div className="flex gap-[1rem] items-center">
          <button
            onClick={() => setShowCreatingModal(true)}
            className="outline-none"
          >
            <img src={createStory} alt="CreateStory" className="w-[3.5rem]" />
          </button>
          <Link to={"/profile"}>
            <img src={profile} alt="Profile" className="w-[3.5rem]" />
          </Link>
        </div>
      </header>
      <aside
        className={`${
          showCreatingModal ? "top-[10rem]" : "-top-[100%]"
        } bg-white md:w-[40rem] w-[30rem] transition-all md:h-[40rem] h-[30rem] rounded-md fixed z-[10] left-1/2 -translate-x-1/2`}
      >
        <form className="flex flex-col gap-[1rem] p-[1.5rem]">
          <input
            type="text"
            placeholder="Тайтл Истории"
            className="text-[1.5rem] w-full outline-none p-[1rem] border-[2px] border-dotted border-accent-marine-blue rounded-md text-gray-600 font-medium"
          />
          <textarea
            placeholder="Описание Истории"
            cols={30}
            rows={10}
            className="text-[1.5rem] max-h-[35rem] w-full outline-none p-[1rem] border-[2px] border-dotted border-accent-marine-blue rounded-md text-gray-600 font-medium"
          />
          <button
            type="submit"
            className="text-[1.5rem] w-fit self-end mt-[2rem] px-[1rem] py-[.5rem] rounded-md border-[1px] border-black hover:scale-[1.01] hover:shadow-sm active:scale-[0.98]"
          >
            Завершить
          </button>
        </form>
      </aside>
      <LightBox
        isLightBox={showCreatingModal}
        setIsLightBox={setShowCreatingModal}
      />
    </>
  );
}
