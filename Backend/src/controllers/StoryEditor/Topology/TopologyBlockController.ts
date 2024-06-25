import { RequestHandler } from "express";
import {
  topologyBlockDeleteService,
  topologyBlockUpdateCoordinatesService,
  topologyBlockUpdateNameService,
  unrelatedTopologyBlockCreateService,
  unrelatedTopologyBlockUpdateByCoordinatesYService,
} from "../../../services/StoryEditor/Topology/TopologyBlockService";

type TopologyBlockCreateParams = {
  episodeId: string;
};

type TopologyBlockCreateBody = {
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
};

// @route POST http://localhost:3500/topologyBlocks/episodes/:episodeId
// @access Private
export const unrelatedTopologyBlockControllerCreate: RequestHandler<
  TopologyBlockCreateParams,
  unknown,
  TopologyBlockCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const topologyBlock = await unrelatedTopologyBlockCreateService({
      coordinatesX: req.body.coordinatesX,
      coordinatesY: req.body.coordinatesY,
      episodeId: req.params.episodeId,
    });
    if (topologyBlock) {
      return res.status(201).json(topologyBlock);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UnrelatedTopologyBlockUpdateParams = {
  sourceBlockId: string;
  targetBlockId: string;
};

// @route PATCH http://localhost:3500/topologyBlocks/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId
// @access Private
export const unrelatedTopologyBlockUpdateByCoordinatesYCreate: RequestHandler<
  UnrelatedTopologyBlockUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const topologyBlock =
      await unrelatedTopologyBlockUpdateByCoordinatesYService({
        sourceBlockId: req.params.sourceBlockId,
        targetBlockId: req.params.targetBlockId,
      });
    if (topologyBlock) {
      return res.status(201).json(topologyBlock);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type TopologyBlockUpdateParams = {
  topologyBlockId: string;
};

type TopologyBlockUpdateBody = {
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
};

// @route PATCH http://localhost:3500/topologyBlocks/:topologyBlockId/coordinates
// @access Private
export const topologyBlockControllerUpdateCoordinates: RequestHandler<
  TopologyBlockUpdateParams,
  unknown,
  TopologyBlockUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const topologyBlock = await topologyBlockUpdateCoordinatesService({
      coordinatesX: req.body.coordinatesX,
      coordinatesY: req.body.coordinatesY,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (topologyBlock) {
      return res.status(201).json(topologyBlock);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type TopologyBlockUpdateNameBody = {
  newName: string | undefined;
};

// @route PATCH http://localhost:3500/topologyBlocks/:topologyBlockId/name
// @access Private
export const topologyBlockControllerUpdateName: RequestHandler<
  TopologyBlockUpdateParams,
  unknown,
  TopologyBlockUpdateNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const topologyBlock = await topologyBlockUpdateNameService({
      newName: req.body.newName,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (topologyBlock) {
      return res.status(201).json(topologyBlock);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route DELETE http://localhost:3500/topologyBlocks/:topologyBlockId
// @access Private
export const topologyBlockControllerDelete: RequestHandler<
  TopologyBlockUpdateParams,
  unknown,
  TopologyBlockUpdateNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const topologyBlock = await topologyBlockDeleteService({
      topologyBlockId: req.params.topologyBlockId,
    });
    if (topologyBlock) {
      return res.status(201).json(topologyBlock);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
