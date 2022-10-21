import { useEffect, useMemo} from 'react';
import { selectCharactersList, selectErrorUnknown, getCharacterList } from '../../../redux/charactersSlice';
import Character from '../../../interfaces/Character'
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { getConfigColumnsCharacters } from '../../../util/dataGridHelper';
import { GridColDef } from '@mui/x-data-grid';

interface Row {
  id: number,
  name: string,
  birthday: string,
  status: string,
  nickname: string,
};

interface UseCharacterList {
  charactersInStore: Character[];
  errorUnknown: boolean;
  columns: GridColDef[];
  rows: Row[];
};

const useCharacterTable = (): UseCharacterList => {
    const dispatch = useAppDispatch();
    const errorUnknown = useAppSelector((state: any) => selectErrorUnknown(state));
    const charactersInStore = useAppSelector((state: any) => selectCharactersList(state));

    const { t } = useTranslation();
    const breakingBadCharacters = t('breakingBadCharacters');
    const nameColumn = t('name');
    const birthdayColumn = t('birthday');
    const occupationColumn = t('occupation');
    const statusColumn = t('status');
    const appearanceColumn = t('appearance');
    const nicknameColumn = t('nickname');
    const portrayedColumn = t('portrayed');

    
    const columns = useMemo(() => {
      const columnNames = [nameColumn, birthdayColumn, statusColumn, nicknameColumn];
      return getConfigColumnsCharacters(columnNames);
    }, [birthdayColumn, nameColumn, nicknameColumn, statusColumn]);

    const rows = useMemo<Row[]>(() => {
      return charactersInStore.map((character: Character, index: number) => {
        const row: Row = {
          id: index,
          name: character.name,
          birthday: character.birthday,
          status: character.status,
          nickname: character.nickname,
        }
        return row
      });
    }, [charactersInStore]);

    useEffect(() => {
      if(charactersInStore && charactersInStore.length === 0) {
        dispatch(getCharacterList());
      }
    }, [charactersInStore, dispatch]);

    const state = useMemo(() => ({ charactersInStore, errorUnknown,
      columns, rows}), 
    [charactersInStore, errorUnknown, columns, rows]);
    
  return { ...state };

}

export default useCharacterTable;
