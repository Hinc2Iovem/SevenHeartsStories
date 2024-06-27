import express from "express";
import {
  getFirstTopologyBlockController,
  getTopologyBlockByConnectionController,
  getTopologyBlockByEpisodeIdController,
  getTopologyBlockByIdController,
  topologyBlockControllerDelete,
  topologyBlockControllerUpdateCoordinates,
  topologyBlockControllerUpdateName,
  topologyBlockCreateConnectionController,
  unrelatedTopologyBlockControllerCreate,
} from "../../../controllers/StoryEditor/Topology/TopologyBlockController";

// Default route === /topologyBlocks
export const topologyBlockRoute = express.Router();

topologyBlockRoute
  .route("/:topologyBlockId")
  .get(getTopologyBlockByIdController)
  .delete(topologyBlockControllerDelete);

topologyBlockRoute
  .route("/:sourceBlockId")
  .get(getTopologyBlockByConnectionController);

topologyBlockRoute
  .route("/episodes/:episodeId")
  .get(getTopologyBlockByEpisodeIdController)
  .post(unrelatedTopologyBlockControllerCreate);

topologyBlockRoute
  .route("/episodes/:episodeId/firstBlock")
  .get(getFirstTopologyBlockController);

topologyBlockRoute
  .route("/connection/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId")
  .post(topologyBlockCreateConnectionController);

topologyBlockRoute
  .route("/:topologyBlockId/coordinates")
  .patch(topologyBlockControllerUpdateCoordinates);
topologyBlockRoute
  .route(
    "/connection/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId/newTargetBlock/:newTargetBlockId"
  )
  .patch(topologyBlockControllerUpdateCoordinates);

topologyBlockRoute
  .route("/:topologyBlockId/name")
  .patch(topologyBlockControllerUpdateName);
