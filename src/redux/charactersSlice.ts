import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from '../interfaces/Character'
import { AppThunk } from "./store";
import { getAllCharacters } from '../services/api';
import type { RootState } from './store';

interface CharactersSliceProps {
    charactersList: Character[];
    characterListSearched: Character[];
    loading: boolean;
    hasData: boolean;
    errorUnknown: boolean;
}


const initialState: CharactersSliceProps = {
    charactersList: [],
    characterListSearched: [],
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
        setCharacterListSearched: (state, action: PayloadAction<Character[]>) => {
            state.characterListSearched = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setErrorUnknown: (state) => {
            state.errorUnknown = true;
        },
    }
})

export const { setCharacterList, setCharacterListSearched, setLoading, setErrorUnknown } = charactersSlice.actions;

export const selectCharactersList = (state: RootState) => state.characters.charactersList;
export const selectCharactersListSearched = (state: RootState) => state.characters.characterListSearched;
export const selectLoading = (state: RootState) => state.characters.loading;
export const selectHasData = (state: RootState) => state.characters.hasData;
export const selectErrorUnknown = (state: RootState) => state.characters.errorUnknown;

export const getCharacterList = (): AppThunk => async (dispatch) => {
    try{
        const list = await getAllCharacters();
        dispatch(setCharacterList(list));
    }catch(e){
        dispatch(setErrorUnknown());
    }
}

export const searchCharacters = (searchValue: string): AppThunk => (
    dispatch, getState) => {
        const characters = getState().characters.charactersList.filter(
            character => Object.values(character).some(val => 
                val.toString().toLowerCase().includes(searchValue.toLowerCase())
            )
        );
        dispatch(setCharacterListSearched(characters));
}

export default charactersSlice.reducer;
