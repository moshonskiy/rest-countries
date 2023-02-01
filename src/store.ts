import axios from "axios";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import controlsSlice from "./features/controls/controlsSlice";
import countriesSlice from "./features/countries/countriesSlice";
import detailsSlice from "./features/details/detailsSlice";
import themeSlice from "./features/theme/themeSlice";
import * as api from "./config";

export type ExtraArgumentType = {
    client: typeof axios;
    api: typeof api;
}

const rootReducer = combineReducers({
    controls: controlsSlice,
    countries: countriesSlice,
    details: detailsSlice,
    theme: themeSlice,
});


const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api
            } as ExtraArgumentType,
        }
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
