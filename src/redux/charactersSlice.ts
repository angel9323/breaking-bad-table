import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from '../interfaces/Character';
import { AppThunk } from "./store";
import { getAllCharacters } from '../services/api';
import type { RootState } from './store';

interface CharactersSliceProps {
    charactersList: Character[];
    characterListSearched: Character[];
    characterListRemoved: Character[];
    loading: boolean;
    hasData: boolean;
    errorUnknown: boolean;
}


const initialState: CharactersSliceProps = {
    charactersList: [],
    characterListSearched: [],
    characterListRemoved: [],
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
        setCharacterListRemoved: (state, action: PayloadAction<{charactersRemoved: Character[], newCharacterList: Character[]}>) => {
            state.characterListRemoved = [...state.characterListRemoved, ...action.payload.charactersRemoved];
            state.charactersList = [...action.payload.newCharacterList];
        },
        setAddCharacter: (state, action: PayloadAction<Character>) => {
            state.charactersList = [action.payload, ...state.charactersList];
            state.characterListRemoved = state.characterListRemoved.filter(char => char.char_id !== action.payload.char_id);
        },
        removeFromListSearched: (state, action: PayloadAction<Character[]>) => {
            state.characterListSearched = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setErrorUnknown: (state) => {
            state.errorUnknown = true;
        },
        updateCharacter: (state, action: PayloadAction<{character: Character, newDescription: string}>) => {
            state.charactersList =  [...state.charactersList.map(char => {
                if(char.char_id === action.payload.character.char_id) {
                    return { 
                        ...action.payload.character,
                        description: action.payload.newDescription
                    }
                }
                return char;
            })]
        },
    }
})

export const { setCharacterList, setCharacterListSearched, setCharacterListRemoved, setAddCharacter,
    removeFromListSearched, setLoading, setErrorUnknown, updateCharacter } = charactersSlice.actions;

export const selectCharactersList = (state: RootState) => state.characters.charactersList;
export const selectCharactersListSearched = (state: RootState) => state.characters.characterListSearched;
export const selectCharactersListRemoved = (state: RootState) => state.characters.characterListRemoved;
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

export const removeCharacters = (charactersRemoved: Character[], newCharacterList: Character[]): AppThunk => (
    dispatch, getState) => {
        dispatch(setCharacterListRemoved({charactersRemoved, newCharacterList}));
        if ( getState().characters.characterListSearched.length > 0 ) {
            const newListSearched = getState().characters.characterListSearched.filter(char => !charactersRemoved.includes(char));
            dispatch(removeFromListSearched(newListSearched));
        }
}

// export const addCharacter = (character: Character): AppThunk => (
//     dispatch, getState) => {
//         dispatch(setCharacterListRemoved({charactersRemoved, newCharacterList}));
//         if ( getState().characters.characterListSearched.length > 0 ) {
//             const newListSearched = getState().characters.characterListSearched.filter(char => !charactersRemoved.includes(char));
//             dispatch(removeFromListSearched(newListSearched));
//         }
// }

export default charactersSlice.reducer;
