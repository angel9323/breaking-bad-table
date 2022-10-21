import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { searchCharacters } from '../../redux/charactersSlice';
import { useAppDispatch } from '../../redux/store';
import { useTranslation } from "react-i18next";

const Searcher = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const searchLabel = t('search');

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchCharacters(event.target.value));
    }

    return (
      <Box>
        <TextField label={searchLabel} onChange={onChangeValue} />
      </Box>
    );
  }
  
export default Searcher;
