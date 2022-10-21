
import i18n from '../../i18n';
import './styles.scss';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import { selectLoading } from '../../redux/charactersSlice';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../redux/store';

const LanguagesButtons = () => {
  const { t } = useTranslation();
  const loading = useAppSelector((state: any) => selectLoading(state));

  const spanish = t('spanish');
  const english = t('english');

    const handleOnclick= (e: any) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
      }

    if (loading) {
      return null
    }

    return (
    <Box className="buttons-div">
        <Button data-testid='test' value='es' onClick={handleOnclick}>
          {spanish}
        </Button>
        <Button value='en' onClick={handleOnclick}>
          {english}
        </Button>
     </Box>
    );
  }
  
  export default LanguagesButtons;
  