import { Alert, Snackbar } from '@mui/material';
import './styles.scss';
import { useTranslation } from "react-i18next";

interface ToastErrorProps {
    error: boolean
}

const ToastError = ({error}: ToastErrorProps) => {
    const { t } = useTranslation();
    const errorLabel = t('error');

  return (
    <Snackbar data-testid='snackbar' className={'snackbar'} open={error} autoHideDuration={10000}>
      <Alert data-testid='alert' severity={'error'}>{errorLabel}</Alert>
    </Snackbar>
  );
};

export default ToastError;
