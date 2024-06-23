import express from "express";
import {
  topologyBlockControllerCreate,
  topologyBlockControllerDelete,
  topologyBlockControllerUpdateCoordinates,
  topologyBlockControllerUpdateName,
} from "../../../controllers/StoryEditor/Topology/TopologyBlockController";

// Default route === /topologyBlocks
export const topologyBlockRoute = express.Router();

topologyBlockRoute
  .route("/episodes/:episodeId")
  .post(topologyBlockControllerCreate);

topologyBlockRoute
  .route("/:topologyBlockId/coordinates")
  .patch(topologyBlockControllerUpdateCoordinates);
topologyBlockRoute
  .route("/:topologyBlockId/name")
  .patch(topologyBlockControllerUpdateName);
topologyBlockRoute
  .route("/:topologyBlockId")
  .delete(topologyBlockControllerDelete);
