import { PlotFieldTypes } from "../../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import CommandAchievementField from "./Achievement/CommandAchievementField";
import CommandAmbientField from "./Ambient/CommandAmbientField";
import CommandBackgroundField from "./Background/CommandBackgroundField";
import PlotfieldBlank from "./Blank/PlotfieldBlank";
import CommandCutSceneField from "./CutScene/CommandCutSceneField";
import CommandEffectField from "./Effect/CommandEffectField";
import CommandGetItemField from "./GetItem/CommandGetItemField";
import CommandIfField from "./If/CommandIfField";
import CommandKeyField from "./Key/CommandKeyField";
import CommandMoveField from "./Move/CommandMoveField";
import CommandMusicField from "./Music/CommandMusicField";
import CommandNameField from "./Name/CommandNameField";
import CommandSayField from "./Say/CommandSayField";
import CommandSoundField from "./Sound/CommandSoundField";
import CommandSuitField from "./Suit/CommandSuitField";
import CommandWaitField from "./Wait/CommandWaitField";
import CommandWardrobeField from "./Wardrobe/CommandWardrobeField";

export default function PlotfieldItem({
  _id,
  command,
  commandOrder,
  topologyBlockId,
  commandIfId,
}: PlotFieldTypes) {
  return (
    <li
      className={`${
        commandIfId ? "ml-[1rem] pr-[1rem]" : ""
      } w-full flex gap-[1rem]`}
    >
      {!command ? (
        <PlotfieldBlank
          plotFieldCommandId={_id}
          commandIfId={commandIfId ?? ""}
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
      ) : command === "sound" ? (
        <CommandSoundField command={command} plotFieldCommandId={_id} />
      ) : command === "suit" ? (
        <CommandSuitField command={command} plotFieldCommandId={_id} />
      ) : command === "wait" ? (
        <CommandWaitField command={command} plotFieldCommandId={_id} />
      ) : command === "name" ? (
        <CommandNameField command={command} plotFieldCommandId={_id} />
      ) : command === "background" ? (
        <CommandBackgroundField command={command} plotFieldCommandId={_id} />
      ) : command === "getitem" ? (
        <CommandGetItemField command={command} plotFieldCommandId={_id} />
      ) : command === "if" ? (
        <CommandIfField
          topologyBlockId={topologyBlockId}
          command={command}
          plotFieldCommandId={_id}
        />
      ) : command === "wardrobe" ? (
        <CommandWardrobeField command={command} plotFieldCommandId={_id} />
      ) : null}
    </li>
  );
}
