import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from '../interfaces/Character'
import { AppThunk } from "./store";
import { getAllCharacters } from '../services/api';

interface CharactersSliceProps {
    charactersList: Character[];
    loading: boolean;
    hasData: boolean;
    errorUnknown: boolean;
}


const initialState: CharactersSliceProps = {
    charactersList: [],
    loading: true,
    hasData: false,
    errorUnknown: false,
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacterList: (state, action: PayloadAction<Character[]>) => {
            state.charactersList = action.payload;
            state.loading = false;
            state.hasData = true;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setErrorUnknown: (state) => {
            state.errorUnknown = true;
        },
    }
})

export const { setCharacterList, setLoading, setErrorUnknown } = charactersSlice.actions;

export const selectCharactersList = (state: any) => state.characters.charactersList;
export const selectLoading = (state: any) => state.characters.loading;
export const selectHasData = (state: any) => state.characters.hasData;
export const selectErrorUnknown = (state: any) => state.characters.errorUnknown;

export const getCharacterList = (): AppThunk => async (dispatch) => {
    try{
        const list = await getAllCharacters();
        dispatch(setCharacterList(list));
    }catch(e){
        dispatch(setErrorUnknown());
    }
}

export default charactersSlice.reducer;
