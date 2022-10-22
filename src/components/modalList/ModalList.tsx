
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Character from '../../interfaces/Character';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import './styles.scss';

interface ModalListProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    characters: Character[];
    onClickCharacter: (character: Character) => void;
}

const ModalList = ({open, setOpen, characters, onClickCharacter}: ModalListProps) => {
    const handleClose = () => setOpen(false);
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
        >
            <Fade in={open}>
            <Box className='modalList'>
                {characters.map((character, index) => {
                    return (
                    <ListItem key={index} data-testid='listItem' className="listItemStyle" onClick={() => onClickCharacter(character)} >
                        <Avatar data-testid='avatar'  src={character.img} />
                        <ListItemText data-testid='listItemText' sx={{marginLeft: 4}} primary={character.name}/>
                    </ListItem>
                  )
                })}
            </Box>
            </Fade>
        </Modal>
    );
  }
  
export default ModalList;
