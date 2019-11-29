import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './SuccessAlert.css'


function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (variant, autoHideDuration) => {
    switch (props.type) {
      case 'login':
        enqueueSnackbar('Succesful login!', { variant, autoHideDuration });
        break;
      case 'postGig':
        enqueueSnackbar('Job posted successfully!', { variant, autoHideDuration });
        break;
      case 'acceptGig':
        enqueueSnackbar('Job accepted successfully!', { variant, autoHideDuration });
        break;
      case 'contact':
        enqueueSnackbar('Message sent!', { variant, autoHideDuration});
        break;
      case 'profileUpdate':
        enqueueSnackbar('Profile updated successfully!', {variant, autoHideDuration});
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {showAlert('success', 2000)}
    </React.Fragment>
  );
}

export default function IntegrationNotistack(props) {

  return (
    <SnackbarProvider preventDuplicate={true}>
      <MyApp type={props.type}/>
    </SnackbarProvider>
  );
}