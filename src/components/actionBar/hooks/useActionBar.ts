import { useCallback, useState} from 'react';
import Character from '../../../interfaces/Character';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { searchCharacters, selectCharactersListRemoved, setAddCharacter } from '../../../redux/charactersSlice';
import { removeCharacters } from '../../../redux/charactersSlice';
import { GridSelectionModel  } from '@mui/x-data-grid';

interface UseActionBarProps {
    characterList: Character[];
    selectedRows: GridSelectionModel;
};

const useActionBar = ({characterList, selectedRows}: UseActionBarProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const charactersRemoved = useAppSelector((state: any) => selectCharactersListRemoved(state));

    const onChangeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchCharacters(event.target.value));
    }, [dispatch])

    const onClickRemoveButton = useCallback(() => {
        setOpen(true);
      }, [])

    const onClickAcceptModal = useCallback(() => {
        const rowsSeleted = characterList.filter(char => selectedRows.includes(char.char_id));
        const newCharacterList = characterList.filter(char => !selectedRows.includes(char.char_id));
        dispatch(removeCharacters(rowsSeleted, newCharacterList));
        setOpen(false);
    }, [characterList, dispatch, selectedRows])

    const onClickAdd = useCallback(() => {
      setOpenAddModal(true);
    }, [])

    const onClickCharacter = useCallback((character: Character) => {
      dispatch(setAddCharacter(character));
      setOpenAddModal(false);
    }, [])
    
  return { charactersRemoved, onChangeValue, onClickRemoveButton, 
    onClickAcceptModal, open, setOpen, openAddModal, setOpenAddModal, onClickAdd,
    onClickCharacter };

}

export default useActionBar;
