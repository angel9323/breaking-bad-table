import { useTranslation } from "react-i18next";
import useCharacterTable from './hooks/useCharacterTable';
import Loading from '../../components/loading';
import { Box,Typography } from "@mui/material";
import './styles.scss';
import ToastError from '../../components/toastError';
import { DataGrid } from '@mui/x-data-grid';

const CharacterTable = () => {
  const { charactersInStore, errorUnknown, columns, rows} = useCharacterTable();
  
    const { t } = useTranslation();
    const breakingBadCharacters = t('breakingBadCharacters');

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
        <Box sx={{ height: 635, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </Box>
      </Box>
    );
  }
  
  export default CharacterTable;
