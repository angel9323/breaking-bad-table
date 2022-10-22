import { useEffect, useMemo} from 'react';
import { selectCharactersList, selectErrorUnknown, selectCharactersListSearched, getCharacterList, selectHasData } from '../../../redux/charactersSlice';
import Character from '../../../interfaces/Character';
import Row from '../../../interfaces/Row';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { getConfigColumnsCharacters } from '../../../util/dataGridHelper';
import { GridColDef } from '@mui/x-data-grid';

interface UseCharacterList {
  characterList: Character[];
  errorUnknown: boolean;
  columns: GridColDef[];
  rows: Row[];
  hasData: boolean;
};

const useCharacterTable = (): UseCharacterList => {
    const dispatch = useAppDispatch();
    const errorUnknown = useAppSelector((state: any) => selectErrorUnknown(state));
    const characterList = useAppSelector((state: any) => selectCharactersList(state));
    const charactersSearched = useAppSelector((state: any) => selectCharactersListSearched(state));
    const hasData = useAppSelector((state: any) => selectHasData(state));

    const { t } = useTranslation();
    const nameColumn = t('name');
    const birthdayColumn = t('birthday');
    const statusColumn = t('status');
    const nicknameColumn = t('nickname');
    const descriptionColumn = t('description');
    
    const columns = useMemo(() => {
      const columnNames = [nameColumn, birthdayColumn, statusColumn, nicknameColumn, descriptionColumn];
      return getConfigColumnsCharacters(columnNames);
    }, [birthdayColumn, nameColumn, nicknameColumn, statusColumn, descriptionColumn]);

    const rows = useMemo<Row[]>(() => {
      const list = charactersSearched.length > 0 ? charactersSearched : characterList
      return list.map((character: Character, index: number) => {
        const row: Row = {
          id: character.char_id,
          name: character.name,
          birthday: character.birthday,
          status: character.status,
          nickname: character.nickname,
          description: character.description ? character.description : '',
        }
        return row
      });
    }, [characterList, charactersSearched]);

    useEffect(() => {
      if(!hasData) {
        dispatch(getCharacterList());
      }
    }, [dispatch, hasData]);
    
  return { characterList, errorUnknown, hasData,
    columns, rows} ;

}

export default useCharacterTable;
