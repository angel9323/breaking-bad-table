
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Character from '../../interfaces/Character';
import { GridSelectionModel  } from '@mui/x-data-grid';
import useActionBar from './hooks/useActionBar';
import AlertModal from '../alertModal'
import './styles.scss';
import ModalList from '../modalList';

interface ActionBarProps {
    characterList: Character[];
    selectedRows: GridSelectionModel;
}

const ActionBar = ({characterList, selectedRows}: ActionBarProps) => {
    const { charactersRemoved, onChangeValue, onClickRemoveButton, onClickAcceptModal,
      open, setOpen, openAddModal, setOpenAddModal, onClickAdd, onClickCharacter } = useActionBar({characterList, selectedRows});

    const { t } = useTranslation();
    const searchLabel = t('search');
    const removeLabel = t('remove');
    const addLabel = t('add');

    return (
    <Box>
    <AlertModal onClickAcceptModal={onClickAcceptModal} open={open} setOpen={setOpen} />
    <ModalList open={openAddModal} setOpen={setOpenAddModal} characters={charactersRemoved} onClickCharacter={onClickCharacter} />
    <Box className="actionBar">
        <TextField sx={{ width: "30%" }} label={searchLabel} onChange={onChangeValue} />
        <Box className="buttonBox">
          <Button className="addButton" disabled={charactersRemoved.length === 0} variant="outlined" onClick={onClickAdd}>
            {addLabel}
          </Button>
          <Button className="removeButton" disabled={selectedRows.length === 0} variant="outlined" color="error"onClick={onClickRemoveButton}>
            {removeLabel}
          </Button>
        </Box>
      </Box>
      </Box>
    );
  }
  
export default ActionBar;
