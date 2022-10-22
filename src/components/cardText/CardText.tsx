import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.scss';

interface CardTextProps {
    label: string,
    labelValue: string
}


const CardText = ({label, labelValue}: CardTextProps)  => {
    return (
    <Box className="boxStyle">
        <Typography className="boxStyle" variant="h6" component="div">
            <div>{label}:</div> 
            <div className="labelValueStyle">{labelValue}</div>
        </Typography>
    </Box>
    )
}

export default CardText;
