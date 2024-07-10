import { SearchCharacterVariationTypes } from "../CharacterListPage";

type CharacterHeaderSearchTypeBtnsProps = {
  setSearchCharacterType: React.Dispatch<
    React.SetStateAction<SearchCharacterVariationTypes>
  >;
  searchCharacterType: SearchCharacterVariationTypes;
};

export default function CharacterHeaderSearchTypeBtns({
  setSearchCharacterType,
  searchCharacterType,
}: CharacterHeaderSearchTypeBtnsProps) {
  return (
    <div className="flex gap-[1rem] flex-wrap">
      <button
        onClick={() => setSearchCharacterType("all")}
        className={`${
          searchCharacterType === "all"
            ? "text-white bg-primary-pastel-blue"
            : "text-gray-700 bg-white hover:text-white hover:bg-primary-pastel-blue"
        } text-[1.4rem] rounded-md shadow-md px-[1rem] py-[.5rem] transition-all active:scale-[0.99]`}
      >
        Все
      </button>
      <button
        onClick={() => setSearchCharacterType("maincharacter")}
        className={`${
          searchCharacterType === "maincharacter"
            ? "text-white bg-primary-pastel-blue"
            : "text-gray-700 bg-white hover:text-white hover:bg-primary-pastel-blue"
        } text-[1.4rem] rounded-md shadow-md px-[1rem] py-[.5rem] transition-all active:scale-[0.99]`}
      >
        Главный персонаж
      </button>
      <button
        onClick={() => setSearchCharacterType("minorcharacter")}
        className={`${
          searchCharacterType === "minorcharacter"
            ? "text-white bg-primary-pastel-blue"
            : "text-gray-700 bg-white hover:text-white hover:bg-primary-pastel-blue"
        } text-[1.4rem] rounded-md shadow-md px-[1rem] py-[.5rem] transition-all active:scale-[0.99]`}
      >
        Второстепенные персонажи
      </button>
      <button
        onClick={() => setSearchCharacterType("emptycharacter")}
        className={`${
          searchCharacterType === "emptycharacter"
            ? "text-white bg-primary-pastel-blue"
            : "text-gray-700 bg-white hover:text-white hover:bg-primary-pastel-blue"
        } text-[1.4rem] rounded-md shadow-md px-[1rem] py-[.5rem] transition-all active:scale-[0.99]`}
      >
        Персонажи третьего плана
      </button>
    </div>
  );
}
