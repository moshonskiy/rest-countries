import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const themeInitialState: string = 'light';

const themeSlice = createSlice({
    name: '@@theme',
    initialState: themeInitialState,
    reducers: {
        setTheme: (_, action: PayloadAction<string>) => {
            return action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
