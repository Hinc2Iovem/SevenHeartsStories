import { RequestHandler } from "express";
import {
  flowchartUpdateCurrentLanguageService,
  getFlowchartByTopologyBlockIdService,
} from "../../../services/StoryEditor/Flowchart/FlowchartService";

type GetFlowchartByTopologyBlockIdParams = {
  topologyBlockId: string;
};

// @route GET http://localhost:3500/flowcharts/topologyBlocks/:topologyBlockId
// @access Private
export const getFlowchartByTopologyBlockIdController: RequestHandler<
  GetFlowchartByTopologyBlockIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const flowchart = await getFlowchartByTopologyBlockIdService({
      topologyBlockId: req.params.topologyBlockId,
    });
    if (flowchart) {
      return res.status(201).json(flowchart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type FlowchartUpdateParams = {
  flowchartId: string;
};

// @route PATCH http://localhost:3500/flowcharts/:flowchartId
// @access Private
export const flowchartControllerUpdateCurrentLanguage: RequestHandler<
  FlowchartUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const flowchart = await flowchartUpdateCurrentLanguageService({
      flowchartId: req.params.flowchartId,
    });
    if (flowchart) {
      return res.status(201).json(flowchart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
