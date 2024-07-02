import { useState } from "react";
import storyBg from "../../assets/images/Story/storyBg.png";
import add from "../../assets/images/shared/add.png";
// import plus from "../../assets/images/shared/plus.png";

export default function StoryList() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <main className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-[1rem]">
      {...Array.from({ length: 10 }).map((i) => (
        <article
          key={i as number}
          className="flex flex-col gap-[1rem] rounded-md shadow-sm bg-white w-fit h-[30rem]"
        >
          {hasImage ? (
            <div className="w-full h-1/2 rounded-t-md relative">
              <img
                src={storyBg}
                alt="StoryBackground"
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
          ) : (
            <div className="w-full h-1/2 p-[1rem] relative">
              <img
                src={add}
                draggable="false"
                alt="Plus"
                className="w-[5rem] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute cursor-pointer object-cover text-[1.3rem]"
              />
            </div>
          )}
          <div className="flex flex-col gap-[1rem] p-[1rem]">
            <h3 className="text-[1.8rem]">Тайтл Истории</h3>
            <p className="text-[1.2rem] self-end">Эпизодов 0</p>
          </div>
          <h4 className="text-[1.3rem] p-[1rem]">
            Жанры: научная-фантастика, детектив
          </h4>
        </article>
      ))}
    </main>
  );
}
