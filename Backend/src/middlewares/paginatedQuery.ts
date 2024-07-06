import { RequestHandler } from "express";
import { Model, Document } from "mongoose";
import createHttpError from "http-errors";

type PaginatedQueryTypes = {
  page: string;
  limit: string;
};

type ResultTypes<T extends Document> = {
  next: {
    page: number;
    limit: number;
  };
  prev: {
    page: number;
    limit: number;
  };
  results: T[];
};

type RequestBodyTypes = {
  storyStatus: "done" | "doing";
};

export default function paginatedQuery<T extends Document>(
  model: Model<T>
): RequestHandler<unknown, unknown, RequestBodyTypes, PaginatedQueryTypes> {
  return async (req, res, next) => {
    const storyStatus = req.body.storyStatus.toLowerCase();
    console.log("storyStatus: ", storyStatus);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {} as ResultTypes<T>;

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }
    try {
      if (storyStatus?.trim() === "done" || storyStatus?.trim() === "doing") {
        results.results = await model
          .find({ storyStatus })
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
      }
      res.locals.paginatedResults = results;
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };
}
