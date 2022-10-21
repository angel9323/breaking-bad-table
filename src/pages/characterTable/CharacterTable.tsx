import { useTranslation } from "react-i18next";
import { useState } from 'react';
import useCharacterTable from './hooks/useCharacterTable';
import Loading from '../../components/loading';
import Searcher from '../../components/searcher';
import { Box,Typography, Button } from "@mui/material";
import './styles.scss';
import ToastError from '../../components/toastError';
import { DataGrid, GridSelectionModel  } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeCharacters } from '../../redux/charactersSlice';

const CharacterTable = () => {
    const { charactersInStore, errorUnknown, columns, rows} = useCharacterTable();
    const dispatch = useAppDispatch();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);

    const { t } = useTranslation();
    const breakingBadCharacters = t('breakingBadCharacters');
    const removeLabel = t('remove');

    const onClickRemoveButton = () => {
      const rowsSeleted = charactersInStore.filter(char => selectedRows.includes(char.char_id));
      const newCharacterList = charactersInStore.filter(char => !selectedRows.includes(char.char_id));
      dispatch(removeCharacters(rowsSeleted, newCharacterList));
    }

    if (charactersInStore && charactersInStore.length === 0 ){
        return <Loading />
    }

    return (
      <Box>
        <ToastError error={errorUnknown} />
        <Typography sx={{ textTransform: 'uppercase', color: '#ae8c34', marginLeft: '1%' }} 
        variant="h3" component="div" gutterBottom={true} >
          {breakingBadCharacters}
        </Typography>
        <Box className="actionBar">
          <Searcher />
          <Button disabled={selectedRows.length === 0} variant="outlined" color="error"onClick={onClickRemoveButton}>
            {removeLabel}
          </Button>
        </Box>
        <Box sx={{ height: 632, width: "100%",}}>
          <DataGrid
            className="dataGrid"
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedRows(newSelectionModel);
            }}
            selectionModel={selectedRows}
          />
        </Box>
      </Box>
    );
  }
  
  export default CharacterTable;
