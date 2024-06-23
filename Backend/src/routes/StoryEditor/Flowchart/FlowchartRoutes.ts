import express from "express";
import { flowchartControllerUpdateCurrentLanguage } from "../../../controllers/StoryEditor/Flowchart/FlowchartController";

// Default route === /flowcharts
export const flowchartRoute = express.Router();

flowchartRoute
  .route("/:flowchartId")
  .patch(flowchartControllerUpdateCurrentLanguage);
