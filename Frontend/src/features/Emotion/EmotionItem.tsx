import storyBg from "../../assets/images/Story/storyBg.png";
import { useState } from "react";
import add from "../../assets/images/shared/add.png";

export default function EmotionItem() {
  const [hasImage, setHasImage] = useState(false);
  return (
    <article className="w-full min-h-[24rem] h-full rounded-md shadow-md shadow-gray-400 bg-white">
      <div className="relative border-[3px] w-full h-[20rem] border-white">
        <img
          src={hasImage ? storyBg : add}
          alt="StoryBg"
          className={`${
            hasImage
              ? "w-full h-full object-cover"
              : "w-[10rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer"
          } absolute rounded-md`}
        />
      </div>
      <div className="bg-white w-full p-[1rem] rounded-b-md shadow-md shadow-gray-400">
        <p className="text-[1.5rem] hover:text-gray-600 transition-all">
          Blond
        </p>
      </div>
    </article>
  );
}
