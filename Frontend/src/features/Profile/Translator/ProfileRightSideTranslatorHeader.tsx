import { useRef, useState } from "react";
import {
  AllPossibleSubCategoryTypes,
  PossibleCategoryVariationTypes,
} from "./ProfileRightSideTranslator";
import useOutOfModal from "../../../hooks/UI/useOutOfModal";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import ProfileTranslatorHeaderLanguageModal from "./ProfileTranslatorHeaderLanguageModal";

const CATEGORIES = ["Касаемое Персонажа", "Касаемое Истории", "Сюжет"];

type ProfileRightSideTranslatorHeaderTypes = {
  setTranslateFromLanguage: React.Dispatch<
    React.SetStateAction<CurrentlyAvailableLanguagesTypes>
  >;
  setTranslateToLanguage: React.Dispatch<
    React.SetStateAction<CurrentlyAvailableLanguagesTypes>
  >;
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  setSubCategory: React.Dispatch<
    React.SetStateAction<AllPossibleSubCategoryTypes>
  >;
  setCategory: React.Dispatch<
    React.SetStateAction<PossibleCategoryVariationTypes>
  >;
  category: PossibleCategoryVariationTypes;
  subCategory: AllPossibleSubCategoryTypes;
};

export default function ProfileRightSideTranslatorHeader({
  category,
  subCategory,
  setCategory,
  setSubCategory,
  setTranslateFromLanguage,
  setTranslateToLanguage,
  translateFromLanguage,
  translateToLanguage,
}: ProfileRightSideTranslatorHeaderTypes) {
  return (
    <header className="flex flex-col gap-[1rem] p-[.5rem] bg-neutral-alabaster rounded-md shadow-sm">
      <div className="flex gap-[1rem] sm:flex-nowrap flex-wrap z-[3] w-full">
        {CATEGORIES.map((c) => (
          <ProfileRightSideTranslatorCategory
            key={c}
            name={c}
            category={category}
            subCategory={subCategory}
            setCategory={setCategory}
            setSubCategory={setSubCategory}
          />
        ))}
      </div>
      <div className="flex w-full justify-between">
        <ProfileTranslatorHeaderLanguageModal
          key={"Перевести с"}
          takenValue={translateToLanguage}
          setValue={setTranslateFromLanguage}
          value={translateFromLanguage}
          text="Перевести с"
        />
        <ProfileTranslatorHeaderLanguageModal
          key={"Перевести на"}
          takenValue={translateFromLanguage}
          setValue={setTranslateToLanguage}
          value={translateToLanguage}
          text="Перевести на"
        />
      </div>
    </header>
  );
}

const SUB_CATEGORIES_FOR_CHARACTER = [
  "Персонажи",
  "Эмоции",
  "Внешний Вид",
  "Характеристики",
];
const SUB_CATEGORIES_FOR_STORY = ["Эпизоды", "Сезоны", "Истории"];

type ProfileRightSideTranslatorCategoryTypes = {
  setSubCategory: React.Dispatch<
    React.SetStateAction<AllPossibleSubCategoryTypes>
  >;
  setCategory: React.Dispatch<
    React.SetStateAction<PossibleCategoryVariationTypes>
  >;
  name: string;
  category: PossibleCategoryVariationTypes;
  subCategory: AllPossibleSubCategoryTypes;
};
function ProfileRightSideTranslatorCategory({
  category,
  setSubCategory,
  setCategory,
  subCategory,
  name,
}: ProfileRightSideTranslatorCategoryTypes) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const nameToEng: PossibleCategoryVariationTypes =
    name === "Касаемое Персонажа"
      ? "everythingCharacter"
      : name === "Касаемое Истории"
      ? "everythingStory"
      : "everythingPlot";

  useOutOfModal({ modalRef, setShowModal, showModal });

  return (
    <div className="flex-grow sm:max-w-full max-w-fit w-full rounded-md shadow-md relative whitespace-nowrap">
      <button
        onClick={(e) => {
          if (nameToEng !== "everythingPlot") {
            e.stopPropagation();
            setShowModal((prev) => !prev);
          } else {
            setCategory(nameToEng);
            setSubCategory("" as AllPossibleSubCategoryTypes);
          }
        }}
        className={`text-[1.5rem] w-full rounded-md ${
          category === nameToEng
            ? "text-white bg-primary-pastel-blue"
            : "text-gray-700 bg-white"
        } hover:bg-primary-pastel-blue hover:text-white transition-all px-[1rem] py-[.5rem] outline-gray-400`}
      >
        {name}
      </button>
      <aside
        ref={modalRef}
        className={`${
          showModal ? "" : "hidden"
        } flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[1rem] p-[1rem]`}
      >
        {nameToEng === "everythingCharacter" ? (
          <>
            {SUB_CATEGORIES_FOR_CHARACTER.map((c) => (
              <button
                onClick={() => {
                  setCategory(nameToEng);
                  setSubCategory(c as AllPossibleSubCategoryTypes);
                  setShowModal(false);
                }}
                className={`${
                  c === subCategory
                    ? "bg-primary-pastel-blue text-white px-[1rem] py-[.5rem] rounded-md shadow-sm w-full"
                    : "text-gray-700 bg-white"
                } text-[1.5rem] hover:bg-primary-pastel-blue hover:text-white transition-all px-[1rem] py-[.5rem] rounded-md outline-gray-400`}
                key={c}
              >
                {c}
              </button>
            ))}
          </>
        ) : nameToEng === "everythingStory" ? (
          <>
            {SUB_CATEGORIES_FOR_STORY.map((c) => (
              <button
                onClick={() => {
                  setCategory(nameToEng);
                  setSubCategory(c as AllPossibleSubCategoryTypes);
                  setShowModal(false);
                }}
                className={`${
                  c === subCategory
                    ? "bg-primary-pastel-blue text-white px-[1rem] py-[.5rem] rounded-md shadow-sm w-full"
                    : "text-gray-700 bg-white"
                } text-[1.5rem] hover:bg-primary-pastel-blue hover:text-white transition-all px-[1rem] py-[.5rem] rounded-md outline-gray-400`}
                key={c}
              >
                {c}
              </button>
            ))}
          </>
        ) : null}
      </aside>
    </div>
  );
}
