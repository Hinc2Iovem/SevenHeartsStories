import { Link } from "react-router-dom";
import storyBg from "../../../assets/images/Story/storyBg.png";
import { useState } from "react";

export default function ProfileRightSide() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] grid-rows-[repeat(auto-fit,minmax(25rem,1fr))] gap-[1rem] sm:justify-items-start justify-items-center w-full">
      {...Array.from({ length: 10 }).map((_, i) => (
        <ProfileRightSideItem key={(i + 1) as number} />
      ))}
    </div>
  );
}

function ProfileRightSideItem() {
  const [title, setTitle] = useState("Дикий Аромат Пчёл");

  return (
    <article className="w-full h-[24rem] rounded-md shadow-md shadow-gray-400">
      <div className="relative border-[3px] w-full h-[20rem] border-white">
        <img
          src={storyBg}
          alt="StoryBg"
          className="w-full h-full object-cover absolute rounded-md"
        />
      </div>
      <div className="bg-white w-full p-[1rem] rounded-b-md shadow-md shadow-gray-400">
        <Link
          to={"/stories/:storyId"}
          className="text-[1.5rem] hover:text-gray-600 transition-all"
        >
          {title.length > 25 ? title.substring(0, 25) + "..." : title}
        </Link>
      </div>
    </article>
  );
}
