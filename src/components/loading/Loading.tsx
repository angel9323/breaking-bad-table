
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.scss';

const Loading = () => {
    return (
      <Box className={'loadingStyle'}>
        <CircularProgress />
      </Box>
    );
  }
  
export default Loading;
