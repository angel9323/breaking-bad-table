import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardFields from '../cardFields';
import ModalProps from '../../../../interfaces/ModalProps';
import './styles.scss';


interface CardModalProps {
    modalProps: ModalProps;
    setModalProps: (values: ModalProps) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CardModal = ({ modalProps, setModalProps }: CardModalProps) => {
    const handleClose = () => setModalProps({open: false, character: undefined});
    const openModal = modalProps.open;
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleClose}
        >
            <Fade in={openModal}>
            <Box className='cardModal'>
                {modalProps.character && 
                    <Card className='cardStyle' sx={{ maxWidth: 400, minWidth: 300 }}>
                        <CardFields character={modalProps.character} />
                    </Card>
                }
            </Box>
            </Fade>
        </Modal>
    );
}
  
export default CardModal;
