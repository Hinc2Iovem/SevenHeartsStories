import { useEffect, useRef, useState } from "react";
import useGetSeasonTranslationByTextFieldNameAndSearch from "../../../../hooks/Fetching/Season/useGetSeasonTranslationByTextFieldNameAndSearch";
import useOutOfModal from "../../../../hooks/UI/useOutOfModal";
import useDebounce from "../../../../hooks/utilities/useDebounce";

type SeasonPromptTypes = {
  setSeasonId: React.Dispatch<React.SetStateAction<string>>;
  storyId: string;
};

export default function SeasonPrompt({
  setSeasonId,
  storyId,
}: SeasonPromptTypes) {
  const [showSeasons, setShowSeasons] = useState(false);
  const [seasonValue, setSeasonValue] = useState("");
  const modalSeasonsRef = useRef<HTMLDivElement>(null);

  useOutOfModal({
    modalRef: modalSeasonsRef,
    setShowModal: setShowSeasons,
    showModal: showSeasons,
  });

  const debouncedValue = useDebounce({ value: seasonValue, delay: 500 });

  const { data: seasonsSearch, isLoading } =
    useGetSeasonTranslationByTextFieldNameAndSearch({
      debouncedValue,
      language: "russian",
      storyId,
    });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      setSeasonId(
        seasonsSearch?.find((cs) => cs.text === debouncedValue)?.seasonId || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, seasonsSearch]);

  return (
    <form
      className="bg-white rounded-md shadow-md relative"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="w-full rounded-md shadow-md bg-white text-[1.3rem] px-[1rem] py-[.5rem] text-gray-700 outline-none"
        placeholder="Название Сезона"
        onClick={(e) => {
          e.stopPropagation();
          setShowSeasons(true);
        }}
        value={seasonValue}
        onChange={(e) => setSeasonValue(e.target.value)}
      />
      {storyId ? (
        <aside
          ref={modalSeasonsRef}
          className={`${
            showSeasons ? "" : "hidden"
          } max-h-[15rem] overflow-auto flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[.5rem] p-[1rem] | containerScroll`}
        >
          {isLoading ? (
            <div className="text-[1.4rem] text-gray-600 text-center py-[.5rem]">
              Загрузка...
            </div>
          ) : seasonsSearch && seasonsSearch.length > 0 ? (
            seasonsSearch.map((s) => (
              <button
                key={s._id}
                type="button"
                onClick={() => {
                  setSeasonId(s.seasonId);
                  setSeasonValue(s.text);
                  setShowSeasons(false);
                }}
                className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
              >
                {s.text}
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowSeasons(false);
              }}
              className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
            >
              Нету Подходящих Сезонов
            </button>
          )}
        </aside>
      ) : (
        <aside
          ref={modalSeasonsRef}
          className={`${
            showSeasons ? "" : "hidden"
          } max-h-[15rem] overflow-auto flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[.5rem] p-[1rem] | containerScroll`}
        >
          <button
            type="button"
            onClick={() => {
              setShowSeasons(false);
            }}
            className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
          >
            Выберите Историю
          </button>
        </aside>
      )}
    </form>
  );
}
