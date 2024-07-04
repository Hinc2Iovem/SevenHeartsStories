import { RequestHandler } from "express";
import {
  createIfValueService,
  deleteIfValueService,
  getIfValueByPlotFieldCommandIfIdService,
  updateIfValueService,
} from "../../../../services/StoryEditor/PlotField/ServiceIf/IfValueService";

type GetIfValueByPlotFieldCommandIfIdParams = {
  plotFieldCommandIfId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/ifcommands/:plotFieldCommandIfId/ifValues
// @access Private
export const getIfValueByPlotFieldCommandIfIdController: RequestHandler<
  GetIfValueByPlotFieldCommandIfIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifValue = await getIfValueByPlotFieldCommandIfIdService({
      plotFieldCommandIfId: req.params.plotFieldCommandIfId,
    });
    if (ifValue) {
      return res.status(201).json(ifValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateIfValueParams = {
  ifId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/ifcommands/:ifId/ifValues
// @access Private
export const createIfValueController: RequestHandler<
  CreateIfValueParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifValue = await createIfValueService({
      ifId: req.params.ifId,
    });
    if (ifValue) {
      return res.status(201).json(ifValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateIfValueParams = {
  ifValueId: string;
};

export type SignTypes = ">" | "<" | "<=" | ">=" | "=";

type UpdateIfValueBody = {
  name: string | undefined;
  sign: SignTypes | undefined;
  value: number | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/ifcommands/ifValues/:ifValueId
// @access Private
export const updateIfValueController: RequestHandler<
  UpdateIfValueParams,
  unknown,
  UpdateIfValueBody,
  unknown
> = async (req, res, next) => {
  try {
    const ifValue = await updateIfValueService({
      ifValueId: req.params.ifValueId,
      name: req.body.name,
      sign: req.body.sign,
      value: req.body.value,
    });
    if (ifValue) {
      return res.status(201).json(ifValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteIfValueParams = {
  ifValueId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/ifcommands/ifValues/:ifId
// @access Private
export const deleteIfValueController: RequestHandler<
  DeleteIfValueParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifValue = await deleteIfValueService({
      ifValueId: req.params.ifValueId,
    });
    if (ifValue) {
      return res.status(201).json(ifValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
