import { useEffect, useState } from "react";
import scriptwriter from "../../assets/images/Auth/scriptwriter.png";
import translator from "../../assets/images/Auth/translator.png";
import crown from "../../assets/images/Profile/crown.png";
import editor from "../../assets/images/Profile/editor.png";
import useGetStaffInfoById from "../../hooks/Fetching/Staff/useGetStaffInfoById";
import useGetStaffMember from "../../hooks/Fetching/Staff/useGetStaffMember";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";
import { StaffRoles } from "../../types/Staff/StaffTypes";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import PreviewImage from "../shared/utilities/PreviewImage";
import StoryFilterTypesHeader from "../Story/StoryFilterTypes";
import { StoryFilterTypes } from "../Story/Story";

type ProfileLeftSideTypes = {
  setStoriesType: React.Dispatch<React.SetStateAction<StoryFilterTypes>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  expandedTranslationSide: boolean;
  searchValue: string;
  storiesType: StoryFilterTypes;
};

export default function ProfileLeftSide({
  setStoriesType,
  setSearchValue,
  storiesType,
  searchValue,
  expandedTranslationSide,
}: ProfileLeftSideTypes) {
  const staffId = localStorage.getItem("staffId");
  const { data: staff } = useGetStaffMember({ staffId: staffId ?? "" });
  const { data: staffInfo } = useGetStaffInfoById({ staffId: staffId ?? "" });

  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const updateImg = useUpdateImg({
    id: staffId ?? "",
    path: "/staff",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      updateImg.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  return (
    <div
      className={`${
        expandedTranslationSide ? "hidden" : ""
      } flex gap-[1rem] sm:flex-col sm:w-[20rem] w-full h-full flex-shrink-0 flex-wrap`}
    >
      <div className="w-[20rem] flex-grow h-[20rem] relative bg-white rounded-md shadow-sm border-white border-[3px]">
        {staff?.imgUrl ? (
          <img
            src={staff.imgUrl}
            alt="AvatarImg"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <PreviewImage
            imgClasses="w-full h-full object-cover rounded-md absolute top-0 bottom-0 left-0 right-0 border-[3px] border-white"
            imagePreview={imagePreview}
            setPreview={setPreview}
          />
        )}
      </div>
      <div className="flex gap-[1rem] flex-col flex-grow min-w-[20rem] sm:bg-none bg-neutral-alabaster p-[1rem] justify-center shadow-sm">
        <div className="w-full p-[1rem] bg-white rounded-md shadow-sm">
          <h3 className="text-[1.5rem] text-center">{staff?.username}</h3>
        </div>
        <div className="w-full p-[1rem] bg-white rounded-md shadow-sm flex gap-[.5rem] items-center justify-center">
          <h3 className="text-[1.5rem] text-center">Роль:</h3>
          {staff?.roles.map((r) => (
            <RenderStaffRoles key={r} role={r} />
          ))}
        </div>
        <div
          className={`${
            staff?.roles.includes("scriptwriter" || "headscriptwriter")
              ? ""
              : "hidden"
          } w-full p-[1rem] bg-white rounded-md shadow-sm`}
        >
          <h3 className="text-[1.5rem] text-center">
            Количество законченных эпизодов:{" "}
            {staffInfo?.amountOfFinishedEpisodes ?? 0}
          </h3>
        </div>
      </div>

      <div
        className={`${
          staff?.roles.includes("scriptwriter" || "headscriptwriter")
            ? "hidden"
            : ""
        } bg-neutral-alabaster w-full min-w-[20rem] flex-grow flex flex-col gap-[1rem] py-[1rem] p-[.5rem] rounded-md shadow-md`}
      >
        <form
          className="w-full bg-white rounded-md shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="StorySearch"
            id="storySearch"
            className="w-full text-[1.5rem] text-gray-700 px-[1rem] py-[.5rem] outline-none  rounded-md"
            placeholder="Название Истории"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <StoryFilterTypesHeader
          setStoriesType={setStoriesType}
          storiesType={storiesType}
        />
      </div>
    </div>
  );
}

function RenderStaffRoles({ role }: { role: StaffRoles }) {
  const [currentImg] = useState(
    role === "scriptwriter"
      ? scriptwriter
      : role === "translator"
      ? translator
      : role === "editor"
      ? editor
      : role === "headscriptwriter"
      ? scriptwriter
      : scriptwriter
  );
  const [currentContentName] = useState(
    role === "scriptwriter"
      ? "Сценарист"
      : role === "translator"
      ? "Переводчик"
      : role === "editor"
      ? "Редактор"
      : role === "headscriptwriter"
      ? "Главный сценарист"
      : "Сценарист"
  );

  return (
    <>
      <ButtonHoverPromptModal
        contentName={currentContentName}
        positionByAbscissa="left"
        asideClasses="text-[1.3rem] top-[4rem] bottom-[-3.3rem]"
      >
        {role === "headscriptwriter" && (
          <img
            src={crown}
            alt="Crown"
            className="w-[2rem] absolute -translate-y-1/2 translate-x-[95%] rotate-[35deg]"
          />
        )}
        <img src={currentImg} alt="Scriptwriter" className="w-[3.5rem]" />
      </ButtonHoverPromptModal>
    </>
  );
}
