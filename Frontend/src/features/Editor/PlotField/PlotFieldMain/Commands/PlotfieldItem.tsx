import { PlotFieldTypes } from "../../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import CommandAchievementField from "./Achievement/CommandAchievementField";
import CommandAmbientField from "./Ambient/CommandAmbientField";
import PlotfieldBlank from "./Blank/PlotfieldBlank";
import CommandCutSceneField from "./CutScene/CommandCutSceneField";
import CommandEffectField from "./Effect/CommandEffectField";
import CommandKeyField from "./Key/CommandKeyField";
import CommandMoveField from "./Move/CommandMoveField";
import CommandMusicField from "./Music/CommandMusicField";
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
      ) : command === "ambient" ? (
        <CommandAmbientField command={command} plotFieldCommandId={_id} />
      ) : command === "cutscene" ? (
        <CommandCutSceneField command={command} plotFieldCommandId={_id} />
      ) : command === "effect" ? (
        <CommandEffectField command={command} plotFieldCommandId={_id} />
      ) : command === "key" ? (
        <CommandKeyField command={command} plotFieldCommandId={_id} />
      ) : command === "move" ? (
        <CommandMoveField command={command} plotFieldCommandId={_id} />
      ) : command === "music" ? (
        <CommandMusicField command={command} plotFieldCommandId={_id} />
      ) : null}
    </li>
  );
}
