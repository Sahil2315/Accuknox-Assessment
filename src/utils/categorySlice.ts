import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { categoryTS } from "../types";
import WidgetChange from "../components/WidgetChange";
import localStore from "../startingPoint.json";

export interface categoryState {
  value: categoryTS[];
}

type WidgetChange = {
  name: string;
  text: string;
  checked: boolean;
  widIndex: number;
  catIndex: number;
};

type widToggle = {
  widIndex: number;
  catIndex: number;
  checked: boolean;
};

let temp = localStorage.getItem("categories-local");
let catsJSON = JSON.parse(temp);

const initialState: categoryState = {
  value: catsJSON ? catsJSON : localStore,
};

export const categorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetCategories: (state, action: PayloadAction<Array<categoryTS>>) => {
      state.value = action.payload;
      console.log(state.value);
    },
    newWidget: (state, action: PayloadAction<number>) => {
      state.value[action.payload].widgets = [
        ...state.value[action.payload].widgets,
        {
          name: `Widget${state.value[action.payload].widgets.length + 1}`,
          text: "Click this Widget to start Editing",
          checked: true,
        },
      ];
    },
    changeWidget: (state, action: PayloadAction<WidgetChange>) => {
      state.value[action.payload.catIndex].widgets[action.payload.widIndex] = {
        name: action.payload.name,
        text: action.payload.text,
        checked: action.payload.checked,
      };
    },
    toggleWidget: (state, action: PayloadAction<widToggle>) => {
      state.value[action.payload.catIndex].widgets[
        action.payload.widIndex
      ].checked = action.payload.checked;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetCategories, newWidget, changeWidget, toggleWidget } =
  categorySlice.actions;

export default categorySlice.reducer;
