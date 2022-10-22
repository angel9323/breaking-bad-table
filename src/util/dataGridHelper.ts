import { GridColDef } from '@mui/x-data-grid';

export const getConfigColumnsCharacters = (columnNames: string[]) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: columnNames[0], flex: 0.5, },
        { field: 'birthday', headerName: columnNames[1], flex: 0.5, },
        { field: 'status', headerName: columnNames[2], flex: 0.5, },
        { field: 'nickname', headerName: columnNames[3], flex: 0.5, },
        { field: 'description', headerName: columnNames[4], flex: 0.5, editable: false },
      ];

      return columns;
}
