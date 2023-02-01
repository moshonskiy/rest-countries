import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ExtraArgumentType, RootState } from 'store';

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

interface RegionBloc {
    acronym: string;
    name: string;
}

type Translation = Record<string, string>;

export interface CountryInfo {
    alpha2Code: string;
    alpha3Code: string;
    altSpellings: string[];
    area: number;
    borders: string[];
    callingCodes: string[];
    capital: string;
    currencies: Currency[];
    demonym: string;
    flag: string;
    flags: Flag;
    independent: boolean;
    languages: Language[];
    latlng: number[];
    name: string;
    nativeName: string;
    numericCode: string;
    population: number;
    region: string;
    regionBlocs: RegionBloc[];
    subregion: string;
    timezones: string[];
    topLevelDomain: string[];
    translations: Translation[];
}

interface Flag {
    svg: string;
    png: string;
}

export const loadCountries = createAsyncThunk<CountryInfo[], undefined, { extra: ExtraArgumentType }>(
    '@@countries/loadCountries',
    async (_, { extra: { client, api } }) => {
        console.log(")", _);
        const { data } = await client.get(api.ALL_COUNTRIES);
        return data;
    },
);

export const selectCountriesInfo = (state: RootState) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length,
});

export const selectAllCountries = (state: RootState) => state.countries.list;
export const selectVisibleCountries = (state: RootState, { search = '', region = '' }) => {
    return state.countries.list.filter((country) => (
        country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)))
}

export interface CoutriesInitialState {
    list: CountryInfo[];
    status: 'idle' | 'rejected' | 'received' | 'loading';
    error: string | null;
}

const initialState: CoutriesInitialState = {
    list: [],
    status: 'idle',
    error: null,
}

const countriesSlice = createSlice({
    name: '@@countries',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'received';
            })
    }
});

export default countriesSlice.reducer;
