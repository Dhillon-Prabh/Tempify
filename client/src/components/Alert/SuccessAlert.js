import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './SuccessAlert.css'


function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (variant, autoHideDuration) => {
    enqueueSnackbar('Succesful login!', { variant, autoHideDuration });
  }

  return (
    <React.Fragment>
      {showAlert('success', 2000)}
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {

  return (
    <SnackbarProvider preventDuplicate={true}>
      <MyApp/>
    </SnackbarProvider>
  );
}