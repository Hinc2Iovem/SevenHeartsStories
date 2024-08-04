import express from "express";
import {
  getFirstTopologyBlockController,
  getSourceBlocksByTargetBlockIdController,
  getTargetBlocksBySourceBlockIdController,
  getTopologyBlockByConnectionController,
  getTopologyBlockByEpisodeIdController,
  getTopologyBlockByIdController,
  getTopologyBlockConnectionsByEpisodeIdController,
  topologyBlockControllerDelete,
  topologyBlockControllerUpdateCoordinates,
  topologyBlockControllerUpdateName,
  topologyBlockCreateConnectionController,
  topologyBlockUpdateConnectionController,
  unrelatedTopologyBlockControllerCreate,
} from "../../../controllers/StoryEditor/Topology/TopologyBlockController";

// Default route === /topologyBlocks
export const topologyBlockRoute = express.Router();

topologyBlockRoute
  .route("/:topologyBlockId")
  .get(getTopologyBlockByIdController)
  .delete(topologyBlockControllerDelete);

topologyBlockRoute
  .route("/:sourceBlockId/connection")
  .get(getTopologyBlockByConnectionController);
topologyBlockRoute
  .route("/targetBlocks/:targetBlockId/connection")
  .get(getSourceBlocksByTargetBlockIdController);

topologyBlockRoute
  .route("/sourceBlocks/:sourceBlockId/connection")
  .get(getTargetBlocksBySourceBlockIdController);
topologyBlockRoute
  .route("/episodes/:episodeId/connection")
  .get(getTopologyBlockConnectionsByEpisodeIdController);

topologyBlockRoute
  .route("/episodes/:episodeId")
  .get(getTopologyBlockByEpisodeIdController)
  .post(unrelatedTopologyBlockControllerCreate);

topologyBlockRoute
  .route("/episodes/:episodeId/firstBlock")
  .get(getFirstTopologyBlockController);

topologyBlockRoute
  .route(
    "/episodes/:episodeId/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId/connection"
  )
  .post(topologyBlockCreateConnectionController);

topologyBlockRoute
  .route("/:topologyBlockId/coordinates")
  .patch(topologyBlockControllerUpdateCoordinates);

topologyBlockRoute
  .route(
    "/connection/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId/newTargetBlock/:newTargetBlockId"
  )
  .patch(topologyBlockUpdateConnectionController);

topologyBlockRoute
  .route("/:topologyBlockId/name")
  .patch(topologyBlockControllerUpdateName);
