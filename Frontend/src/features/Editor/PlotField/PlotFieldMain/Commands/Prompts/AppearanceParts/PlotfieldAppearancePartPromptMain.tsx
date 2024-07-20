import useGetAllAppearancePartsByCharacterId from "../../../../../../../hooks/Fetching/AppearancePart/useGetAllAppearancePartsByCharacterId";
import PlotfieldAppearancePartsPrompt from "./PlotfieldAppearancePartPrompt";
import "../promptStyles.css";
import { PossibleWardrobeAppearancePartVariationsTypes } from "../../Wardrobe/WardrobeCharacterAppearancePartForm";
import { useMemo } from "react";

type PlotfieldAppearancePartPromptMainTypes = {
  appearancePartName?: string;
  setAppearancePartName?: React.Dispatch<React.SetStateAction<string>>;
  setAppearancePartId?: React.Dispatch<React.SetStateAction<string>>;
  setShowAppearancePartModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAppearancePartImg?: React.Dispatch<React.SetStateAction<string>>;
  showAppearancePartModal: boolean;
  characterId: string;
  appearancePartVariationType: PossibleWardrobeAppearancePartVariationsTypes;
};

export default function PlotfieldAppearancePartPromptMain({
  appearancePartName,
  setAppearancePartName,
  setAppearancePartId,
  setAppearancePartImg,
  setShowAppearancePartModal,
  showAppearancePartModal,
  characterId,
  appearancePartVariationType,
}: PlotfieldAppearancePartPromptMainTypes) {
  const { data: allAppearanceParts } = useGetAllAppearancePartsByCharacterId({
    characterId: characterId ?? "",
  });

  const memoizedAppearanceParts = useMemo(() => {
    const res = allAppearanceParts || [];
    if (appearancePartVariationType === "dress") {
      return res.filter((r) => r.type === "dress");
    } else if (appearancePartVariationType === "hair") {
      return res.filter((r) => r.type === "hair");
    } else {
      return res.filter((r) => r.type !== "dress" && r.type !== "hair");
    }
  }, [allAppearanceParts, appearancePartVariationType]);

  return (
    <aside
      className={`${showAppearancePartModal ? "" : "hidden"} ${
        appearancePartName ? "translate-y-[1rem]" : "translate-y-[2rem]"
      } absolute top-1/2 z-[10] p-[1rem] min-w-[10rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
    >
      {memoizedAppearanceParts &&
        memoizedAppearanceParts?.map((c) => (
          <PlotfieldAppearancePartsPrompt
            key={c._id}
            setAppearancePartName={setAppearancePartName}
            setAppearancePartId={setAppearancePartId}
            setAppearancePartImg={setAppearancePartImg}
            setShowAppearancePartModal={setShowAppearancePartModal}
            {...c}
          />
        ))}
    </aside>
  );
}
