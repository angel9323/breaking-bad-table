
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Character from '../../interfaces/Character';
import { GridSelectionModel  } from '@mui/x-data-grid';
import useActionBar from './hooks/useActionBar';
import AlertModal from '../alertModal'
import './styles.scss';

interface ActionBarProps {
    characterList: Character[];
    selectedRows: GridSelectionModel;
}

const ActionBar = ({characterList, selectedRows}: ActionBarProps) => {
    const { onChangeValue, onClickRemoveButton, onClickAcceptModal, open, setOpen } = useActionBar({characterList, selectedRows});

    const { t } = useTranslation();
    const searchLabel = t('search');
    const removeLabel = t('remove');

    return (
    <Box>
    <AlertModal onClickAcceptModal={onClickAcceptModal} open={open} setOpen={setOpen} />
    <Box className="actionBar">
        <TextField sx={{ width: "30%" }} label={searchLabel} onChange={onChangeValue} />
        <Button disabled={selectedRows.length === 0} variant="outlined" color="error"onClick={onClickRemoveButton}>
          {removeLabel}
        </Button>
      </Box>
      </Box>
    );
  }
  
export default ActionBar;
