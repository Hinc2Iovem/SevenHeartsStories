import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { StoryStatusTypes } from "../../controllers/StoryData/StoryController";
import Season from "../../models/StoryData/Season";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../utils/validateMongoId";
import StoryInfo from "../../models/StoryData/StoryInfo";
import Staff from "../../models/User/Staff";

export const storyGetAllService = async () => {
  const existingStories = await Story.find().lean();

  if (!existingStories.length) {
    return [];
  }

  return existingStories;
};

type GetStoryByIdTypes = {
  storyId: string;
};

export const storyGetByIdService = async ({ storyId }: GetStoryByIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  const existingStory = await Story.findById(storyId).lean();

  if (!existingStory) {
    return null;
  }

  return existingStory;
};

type GetAllAssignedStoriesTypes = {
  staffId: string;
};

export const getAllAssignedStoriesByStaffIdService = async ({
  staffId,
}: GetAllAssignedStoriesTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingStaff = await Staff.findById(staffId).lean();
  if (!existingStaff) {
    throw createHttpError(400, `No staff with id: ${staffId} was found`);
  }

  const assignedWorkers = await StoryInfo.find({ staffId }).lean();
  if (!assignedWorkers.length) {
    return [];
  }

  return assignedWorkers;
};

type GetAllStoryAssignWorkersTypes = {
  storyId: string;
};

export const getAllStoryAssignWorkersService = async ({
  storyId,
}: GetAllStoryAssignWorkersTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, `No story with id: ${storyId} was found`);
  }

  const assignedWorkers = await StoryInfo.find({ storyId }).lean();
  if (!assignedWorkers.length) {
    return [];
  }

  return assignedWorkers;
};

type GetStoryAssignWorkerTypes = {
  storyId: string;
  staffId: string;
};

export const getStoryAssignWorkerService = async ({
  storyId,
  staffId,
}: GetStoryAssignWorkerTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, `No story with id: ${storyId} was found`);
  }
  const existingStaff = await Staff.findById(staffId).lean();
  if (!existingStaff) {
    throw createHttpError(400, `No staff with id: ${staffId} was found`);
  }

  const alreadyAssigned = await StoryInfo.findOne({ staffId, storyId }).lean();
  if (!alreadyAssigned) {
    return null;
  }

  return alreadyAssigned;
};

type StoryAssignWorkerTypes = {
  storyId: string;
  staffId: string;
};

export const storyAssignWorkerService = async ({
  storyId,
  staffId,
}: StoryAssignWorkerTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, `No story with id: ${storyId} was found`);
  }
  const existingStaff = await Staff.findById(staffId).lean();
  if (!existingStaff) {
    throw createHttpError(400, `No staff with id: ${staffId} was found`);
  }

  const alreadyAssigned = await StoryInfo.findOne({ staffId, storyId });

  if (alreadyAssigned) {
    throw createHttpError(400, "You are already assigned to this story");
  } else {
    return await StoryInfo.create({ storyId, staffId });
  }
};

// type GetAllStoriesByStatusTypes = {
//   storyStatus: string | undefined;
//   results: StoryDocument[];
//   next: NextTypes;
//   prev: PrevTypes;
// };

// export const storyGetAllByStatusService = async ({
//   storyStatus,
//   results,
//   next,
//   prev,
// }: GetAllStoriesByStatusTypes) => {
//   if (!storyStatus?.trim().length) {
//     throw createHttpError(400, "StoryStatus is required");
//   }

//   const filteredResults = results.filter(
//     (r) => r.storyStatus.toLowerCase() === storyStatus.toLowerCase()
//   );

//   if (next && prev) {
//     return {
//       next,
//       prev,
//       results: filteredResults,
//     };
//   } else if (next) {
//     return {
//       next,
//       results: filteredResults,
//     };
//   } else if (prev) {
//     return {
//       prev,
//       results: filteredResults,
//     };
//   } else {
//     return filteredResults;
//   }
// };

type StoryCreateTypes = {
  title: string | undefined;
  description: string | undefined;
  imgUrl: string | undefined;
  currentLanguage: string | undefined;
  genres: string | undefined;
};

export const storyCreateService = async ({
  genres,
  imgUrl,
  currentLanguage,
  description,
  title,
}: StoryCreateTypes) => {
  if (
    !title?.trim().length ||
    !description?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "Title, description and currentLanguage is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const newStory = await Story.create({
    amountOfEpisodes: 0,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.StoryName,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: description,
    textFieldName: TranslationTextFieldName.StoryDescription,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: genres,
    textFieldName: TranslationTextFieldName.StoryGenre,
  });

  if (imgUrl) {
    newStory.imgUrl = imgUrl;
  }

  const newSeason = await Season.create({
    storyId: newStory._id,
  });

  await Translation.create({
    seasonId: newSeason._id,
    language: "russian",
    text: "Сезон 1",
    textFieldName: TranslationTextFieldName.SeasonName,
  });

  return newStory;
};

type StoryUpdateImgTypes = {
  storyId: string;
  imgUrl: string | undefined;
};

export const storyUpdateImgService = async ({
  storyId,
  imgUrl,
}: StoryUpdateImgTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  if (imgUrl?.trim().length) {
    existingStory.imgUrl = imgUrl;
  }

  return await existingStory.save();
};

type StoryUpdateStatusTypes = {
  storyId: string;
  storyStatus: StoryStatusTypes | undefined;
};

export const storyUpdateStatusService = async ({
  storyId,
  storyStatus,
}: StoryUpdateStatusTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  if (storyStatus?.trim().length) {
    if (storyStatus?.trim() === "doing" || storyStatus?.trim() === "done") {
      existingStory.storyStatus = storyStatus;
    } else {
      throw createHttpError(
        400,
        "StoryStatus may be equal to (done or doing) only"
      );
    }
  }

  return await existingStory.save();
};

type StoryDeleteTypes = {
  storyId: string;
};

export const storyDeleteService = async ({ storyId }: StoryDeleteTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  await existingStory.deleteOne();

  return `Story with id ${storyId} was removed`;
};
