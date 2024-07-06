import { RequestHandler } from "express";
import {
  createNameService,
  deleteNameService,
  updateNameService,
  getNameByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Name/CommandNameService";

type GetNameByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/names
// @access Private
export const getNameByPlotFieldCommandIdController: RequestHandler<
  GetNameByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const name = await getNameByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (name) {
      return res.status(201).json(name);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateNameParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/names
// @access Private
export const createNameController: RequestHandler<
  CreateNameParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const name = await createNameService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (name) {
      return res.status(201).json(name);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateNameParams = {
  nameId: string;
  characterId: string;
};

type UpdateNameBody = {
  newName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/characters/:characterId/names/:nameId
// @access Private
export const updateNameController: RequestHandler<
  UpdateNameParams,
  unknown,
  UpdateNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const name = await updateNameService({
      newName: req.body.newName,
      nameId: req.params.nameId,
      characterId: req.params.characterId,
    });
    if (name) {
      return res.status(201).json(name);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteNameParams = {
  nameId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/name/:nameId
// @access Private
export const deleteNameController: RequestHandler<
  DeleteNameParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const name = await deleteNameService({
      nameId: req.params.nameId,
    });
    if (name) {
      return res.status(201).json(name);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
