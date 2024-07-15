import { PlotFieldTypes } from "../../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import PlotfieldBlank from "./Blank/PlotfieldBlank";

export default function PlotfieldItem({
  _id,
  command,
  commandOrder,
  topologyBlockId,
}: PlotFieldTypes) {
  const commandType = "";
  return (
    <li className="w-full flex gap-[1rem]">
      {!command ? (
        <PlotfieldBlank
          plotFieldIdCommandId={_id}
          topologyBlockId={topologyBlockId}
        />
      ) : null}
    </li>
  );
}
