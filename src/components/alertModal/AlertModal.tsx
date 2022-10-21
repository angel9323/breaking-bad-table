
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from "react-i18next";

interface AlertModalProps {
    onClickAcceptModal: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AlertModal = ({onClickAcceptModal, open, setOpen}: AlertModalProps) => {
    const { t } = useTranslation();
    const titleModalLabel = t('removeModalTitle');
    const bodyModalLabel = t('removeModalBody');
    const acceptLabel = t('accept');
    const cancelLabel = t('cancel');

    const handleClose = () => {
        setOpen(false);
      };

    return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleModalLabel}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bodyModalLabel}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelLabel}</Button>
          <Button onClick={onClickAcceptModal} autoFocus>
            {acceptLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
export default AlertModal;
