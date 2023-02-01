import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ControlsInitialState {
    search: string;
    region: string;
}

const initialState: ControlsInitialState = {
    search: '',
    region: '',
}

const controlsSlice = createSlice({
    name: '@@controls',
    initialState: initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload;
        },
        clearControls: () => {
            return initialState;
        }
    }
});

export const selectSearch = (state: RootState) => state.controls.search;

export const selectRegion = (state: RootState) => state.controls.region;

export const selectControls = (state: RootState) => state.controls;

export const { setRegion, setSearch, clearControls } = controlsSlice.actions;
export default controlsSlice.reducer;
