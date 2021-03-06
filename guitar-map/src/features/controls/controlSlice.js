import { createSlice } from "@reduxjs/toolkit";
import { SHARP, FLAT } from "../../constants";

const flats = {
  "A♭": {
    state: false,
    colour: "",
  },
  A: {
    state: false,
    colour: "",
  },
  "B♭": {
    state: false,
    colour: "",
  },
  B: {
    state: false,
    colour: "",
  },
  C: {
    state: false,
    colour: "",
  },
  "D♭": {
    state: false,
    colour: "",
  },
  D: {
    state: false,
    colour: "",
  },
  "E♭": {
    state: false,
    colour: "",
  },
  E: {
    state: false,
    colour: "",
  },
  F: {
    state: false,
    colour: "",
  },
  "G♭": {
    state: false,
    colour: "",
  },
  G: {
    state: false,
    colour: "",
  },
};

const sharps = {
  A: {
    state: false,
    colour: "",
  },
  "A♯": {
    state: false,
    colour: "",
  },
  B: {
    state: false,
    colour: "",
  },
  C: {
    state: false,
    colour: "",
  },
  "C♯": {
    state: false,
    colour: "",
  },
  D: {
    state: false,
    colour: "",
  },
  "D♯": {
    state: false,
    colour: "",
  },
  E: {
    state: false,
    colour: "",
  },
  F: {
    state: false,
    colour: "",
  },
  "F♯": {
    state: false,
    colour: "",
  },
  G: {
    state: false,
    colour: "",
  },
  "G♯": {
    state: false,
    colour: "",
  },
};

const RED = "#f5222d";
const VOLCANO = "#fa541c";
const LIGHT_ORANGE = "#ffc069";
const GOLD = "#faad14";
const YELLOW = "#fadb14";
const LIME = "#a0d911";
const DARK_GREEN = "#135200";
const CYAN = "#13c2c2";
const LIGHT_BLUE = "#91d5ff";
const ELECTRIC_BLUE = "#1d39c4";
const PURPLE = "#722ed1";
const MAGENTA = "#eb2f96";

const COLOUR_POOL = [
  RED,
  ELECTRIC_BLUE,
  LIME,
  VOLCANO,
  PURPLE,
  DARK_GREEN,
  LIGHT_ORANGE,
  CYAN,
  GOLD,
  MAGENTA,
  YELLOW,
  LIGHT_BLUE,
];

export const controlSlice = createSlice({
  name: "controls",
  initialState: {
    useFlats: false,
    currColourIndex: 0,
    tuning: "E,A,D,G,B,E",
    notes: {
      ...sharps,
    },
  },

  reducers: {
    toggleNote: (state, action) => {
      const note = action.payload.toUpperCase();

      const newState = !state["notes"][note]["state"];
      const newColour = newState ? COLOUR_POOL[state.currColourIndex] : "";
      const newColourIndex = newState
        ? state.currColourIndex + 1
        : state.currColourIndex - 1;

      return {
        ...state,
        currColourIndex: newColourIndex,
        notes: {
          ...state.notes,
          [note]: {
            state: newState,
            colour: newColour,
          },
        },
      };
    },

    clearNotes: (state) => {
      const notes = state.useFlats ? flats : sharps;

      return {
        ...state,
        currColourIndex: 0,
        notes,
      };
    },

    toggleUseFlats: (state) => {
      const useFlats = !state.useFlats;
      let notesToUse = useFlats ? flats : sharps;

      // TODO: map between flats and sharps so user doesn't have to re-select notes

      return {
        ...state,
        currColourIndex: 0,
        useFlats,
        notes: {
          ...notesToUse,
        },
      };
    },

    updateTuning: (state, action) => {
      return {
        ...state,
        tuning: action.payload,
      };
    },

    updateCustomTuning: (state, action) => {
      const { index, note } = action.payload;
      const tuningArray = state.tuning.split(",");

      tuningArray[index] = note.trim().toUpperCase().replace("#", SHARP);

      if (note.length === 2 && note.charAt(1) === "b") {
        // Don't want to replace the note "b" with "♭"
        // e.g., "bb" should evaluate to "B♭", "ab" should evaluate to "A♭", etc.
        tuningArray[index] = tuningArray[index].substring(0, 1) + FLAT;
      }

      const newTuning = tuningArray.join();

      return {
        ...state,
        tuning: newTuning,
      };
    },
  },
});

export const {
  toggleNote,
  clearNotes,
  toggleUseFlats,
  updateTuning,
  updateCustomTuning,
} = controlSlice.actions;

export default controlSlice.reducer;
