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
                    <Card className='cardStyle' sx={{ width: 500}}>
                        <CardFields character={modalProps.character} />
                    </Card>
                }
            </Box>
            </Fade>
        </Modal>
    );
}
  
export default CardModal;
