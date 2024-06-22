import { RequestHandler } from "express";
import {
  createAmbientService,
  deleteAmbientService,
} from "../../../../services/StoryEditor/Flowchart/Ambient/AmbientService";

type CreateAmbientParams = {
  flowchartCommandId: string;
};

type CreateAmbientBody = {
  ambientName: string | undefined;
};

export const createAmbientController: RequestHandler<
  CreateAmbientParams,
  unknown,
  CreateAmbientBody,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await createAmbientService({
      ambientName: req.body.ambientName,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (ambient) {
      return res.status(201).json(ambient);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteAmbientParams = {
  ambientId: string;
};

export const deleteAmbientController: RequestHandler<
  DeleteAmbientParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await deleteAmbientService({
      ambientId: req.params.ambientId,
    });
    if (ambient) {
      return res.status(201).json(ambient);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
