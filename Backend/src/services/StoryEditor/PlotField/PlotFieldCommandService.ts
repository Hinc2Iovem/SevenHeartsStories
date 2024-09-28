import createHttpError from "http-errors";
import TranslationAchievement from "../../../models/StoryData/Translation/TranslationAchievement";
import TranslationChoice from "../../../models/StoryData/Translation/TranslationChoice";
import TranslationGetItem from "../../../models/StoryData/Translation/TranslationGetItem";
import TranslationSay from "../../../models/StoryData/Translation/TranslationSay";
import Achievement from "../../../models/StoryEditor/PlotField/Achievement/Achievement";
import Ambient from "../../../models/StoryEditor/PlotField/Ambient/Ambient";
import Background from "../../../models/StoryEditor/PlotField/Background/Background";
import Call from "../../../models/StoryEditor/PlotField/Call/Call";
import Choice from "../../../models/StoryEditor/PlotField/Choice/Choice";
import Comment from "../../../models/StoryEditor/PlotField/Comment/Comment";
import Condition from "../../../models/StoryEditor/PlotField/Condition/Condition";
import CutScene from "../../../models/StoryEditor/PlotField/CutScene/CutScene";
import Effect from "../../../models/StoryEditor/PlotField/Effect/Effect";
import GetItem from "../../../models/StoryEditor/PlotField/GetItem/GetItem";
import IfModel from "../../../models/StoryEditor/PlotField/If/IfModel";
import Key from "../../../models/StoryEditor/PlotField/Key/Key";
import Move from "../../../models/StoryEditor/PlotField/Move/Move";
import CommandMusic from "../../../models/StoryEditor/PlotField/Music/CommandMusic";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Say from "../../../models/StoryEditor/PlotField/Say/Say";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../utils/validateMongoId";
import Name from "../../../models/StoryEditor/PlotField/Name/Name";
import Sound from "../../../models/StoryData/Sound";
import Suit from "../../../models/StoryEditor/PlotField/Suit/Suit";
import Wait from "../../../models/StoryEditor/PlotField/Wait/Wait";
import CommandWardrobe from "../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";
import TranslationCommandWardrobe from "../../../models/StoryData/Translation/TranslationCommandWardrobe";
import { Types } from "mongoose";
import ChoiceOption from "../../../models/StoryEditor/PlotField/Choice/ChoiceOption";
import OptionCharacteristic from "../../../models/StoryEditor/PlotField/Choice/OptionCharacteristic";
import OptionPremium from "../../../models/StoryEditor/PlotField/Choice/OptionPremium";
import OptionRelationship from "../../../models/StoryEditor/PlotField/Choice/OptionRelationship";
import TranslationChoiceOption from "../../../models/StoryData/Translation/TranslationChoiceOption";
import TopologyBlockConnection from "../../../models/StoryEditor/Topology/TopologyBlockConnection";

type GetAllPlotFieldCommandsByIfIdTypes = {
  commandIfId: string;
};

export const getAllPlotFieldCommandsByIfIdService = async ({
  commandIfId,
}: GetAllPlotFieldCommandsByIfIdTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });

  const existingCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse: false,
  }).lean();

  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

export const getAllPlotFieldCommandsByIfIdInsideElseService = async ({
  commandIfId,
}: GetAllPlotFieldCommandsByIfIdTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });

  const existingCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse: true,
  }).lean();

  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

type GetAllPlotFieldCommandsTypes = {
  topologyBlockId: string;
};

export const getAllPlotFieldCommandsService = async ({
  topologyBlockId,
}: GetAllPlotFieldCommandsTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingCommands = await PlotFieldCommand.find({
    topologyBlockId,
    commandIfId: null || undefined,
  }).lean();
  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

type MultipleCommandsType =
  | "achievement"
  | "ambient"
  | "background"
  | "call"
  | "choice"
  | "comment"
  | "condition"
  | "cutscene"
  | "effect"
  | "getitem"
  | "if"
  | "key"
  | "move"
  | "music"
  | "name"
  | "sound"
  | "suit"
  | "wait"
  | "wardrobe"
  | "author"
  | "hint"
  | "notify"
  | "character";

type OptionVariationTypes =
  | "common"
  | "premium"
  | "relationship"
  | "characteristic";

type PlotFieldCommandCreateMultipleTypes = {
  topologyBlockId: string;
  allCommands?: string;
  storyId?: string;
  waitValue?: number;
  choiceType?: string;
  amountOfOptions?: number;
  optionVariations?: string;
  episodeId?: string;
  currentAmountOfCommands: number;
};

export const plotFieldCommandCreateMultipleService = async ({
  topologyBlockId,
  allCommands,
  storyId,
  waitValue,
  amountOfOptions,
  choiceType,
  optionVariations,
  episodeId,
  currentAmountOfCommands,
}: PlotFieldCommandCreateMultipleTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (!allCommands?.trim().length) {
    throw createHttpError(400, "You haven't chosen any of the commands");
  }
  const currentTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();

  const allCommandsArray: MultipleCommandsType[] = allCommands.split(
    ","
  ) as MultipleCommandsType[];

  let amountOfCommands = currentAmountOfCommands;
  for (const c of allCommandsArray) {
    const newPlotFieldCommand = await PlotFieldCommand.create({
      topologyBlockId,
      commandOrder: amountOfCommands,
    });

    amountOfCommands++;
    if (
      currentTopologyBlock &&
      typeof currentTopologyBlock.topologyBlockInfo?.amountOfCommands ===
        "number"
    ) {
      currentTopologyBlock.topologyBlockInfo.amountOfCommands =
        amountOfCommands;
      await currentTopologyBlock.save();
    }
    if (c === "achievement") {
      await Achievement.create({
        plotFieldCommandId: newPlotFieldCommand._id,
        storyId,
      });
      await TranslationAchievement.create({
        commandId: newPlotFieldCommand._id,
        topologyBlockId,
        language: "russian",
        translations: [],
        storyId,
      });
      newPlotFieldCommand.command = "achievement";
    } else if (
      c === "author" ||
      c === "character" ||
      c === "hint" ||
      c === "notify"
    ) {
      await Say.create({
        plotFieldCommandId: newPlotFieldCommand._id,
        type: c,
      });
      await TranslationSay.create({
        commandId: newPlotFieldCommand._id,
        topologyBlockId,
        language: "russian",
        translations: [],
      });
      newPlotFieldCommand.command = "say";
    } else if (c === "ambient") {
      await Ambient.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "ambient";
    } else if (c === "background") {
      await Background.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "background";
    } else if (c === "call") {
      await Call.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "call";
    } else if (c === "choice") {
      const choiceObject: {
        plotFieldCommandId: Types.ObjectId;
        choiceType?: string;
        amountOfOptions?: number;
      } = {
        plotFieldCommandId: newPlotFieldCommand._id,
      };

      if (choiceType) {
        choiceObject.choiceType = choiceType;
      }

      if (amountOfOptions) {
        choiceObject.amountOfOptions = amountOfOptions;
      }

      const newChoice = await Choice.create(choiceObject);
      await TranslationChoice.create({
        commandId: newPlotFieldCommand._id,
        language: "russian",
        topologyBlockId,
        translations: [],
      });
      newPlotFieldCommand.command = "choice";

      if (optionVariations) {
        const optionVariationsArray: OptionVariationTypes[] =
          optionVariations.split(",") as OptionVariationTypes[];
        const lastTopologyBlock = await TopologyBlock.findOne({ episodeId })
          .sort({ createdAt: -1 })
          .limit(1);

        const coordinatesValue = {
          coordinatesX: lastTopologyBlock?.coordinatesX || 0,
          coordinatesY: lastTopologyBlock?.coordinatesY || 0,
        };
        let number = 1;
        for (const ov of optionVariationsArray) {
          const newChoiceOption = await ChoiceOption.create({
            plotFieldCommandChoiceId: newChoice._id,
            type: ov,
          });

          newChoice.amountOfOptions += 1;
          await newChoice.save();
          const newTopologyBlock = await TopologyBlock.create({
            coordinatesValue,
            episodeId,
            name: lastTopologyBlock?.name + "-" + ov + "-" + number,
          });

          number++;

          await TopologyBlockConnection.create({
            sourceBlockId: topologyBlockId,
            targetBlockId: newTopologyBlock._id,
            episodeId,
          });

          newChoiceOption.topologyBlockId = newTopologyBlock._id;
          coordinatesValue.coordinatesY += 50;

          await newChoiceOption.save();

          if (ov === "characteristic") {
            await OptionCharacteristic.create({
              plotFieldCommandChoiceOptionId: newChoiceOption._id,
            });
          } else if (ov === "premium") {
            await OptionPremium.create({
              plotFieldCommandChoiceOptionId: newChoiceOption._id,
            });
          } else if (ov === "relationship") {
            await OptionRelationship.create({
              plotFieldCommandChoiceOptionId: newChoiceOption._id,
            });
          }

          await TranslationChoiceOption.create({
            language: "russian",
            commandId: newPlotFieldCommand._id,
            translations: [],
            type: ov,
            choiceOptionId: newChoiceOption._id,
          });
        }
      }
    } else if (c === "comment") {
      await Comment.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "comment";
    } else if (c === "condition") {
      await Condition.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "condition";
    } else if (c === "cutscene") {
      await CutScene.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "cutscene";
    } else if (c === "effect") {
      await Effect.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "effect";
    } else if (c === "getitem") {
      await GetItem.create({ plotFieldCommandId: newPlotFieldCommand._id });
      await TranslationGetItem.create({
        commandId: newPlotFieldCommand._id,
        language: "russian",
        topologyBlockId,
        translations: [],
      });
      newPlotFieldCommand.command = "getitem";
    } else if (c === "if") {
      await IfModel.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "if";
    } else if (c === "key") {
      await Key.create({
        plotFieldCommandId: newPlotFieldCommand._id,
        storyId,
      });
      newPlotFieldCommand.command = "key";
    } else if (c === "move") {
      await Move.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "move";
    } else if (c === "music") {
      await CommandMusic.create({
        plotFieldCommandId: newPlotFieldCommand._id,
      });
      newPlotFieldCommand.command = "music";
    } else if (c === "name") {
      await Name.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "name";
    } else if (c === "sound") {
      await Sound.create({
        plotFieldCommandId: newPlotFieldCommand._id,
        storyId,
      });
      newPlotFieldCommand.command = "sound";
    } else if (c === "suit") {
      await Suit.create({ plotFieldCommandId: newPlotFieldCommand._id });
      newPlotFieldCommand.command = "suit";
    } else if (c === "wait") {
      if (waitValue) {
        await Wait.create({
          plotFieldCommandId: newPlotFieldCommand._id,
          waitValue,
        });
        newPlotFieldCommand.command = "wait";
      } else {
        await Wait.create({ plotFieldCommandId: newPlotFieldCommand._id });
        newPlotFieldCommand.command = "wait";
      }
    } else if (c === "wardrobe") {
      await CommandWardrobe.create({
        plotFieldCommandId: newPlotFieldCommand._id,
      });
      await TranslationCommandWardrobe.create({
        commandId: newPlotFieldCommand._id,
        topologyBlockId,
        language: "russian",
        translations: [],
      });
      newPlotFieldCommand.command = "wardrobe";
    }
    newPlotFieldCommand.save();
  }

  return "Numerous Commands were created";
};

type PlotFieldCommandCreateInsideIfBlockTypes = {
  commandIfId: string;
  topologyBlockId: string;
  isElse?: boolean;
  commandOrder: number;
};

export const plotFieldCommandCreateInsideIfBlockService = async ({
  commandIfId,
  topologyBlockId,
  isElse,
  commandOrder,
}: PlotFieldCommandCreateInsideIfBlockTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingCommandIf = await IfModel.findById(commandIfId);

  if (isElse) {
    if (existingCommandIf) {
      existingCommandIf.amountOfCommandsInsideElse = commandOrder + 1;
      await existingCommandIf.save();
    }
    return await PlotFieldCommand.create({
      commandIfId,
      commandOrder,
      topologyBlockId,
      isElse,
    });
  } else {
    if (existingCommandIf) {
      existingCommandIf.amountOfCommandsInsideIf = commandOrder + 1;
      await existingCommandIf.save();
    }
    return await PlotFieldCommand.create({
      commandIfId,
      commandOrder,
      topologyBlockId,
    });
  }
};

type PlotFieldCommandCreateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
  _id?: string;
};

export const plotFieldCommandCreateService = async ({
  topologyBlockId,
  commandOrder,
  _id,
}: PlotFieldCommandCreateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  console.log("commandOrder: ", commandOrder);

  if (typeof commandOrder !== "number" || !_id?.trim().length) {
    throw createHttpError(400, "CommandOrder and _id are required");
  }

  const currentTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();

  if (
    currentTopologyBlock &&
    typeof currentTopologyBlock.topologyBlockInfo?.amountOfCommands === "number"
  ) {
    currentTopologyBlock.topologyBlockInfo.amountOfCommands = commandOrder + 1;
    await currentTopologyBlock.save();
  }

  return await PlotFieldCommand.create({ topologyBlockId, commandOrder, _id });
};

type PlotFieldCommandNameUpdateTypes = {
  plotFieldCommandId: string;
  commandName: string | undefined;
};

export const plotFieldCommandUpdateCommandNameService = async ({
  commandName,
  plotFieldCommandId,
}: PlotFieldCommandNameUpdateTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  console.log("plotFieldCommandId: ", plotFieldCommandId);

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  if (!commandName?.trim().length) {
    throw createHttpError(400, "Command Name is required");
  }

  existingPlotFieldCommand.command = commandName;

  return await existingPlotFieldCommand.save();
};

type PlotFieldCommandUpdateAllOrdersAfterDuplicationTypes = {
  duplicateId: string;
  topologyBlockId: string;
  commandOrder?: number;
};

export const plotFieldCommandUpdateAllOrdersAfterDuplicationService = async ({
  topologyBlockId,
  duplicateId,
  commandOrder,
}: PlotFieldCommandUpdateAllOrdersAfterDuplicationTypes) => {
  validateMongoId({ value: duplicateId, valueName: "Duplicate" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "Command Order is required");
  }

  const allPlotfieldCommands = await PlotFieldCommand.find({
    topologyBlockId,
    commandOrder: { $gt: commandOrder },
    _id: { $ne: duplicateId },
  }).exec();

  if (allPlotfieldCommands.length) {
    let iterationNumber = 1 + commandOrder;
    for (const pc of allPlotfieldCommands) {
      if (pc.commandOrder) {
        pc.commandOrder += 1;
      } else {
        pc.commandOrder = iterationNumber;
      }
      ++iterationNumber;
      await pc.save();
    }
  } else {
    return `Nothing to update`;
  }
};

type PlotFieldCommandOrderUpdateTypes = {
  plotFieldCommandId: string;
  newOrder: number;
};

export const plotFieldCommandUpdateCommandOrderService = async ({
  newOrder,
  plotFieldCommandId,
}: PlotFieldCommandOrderUpdateTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  const topologyBlockId = existingPlotFieldCommand.topologyBlockId;
  const oldOrder = existingPlotFieldCommand.commandOrder as number;
  const difference = oldOrder - newOrder;

  if (existingPlotFieldCommand.commandIfId) {
    throw createHttpError(
      400,
      "Transporting from if command inside main plot is not supported, and same for vice versa"
    );
  }

  // If the difference is 1, only swap with the target order
  if (Math.abs(difference) === 1) {
    const prevPlotFieldCommand = await PlotFieldCommand.findOne({
      topologyBlockId,
      commandOrder: newOrder,
    }).exec();

    if (prevPlotFieldCommand?.commandIfId) {
      throw createHttpError(
        400,
        "Transporting from if command inside main plot is not supported, and same for vice versa"
      );
    }

    if (prevPlotFieldCommand) {
      // Bulk update both documents
      await PlotFieldCommand.bulkWrite([
        {
          updateOne: {
            filter: { _id: prevPlotFieldCommand._id },
            update: { commandOrder: oldOrder },
          },
        },
        {
          updateOne: {
            filter: { _id: plotFieldCommandId },
            update: { commandOrder: newOrder },
          },
        },
      ]);
    } else {
      throw createHttpError(400, "Such Plotfield wasn't found");
    }
  }

  // Handle larger movements, either up or down
  let filter, update;
  if (oldOrder > newOrder) {
    // Moving the command upwards (shift others down)
    filter = {
      topologyBlockId,
      commandOrder: { $gte: newOrder, $lt: oldOrder },
    };
    update = { $inc: { commandOrder: 1 } };
  } else {
    // Moving the command downwards (shift others up)
    filter = {
      topologyBlockId,
      commandOrder: { $gt: oldOrder, $lte: newOrder },
    };
    update = { $inc: { commandOrder: -1 } };
  }

  // Bulk update the necessary range of commands
  await PlotFieldCommand.updateMany(filter, update).exec();

  // Finally update the current command
  existingPlotFieldCommand.commandOrder = newOrder;
  return await existingPlotFieldCommand.save();
};

type PlotFieldCommandDeleteTypes = {
  plotFieldCommandId: string;
};

export const plotFieldCommandDeleteService = async ({
  plotFieldCommandId,
}: PlotFieldCommandDeleteTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  await existingPlotFieldCommand.deleteOne();
  return `PlotFieldCommand with id ${plotFieldCommandId} was removed`;
};
