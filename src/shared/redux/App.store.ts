import { configureStore } from "@reduxjs/toolkit";
import AppDialogReducer from "./AppDialog.reducer";
import RkAndMtAppReducer from "../../rick-and-morty-list/redux/RkAndMtApp.reducer";
import RkAndMtCharacterReducer from "../../rick-and-morty-list/redux/RkAndMtCharacter.reducer";
import RkAndMtLocationReducer from "../../rick-and-morty-list/redux/RkAndMtLocation.reducer";
import RkAndMtEpisodeReducer from "../../rick-and-morty-list/redux/RkAndMtEpisode.reducer";
import ApuUserReducer from "../../admin-of-post-and-users/redux/ApuUser.reducer";
import ApuPostReducer from "../../admin-of-post-and-users/redux/ApuPost.reducer";

/**
 * Store (App)
 */
export const AppStore = configureStore({
  reducer: {
    appDialog: AppDialogReducer,
    rkAndMtApp: RkAndMtAppReducer,
    rkAndMtCharacter: RkAndMtCharacterReducer,
    rkAndMtLocation: RkAndMtLocationReducer,
    rkAndMtEpisode: RkAndMtEpisodeReducer,
    apuUser: ApuUserReducer,
    apuPost: ApuPostReducer,
  }
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type RootDispatch = typeof AppStore.dispatch;