import TextField from '@mui/material/TextField';
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
        <TextField sx={{ width: "30%" }} label={searchLabel} onChange={onChangeValue} />
    );
  }
  
export default Searcher;
