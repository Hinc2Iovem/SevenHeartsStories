import { RequestHandler } from "express";
import { flowchartUpdateCurrentLanguageService } from "../../../services/StoryEditor/Flowchart/FlowchartService";

type FlowchartUpdateParams = {
  flowchartId: string;
};

type FlowchartUpdateBody = {
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/flowcharts/:flowchartId
// @access Private
export const flowchartControllerUpdateCurrentLanguage: RequestHandler<
  FlowchartUpdateParams,
  unknown,
  FlowchartUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const flowchart = await flowchartUpdateCurrentLanguageService({
      currentLanguage: req.body.currentLanguage,
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
