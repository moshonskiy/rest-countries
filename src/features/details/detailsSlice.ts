import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgumentType } from 'store';
import { CountryInfo } from "features/countries/countriesSlice";
import { RootState } from "store";

export const loadCountryByName = createAsyncThunk<CountryInfo, string, { extra: ExtraArgumentType }>(
    '@@details/loadCountryByName',
    async (name, {
        extra: {
            client,
            api,
        }
    }) => {
        const { data } = await client.get(api.searchByCountry(name));
        return data[0];
    }
);

export const loadNeighborsByBorders = createAsyncThunk<string[], string[], { extra: ExtraArgumentType }>(
    '@@details/loadNeighborsByBorders',
    async (borders, {
        extra: {
            client,
            api,
        }
    }) => {
        const { data } = await client.get(api.filterByCode(borders));
        const onlyNames = data.map((c) => c.name);
        return onlyNames;
    }
)

export interface DetailsInitialState {
    country: CountryInfo;
    status: 'idle' | 'rejected' | 'received' | 'loading';
    error: null | string;
    neighbors: string[];
}

const initialState: DetailsInitialState = {
    country: null,
    status: 'idle',
    error: null,
    neighbors: [],
};

const detailsSlice = createSlice({
    name: '@@details',
    initialState: initialState,
    reducers: {
        setLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        clearDetails: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCountryByName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountryByName.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(loadCountryByName.fulfilled, (state, action) => {
                state.status = 'received';
                state.country = action.payload;
            })
            .addCase(loadNeighborsByBorders.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(loadNeighborsByBorders.fulfilled, (state, action) => {
                state.neighbors = action.payload;
            })
    }
});

export const selectCurrentCountry = (state: RootState) => state.details.country;

export const selectDetails = (state: RootState) => state.details;

export const selectNeighbors = (state: RootState) => state.details.neighbors;

export const { setLoading, clearDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
