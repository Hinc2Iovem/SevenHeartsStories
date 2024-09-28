import { create } from "zustand";
import { AllPossiblePlotFieldComamndsTypes } from "../../../types/StoryEditor/PlotField/PlotFieldTypes";

type PlotfieldCommand = {
  _id: string;
  command: AllPossiblePlotFieldComamndsTypes;
  commandOrder: number;
  topologyBlockId: string;
  commandIfId?: string;
  isElse?: boolean;
};

type CommandsInfo = {
  amountOfCommands: number;
  topologyBlockId: string;
};

type UpdateCommandInfoSignType = "add" | "minus";

type PlotfieldCommandStore = {
  commands: {
    topologyBlockId: string;
    commands: PlotfieldCommand[];
  }[];
  commandsInfo: CommandsInfo[];
  getCurrentAmountOfCommands: (topologyBlockId: string) => number;
  getCommandsByTopologyBlockId: (topologyBlockId: string) => PlotfieldCommand[];
  addCommand: (newCommand: PlotfieldCommand, topologyBlockId: string) => void;
  updateCommandName: (
    id: string,
    newCommand: AllPossiblePlotFieldComamndsTypes
  ) => void;
  updateCommandOrder: (id: string, commandOrder: number) => void;
  setAllCommands: (
    commands: PlotfieldCommand[],
    topologyBlockId: string
  ) => void;
  setCurrentAmountOfCommands: (
    topologyBlockId: string,
    amountOfCommands: number
  ) => void;
  updateCommandInfo: (
    topologyBlockId: string,
    addOrMinus: UpdateCommandInfoSignType
  ) => void;
  clearCommand: () => void;
};

const usePlotfieldCommands = create<PlotfieldCommandStore>((set, get) => ({
  commands: [
    {
      topologyBlockId: "",
      commands: [],
    },
  ],
  commandsInfo: [],
  getCommandsByTopologyBlockId: (topologyBlockId: string) => {
    const allCommands =
      get().commands.find((c) => c.topologyBlockId === topologyBlockId)
        ?.commands || [];
    return allCommands;
  },
  addCommand: (newCommand: PlotfieldCommand, topologyBlockId: string) =>
    set((state) => {
      const existingBlock = state.commands.find(
        (block) => block.topologyBlockId === topologyBlockId
      );

      if (existingBlock) {
        return {
          commands: state.commands.map((block) =>
            block.topologyBlockId === topologyBlockId
              ? {
                  ...block,
                  commands: [...block.commands, newCommand],
                }
              : block
          ),
        };
      } else {
        return {
          commands: [
            ...state.commands,
            { topologyBlockId, commands: [newCommand] },
          ],
        };
      }
    }),
  updateCommandName: (id, newCommand) =>
    set((state) => ({
      commands: state.commands.map((block) => ({
        ...block,
        commands: block.commands.map((command) =>
          command._id === id ? { ...command, command: newCommand } : command
        ),
      })),
    })),
  updateCommandOrder: (id, commandOrder) =>
    set((state) => ({
      commands: state.commands.map((block) => ({
        ...block,
        commands: block.commands.map((command) =>
          command._id === id ? { ...command, commandOrder } : command
        ),
      })),
    })),
  setAllCommands: (commands, topologyBlockId) =>
    set((state) => {
      const existingBlock = state.commands.find(
        (block) => block.topologyBlockId === topologyBlockId
      );

      if (existingBlock) {
        return {
          commands: state.commands.map((block) =>
            block.topologyBlockId === topologyBlockId
              ? { ...block, commands }
              : block
          ),
        };
      } else {
        return {
          commands: [...state.commands, { topologyBlockId, commands }],
        };
      }
    }),
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

  clearCommand: () =>
    set(() => ({
      commands: [],
    })),
}));

export default usePlotfieldCommands;
