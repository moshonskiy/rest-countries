import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: '@@test',
    initialState: 0,
    reducers: {
        test: (state, action) => {
            state += 1;
        }
    }
});

export const { test } = testSlice.actions;
export default testSlice.reducer;
