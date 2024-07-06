import { Document } from "mongoose";

declare module "express-serve-static-core" {
  interface Response {
    paginatedResults?: {
      next?: {
        page: number;
        limit: number;
      };
      prev?: {
        page: number;
        limit: number;
      };
      results: Document[];
    };
  }
}
