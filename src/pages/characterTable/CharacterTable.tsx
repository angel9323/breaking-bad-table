import { useTranslation } from "react-i18next";
import { useState } from 'react';
import useCharacterTable from './hooks/useCharacterTable';
import Loading from '../../components/loading';
import { Box,Typography } from "@mui/material";
import './styles.scss';
import ToastError from '../../components/toastError';
import ActionBar from '../../components/actionBar';
import { DataGrid, GridSelectionModel  } from '@mui/x-data-grid';
import Row from "../../interfaces/Row";
import CardModal from './components/cardModal'
import ModalProps from '../../interfaces/ModalProps';

const CharacterTable = () => {
    const { characterList, errorUnknown, hasData, columns, rows} = useCharacterTable();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [modalProps, setModalProps] = useState<ModalProps>({open: false, character: undefined});
    const { t } = useTranslation();
    const breakingBadCharacters = t('breakingBad');

    if (!hasData){
        return <Loading />
    }

    const handleOnRowClick = (row: Row) => {
      console.log(row);
      const characterSelected = characterList.find(char => char.char_id === row.id)
      setModalProps({open: true, character: characterSelected });
    }

    return (
      <Box>
        <ToastError error={errorUnknown} />
        <CardModal modalProps={modalProps} setModalProps={setModalProps} />
        <Typography sx={{ textTransform: 'uppercase', color: '#ae8c34', marginLeft: '40%', marginTop: '1%' }} 
        variant="h3" component="div" gutterBottom={true} >
          {breakingBadCharacters}
        </Typography>
        <ActionBar characterList={characterList} selectedRows={selectedRows} />
        <Box sx={{ height: 632, width: "100%",}}>
          <DataGrid
            className="dataGrid"
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedRows(newSelectionModel);
            }}
            selectionModel={selectedRows}
            onRowClick={(selected) => handleOnRowClick(selected.row)}
          />
        </Box>
      </Box>
    );
  }
  
  export default CharacterTable;
