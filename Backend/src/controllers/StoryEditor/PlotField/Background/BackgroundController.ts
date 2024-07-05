import { RequestHandler } from "express";
import {
  createBackgroundService,
  deleteBackgroundService,
  getBackgroundByPlotFieldCommandIdService,
  updateBackgroundService,
} from "../../../../services/StoryEditor/PlotField/Background/BackgroundService";

type GetBackgroundByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/backgrounds
// @access Private
export const getBackgroundByPlotFieldCommandIdController: RequestHandler<
  GetBackgroundByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const background = await getBackgroundByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateBackgroundParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/backgrounds
// @access Private
export const createBackgroundController: RequestHandler<
  CreateBackgroundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const background = await createBackgroundService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateBackgroundParams = {
  backgroundId: string;
};

type UpdateBackgroundBody = {
  backgroundName: string | undefined;
  pointOfMovement: number | undefined;
  musicName: string | undefined;
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/backgrounds/:backgroundId
// @access Private
export const updateBackgroundController: RequestHandler<
  UpdateBackgroundParams,
  unknown,
  UpdateBackgroundBody,
  unknown
> = async (req, res, next) => {
  try {
    const background = await updateBackgroundService({
      backgroundName: req.body.backgroundName,
      pointOfMovement: req.body.pointOfMovement,
      imgUrl: req.body.imgUrl,
      musicName: req.body.musicName,
      backgroundId: req.params.backgroundId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// type BackgroundUpdateImgUrlParams = {
//   backgroundId: string;
// };
// type BackgroundUpdateImgUrlBody = {
//   imgUrl: string | undefined;
// };

// // @route PATCH http://localhost:3500/plotFieldCommands/backgrounds/:backgroundId/img
// // @access Private
// export const backgroundUpdateImgUrlController: RequestHandler<
//   BackgroundUpdateImgUrlParams,
//   unknown,
//   BackgroundUpdateImgUrlBody,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const background = await backgroundUpdateImgService({
//       backgroundId: req.params.backgroundId,
//       imgUrl: req.body.imgUrl,
//     });
//     if (background) {
//       return res.status(201).json(background);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

type DeleteBackgroundParams = {
  backgroundId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/backgrounds/:backgroundId
// @access Private
export const deleteBackgroundController: RequestHandler<
  DeleteBackgroundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const background = await deleteBackgroundService({
      backgroundId: req.params.backgroundId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
