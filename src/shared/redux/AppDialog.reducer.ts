import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Store (Dialog)
 */
export type AppDeleteDialogProps = {
  id: number;
  type: string;
  message: string;
  onConfirm?: () => void;
};

type AppDeleteDialogState = {
  id: number;
  type: string;
  message: string;
  isOpen: boolean;
  onConfirm?: () => void;
};

type AppDialogState = {
  toDelete: AppDeleteDialogState
};

const initialState: AppDialogState = {
  toDelete: {
    id: -1,
    type: "",
    message: "",
    isOpen: false
  }
};

/**
 * Reducer (Dialog)
 */
const AppDialogSlice = createSlice({
  name: "app-dialog-reducer",
  initialState,
  reducers: {
    OnCloseAppDeleteDialog: (state) => {
      state.toDelete = {
        isOpen: false,
        id: -1,
        type: "",
        message: "",
        onConfirm: undefined
      };
    },
    OnOpenAppDeleteDialog: (state, {payload}: PayloadAction<AppDeleteDialogProps>) => {
      state.toDelete = {
        isOpen: true,
        id: payload.id,
        type: payload.type,
        message: payload.message,
        onConfirm: payload.onConfirm
      };
    }
  }
});

/**
 * Actions (Dialog)
 */
export const {
  OnCloseAppDeleteDialog,
  OnOpenAppDeleteDialog
} = AppDialogSlice.actions;

/**
 * Principal
 */
export default AppDialogSlice.reducer;