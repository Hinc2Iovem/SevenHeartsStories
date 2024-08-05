import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CoordinatesTypes = {
  _id: string;
  coordinatesX: number;
  coordinatesY: number;
};

type CoordinatesActionTypes = {
  setCoordinates: (coordinates: CoordinatesTypes) => void;
};

export const useCoordinates = create<
  CoordinatesTypes & CoordinatesActionTypes
>()(
  immer((set) => ({
    _id: "",
    coordinatesX: 0,
    coordinatesY: 0,
    setCoordinates: (coordinates) => {
      set((state) => {
        state._id = coordinates._id;
        state.coordinatesX = coordinates.coordinatesX;
        state.coordinatesY = coordinates.coordinatesY;
      });
    },
  }))
);
