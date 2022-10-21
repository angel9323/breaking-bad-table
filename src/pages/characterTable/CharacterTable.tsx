import { useTranslation } from "react-i18next";
import { useState } from 'react';
import useCharacterTable from './hooks/useCharacterTable';
import Loading from '../../components/loading';
import { Box,Typography } from "@mui/material";
import './styles.scss';
import ToastError from '../../components/toastError';
import ActionBar from '../../components/actionBar';
import { DataGrid, GridSelectionModel  } from '@mui/x-data-grid';
import AlertModal from '../../components/alertModal';

const CharacterTable = () => {
    const { characterList, errorUnknown, hasData, columns, rows} = useCharacterTable();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);

    const { t } = useTranslation();
    const breakingBadCharacters = t('breakingBadCharacters');

    if (!hasData){
        return <Loading />
    }

    return (
      <Box>
        <ToastError error={errorUnknown} />
        {/* <AlertModal /> */}
        <Typography sx={{ textTransform: 'uppercase', color: '#ae8c34', marginLeft: '30%', marginTop: '1%' }} 
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
