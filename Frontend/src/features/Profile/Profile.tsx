import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetStaffMember from "../../hooks/Fetching/Staff/useGetStaffMember";
import useCheckKeysCombinationExpandTranslationSide from "../../hooks/helpers/useCheckKeysCombinationExpandTranslationSide";
import useDebounce from "../../hooks/utilities/useDebounce";
import { StoryFilterTypes } from "../Story/Story";
import ProfileLeftSide from "./ProfileLeftSide";
import ProfileRightSideScriptWriter from "./Scriptwriter/ProfileRightSideScriptWriter";
import ProfileRightSideTranslator from "./Translator/ProfileRightSideTranslator";

export default function Profile() {
  const { staffId } = useParams();
  const { data: user } = useGetStaffMember({ staffId: staffId ?? "" });
  const [isTranslator, setIsTranslator] = useState(false);

  useEffect(() => {
    if (user && user.roles.includes("translator")) {
      setIsTranslator(true);
    }
  }, [user]);
  const expandedTranslationSide =
    useCheckKeysCombinationExpandTranslationSide();

  const [storiesType, setStoriesType] = useState<StoryFilterTypes>("all");
  const [searchValue, setSearchValue] = useState("");
  const debouncedStory = useDebounce({ value: searchValue, delay: 600 });
  // isTranslator &&
  return (
    <section className="max-w-[146rem] px-[1rem] mx-auto flex sm:flex-row flex-col gap-[1rem] py-[1rem] relative items-center sm:items-start">
      <ProfileLeftSide
        expandedTranslationSide={
          expandedTranslationSide === "expandTranslationSide"
        }
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setStoriesType={setStoriesType}
        storiesType={storiesType}
      />
      <ProfileRightSideTranslator />
      {/* <div className="w-full flex flex-col gap-[1rem]">
            <ProfileRightSideScriptWriter
              storiesType={storiesType}
              debouncedStory={debouncedStory}
            />
          </div> */}
    </section>
  );
}

{
  /* <Link to={"/stories"} className="absolute top-[1rem] left-[1rem]">
        <img src={back} alt="Back" className="w-[3rem]" />
      </Link>
      <button className="absolute top-[1rem] right-[1rem]">
        <img src={logout} alt="Logout" className="w-[3rem]" />
      </button> */
}
