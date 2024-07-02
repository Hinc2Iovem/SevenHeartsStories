import { useState } from "react";
import storyBg from "../../assets/images/Story/storyBg.png";
import add from "../../assets/images/shared/add.png";
import { Link } from "react-router-dom";

export default function StoryItem() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <article className="flex flex-col gap-[1rem] w-full rounded-md shadow-sm bg-white h-[30rem]">
      {hasImage ? (
        <div className="w-full h-1/2 rounded-t-md relative shadow-sm">
          <img
            src={storyBg}
            alt="StoryBackground"
            className="object-cover w-full h-full cursor-pointer rounded-t-md border-[3px] border-white"
          />
        </div>
      ) : (
        <div className="w-full h-1/2 p-[1rem] relative shadow-sm">
          <img
            src={add}
            draggable="false"
            alt="Plus"
            className="w-[5rem] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute cursor-pointer object-cover text-[1.3rem]"
          />
        </div>
      )}
      <Link className="flex flex-col" to={"/stories/:storyId"}>
        <div className="flex flex-col gap-[.5rem] p-[1rem]">
          <h3 className="text-[1.8rem] m-0 p-0 ">Тайтл Истории</h3>
          <h4 className="text-[1.3rem]">Жанры: научная-фантастика, детектив</h4>
        </div>
        <p className="text-[1.2rem] self-end p-[1rem] mt-auto">Эпизодов 0</p>
      </Link>
    </article>
  );
}
