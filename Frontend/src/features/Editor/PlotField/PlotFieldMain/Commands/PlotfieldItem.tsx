import { PlotFieldTypes } from "../../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import CommandAchievementField from "./Achievement/CommandAchievementField";
import PlotfieldBlank from "./Blank/PlotfieldBlank";
import CommandSayField from "./Say/CommandSayField";

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
          plotFieldCommandId={_id}
          topologyBlockId={topologyBlockId}
        />
      ) : command === "say" ? (
        <CommandSayField plotFieldCommandId={_id} />
      ) : command === "achievement" ? (
        <CommandAchievementField command={command} plotFieldCommandId={_id} />
      ) : null}
    </li>
  );
}
