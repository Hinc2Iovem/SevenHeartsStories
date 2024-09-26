import { create } from "zustand";

type PlotfieldCommand = {
  _id: string;
  command: string;
  commandOrder: number;
  topologyBlockId: string;
};

type CommandsInfo = {
  amountOfCommands: number;
  topologyBlockId: string;
};

type UpdateCommandInfoSignType = "add" | "minus";

type PlotfieldCommandStore = {
  commands: PlotfieldCommand[];
  commandsInfo: CommandsInfo[];
  getCurrentAmountOfCommands: (topologyBlockId: string) => number;
  addCommand: (newCommand: PlotfieldCommand) => void;
  setCommand: (id: string, newCommand: string) => void;
  setCurrentAmountOfCommands: (
    topologyBlockId: string,
    amountOfCommands: number
  ) => void;
  updateCommandInfo: (
    topologyBlockId: string,
    addOrMinus: UpdateCommandInfoSignType
  ) => void;
  setId: (oldId: string, newId: string) => void;
  clearCommand: () => void;
};

const usePlotfieldCommands = create<PlotfieldCommandStore>((set, get) => ({
  commands: [],
  commandsInfo: [],
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
  setCurrentAmountOfCommands: (topologyBlockId, amountOfCommands) =>
    set((state) => {
      const existingInfo = state.commandsInfo.find(
        (c) => c.topologyBlockId === topologyBlockId
      );

      if (existingInfo) {
        return {
          commandsInfo: state.commandsInfo.map((c) =>
            c.topologyBlockId === topologyBlockId
              ? { ...c, amountOfCommands }
              : c
          ),
        };
      }

      return {
        commandsInfo: [
          ...state.commandsInfo,
          { topologyBlockId, amountOfCommands },
        ],
      };
    }),
  getCurrentAmountOfCommands: (topologyBlockId: string) => {
    const currentAmount =
      get().commandsInfo.find((c) => c.topologyBlockId === topologyBlockId)
        ?.amountOfCommands || 1;
    return currentAmount;
  },
  updateCommandInfo: (topologyBlockId, addOrMinus) =>
    set((state) => ({
      commandsInfo: state.commandsInfo.map((c) =>
        c.topologyBlockId === topologyBlockId
          ? {
              ...c,
              amountOfCommands:
                addOrMinus === "add"
                  ? c.amountOfCommands + 1
                  : c.amountOfCommands - 1 > 0
                  ? 0
                  : c.amountOfCommands - 1,
            }
          : c
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
