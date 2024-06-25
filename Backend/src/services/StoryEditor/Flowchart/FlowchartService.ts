import createHttpError from "http-errors";
import { validateMongoId } from "../../../utils/validateMongoId";
import Flowchart from "../../../models/StoryEditor/Flowchart/Flowchart";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";

type GetFlowchartByTopologyBlockIdTypes = {
  topologyBlockId: string;
};

export const getFlowchartByTopologyBlockIdService = async ({
  topologyBlockId,
}: GetFlowchartByTopologyBlockIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).lean();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  const existingFlowchart = await Flowchart.findOne({ topologyBlockId }).lean();
  if (!existingFlowchart) {
    throw createHttpError(400, "Such flowchart doesn't exist");
  }

  return existingFlowchart;
};

type UpdateLanguageTypes = {
  flowchartId: string;
};

export const flowchartUpdateCurrentLanguageService = async ({
  flowchartId,
}: UpdateLanguageTypes) => {
  validateMongoId({ value: flowchartId, valueName: "Flowchart" });

  const existingFlowchart = await Flowchart.findById(flowchartId).exec();
  if (!existingFlowchart) {
    throw createHttpError(400, "Such flowchart doesn't exist");
  }

  return await existingFlowchart.save();
};
