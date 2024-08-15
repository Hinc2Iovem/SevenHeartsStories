import { RequestHandler } from "express";
import {
  getAllAssignedStoriesByStaffIdService,
  getAllAssignedStoriesTranslationByStaffIdService,
  getAllStoriesByLanguageService,
  getAllStoryAssignWorkersService,
  getStoryAssignWorkerService,
  storyAssignWorkerService,
  storyCreateService,
  storyDeleteService,
  storyGetAllService,
  storyGetByIdService,
  storyUpdateImgService,
  storyUpdateStatusForWorkerService,
} from "../../services/StoryData/StoryService";

type GetAllStoriesByLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/stories/language
// @access Private
export const getAllStoriesByLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetAllStoriesByLanguageQuery
> = async (req, res, next) => {
  try {
    const story = await getAllStoriesByLanguageService({
      currentLanguage: req.query.currentLanguage,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/stories
// @access Private
export const storyGetAllController: RequestHandler = async (req, res, next) => {
  try {
    const story = await storyGetAllService();
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetStoryByIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId
// @access Private
export const storyGetByIdController: RequestHandler<
  GetStoryByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyGetByIdService({
      storyId: req.params.storyId,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllAssignedStoriesTranslationTypes = {
  staffId: string;
};
type GetAllAssignedStoriesTranslationQuery = {
  currentLanguage?: string;
};
// @route GET http://localhost:3500/stories/translations/staff/:staffId/assignWorkers
// @access Private
export const getAllAssignedStoriesTranslationByStaffIdController: RequestHandler<
  GetAllAssignedStoriesTranslationTypes,
  unknown,
  unknown,
  GetAllAssignedStoriesTranslationQuery
> = async (req, res, next) => {
  try {
    const storyInfo = await getAllAssignedStoriesTranslationByStaffIdService({
      staffId: req.params.staffId,
      currentLanguage: req.query.currentLanguage,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllAssignedStoriesTypes = {
  staffId: string;
};
// @route GET http://localhost:3500/stories/staff/:staffId/assignWorkers
// @access Private
export const getAllAssignedStoriesByStaffIdController: RequestHandler<
  GetAllAssignedStoriesTypes,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const storyInfo = await getAllAssignedStoriesByStaffIdService({
      staffId: req.params.staffId,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryInfoGetAllWorkersParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/assignWorkers
// @access Private
export const getAllStoryAssignWorkersController: RequestHandler<
  StoryInfoGetAllWorkersParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const storyInfo = await getAllStoryAssignWorkersService({
      storyId: req.params.storyId,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryInfoGetParams = {
  storyId: string;
  staffId: string;
};

// @route GET http://localhost:3500/stories/:storyId/staff/:staffId/assignWorkers
// @access Private
export const getStoryAssignWorkerController: RequestHandler<
  StoryInfoGetParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const storyInfo = await getStoryAssignWorkerService({
      storyId: req.params.storyId,
      staffId: req.params.staffId,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryInfoUpdateParams = {
  storyId: string;
  staffId: string;
};

// @route PATCH http://localhost:3500/stories/:storyId/staff/:staffId/assignWorkers
// @access Private
export const storyAssignWorkersController: RequestHandler<
  StoryInfoUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const storyInfo = await storyAssignWorkerService({
      storyId: req.params.storyId,
      staffId: req.params.staffId,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// type GetStoryByStatusBody = {
//   storyStatus: string | undefined;
// };

// export type NextTypes = {
//   page: number;
//   string: number;
// };
// export type PrevTypes = {
//   page: number;
//   string: number;
// };

// // @route GET http://localhost:3500/stories/status
// // @access Private
// export const storyGetAllByStatusController: RequestHandler<
//   unknown,
//   unknown,
//   GetStoryByStatusBody,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const paginatedResults = res.locals.paginatedResults;

//     const stories = await storyGetAllByStatusService({
//       storyStatus: req.body.storyStatus,
//       results: paginatedResults.results as StoryDocument[],
//       next: (paginatedResults.next as NextTypes) ?? null,
//       prev: (paginatedResults.prev as PrevTypes) ?? null,
//     });

//     if (stories) {
//       return res.status(200).json(stories);
//     } else {
//       return res.status(400).json({ message: "Pagination results not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

type StoryCreateBody = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
  imgUrl: string | undefined;
  genres: string | undefined;
};

// @route POST http://localhost:3500/stories
// @access Private
export const storyCreateController: RequestHandler<
  unknown,
  unknown,
  StoryCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyCreateService({
      currentLanguage: req.body.currentLanguage,
      description: req.body.description,
      title: req.body.title,
      genres: req.body.genres,
      imgUrl: req.body.imgUrl,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

export type StoryStatusTypes = "done" | "doing";

type StoryUpdateStatusParams = {
  storyId: string;
};
type StoryUpdateStatusBody = {
  storyStatus: StoryStatusTypes | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId/status
// @access Private
// export const storyUpdateStatusController: RequestHandler<
//   StoryUpdateStatusParams,
//   unknown,
//   StoryUpdateStatusBody,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const story = await storyUpdateStatusService({
//       storyId: req.params.storyId,
//       storyStatus: req.body.storyStatus,
//     });
//     if (story) {
//       return res.status(201).json(story);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
type StoryUpdateStatusWorkerParams = {
  storyId: string;
  staffId: string;
};

// @route PATCH http://localhost:3500/stories/:storyId/staff/:staffId/status
// @access Private
export const storyUpdateStatusForWorkerController: RequestHandler<
  StoryUpdateStatusWorkerParams,
  unknown,
  StoryUpdateStatusBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateStatusForWorkerService({
      storyId: req.params.storyId,
      staffId: req.params.staffId,
      storyStatus: req.body.storyStatus,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryUpdateImgUrlParams = {
  storyId: string;
};
type StoryUpdateImgUrlBody = {
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId/img
// @access Private
export const storyUpdateImgUrlController: RequestHandler<
  StoryUpdateImgUrlParams,
  unknown,
  StoryUpdateImgUrlBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateImgService({
      storyId: req.params.storyId,
      imgUrl: req.body.imgUrl,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryDeleteParams = {
  storyId: string;
};

// @route DELETE http://localhost:3500/stories/:storyId
// @access Private
export const storyDeleteController: RequestHandler<
  StoryDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyDeleteService({
      storyId: req.params.storyId,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
