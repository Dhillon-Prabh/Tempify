import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';


function PayAlert(props) {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (variant, autoHideDuration) => {
    switch (props.type) {
      case 'fail':
        enqueueSnackbar('Uh oh! A problem occurred. Please try payment again.', { variant, autoHideDuration });
        break;
      case 'success':
        enqueueSnackbar('Payment Success! Thank you.', { variant, autoHideDuration });
        break;
      default:
        break;
    }
  }
  
    if (props.type === 'success') {
        return (
            <React.Fragment>
                {showAlert('success', 2000)}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {showAlert('error', 2000)}
            </React.Fragment>
        )
    }
}

export default function IntegrationNotistack(props) {

  return (
    <SnackbarProvider preventDuplicate={true}>
      <PayAlert type={props.type}/>
    </SnackbarProvider>
  );
}