import { useEffect, useState } from "react";
import PreviewImageSmallIcons from "../../../../../shared/utilities/PreviewImageSmallIcons";
import useUpdateImg from "../../../../../../hooks/Patching/useUpdateImg";

type BackgroundNameAndImageTypes = {
  commandBackgroundId: string;
  imagePreview: string | null | ArrayBuffer;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setBackgroundName: React.Dispatch<React.SetStateAction<string>>;
  backgroundName: string;
};

export default function BackgroundNameAndImage({
  commandBackgroundId,
  imagePreview,
  setPreview,
  setBackgroundName,
  backgroundName,
}: BackgroundNameAndImageTypes) {
  const updateBackgroundImg = useUpdateImg({
    id: commandBackgroundId ?? "",
    path: "/plotFieldCommands/backgrounds",
    preview: imagePreview,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted && imagePreview) {
      updateBackgroundImg.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="sm:w-[77%] flex-grow flex-col w-full flex gap-[1rem] items-center"
    >
      <div className="w-full flex gap-[1rem] items-center">
        <input
          value={backgroundName || ""}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Название заднего плана"
          onChange={(e) => setBackgroundName(e.target.value)}
        />
        <PreviewImageSmallIcons
          imagePreview={imagePreview}
          imgClasses="cursor-pointer h-[3rem] w-[3rem] object-cover"
          setPreview={setPreview}
          divClasses="w-[5rem] h-full bg-white rounded-md relative"
        />
      </div>
    </form>
  );
}
