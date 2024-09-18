import { create } from "zustand";

type PlotfieldCommand = {
  _id: string;
  command: string;
  commandOrder: number;
  topologyBlockId: string;
};

type PlotfieldCommandStore = {
  commands: PlotfieldCommand[];
  addCommand: (newCommand: PlotfieldCommand) => void;
  setCommand: (id: string, newCommand: string) => void;
  setId: (oldId: string, newId: string) => void;
  clearCommand: () => void;
};

const usePlotfieldCommands = create<PlotfieldCommandStore>((set) => ({
  commands: [],
  addCommand: (newCommand: PlotfieldCommand) =>
    set(() => ({
      commands: [newCommand],
    })),
  setCommand: (id, newCommand) =>
    set((state) => ({
      commands: state.commands.map((command) =>
        command._id === id ? { ...command, command: newCommand } : command
      ),
    })),
  setId: (oldId, newId) =>
    set((state) => ({
      commands: state.commands.map((command) =>
        command._id === oldId ? { ...command, _id: newId } : command
      ),
    })),
  clearCommand: () =>
    set(() => ({
      commands: [],
    })),
}));

export default usePlotfieldCommands;
