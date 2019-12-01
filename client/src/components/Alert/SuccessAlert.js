import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

/**
 * @author Prabhdeep Singh
 * @param props 
 */

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
        break;
      case 'paymentSuccess':
        enqueueSnackbar('Payment Success! Thank you.', { variant, autoHideDuration });
        break;
      case 'registerOffice':
        enqueueSnackbar('Account registered successfully! Please login to continue.', { variant, autoHideDuration });
        break;
      case 'registerTemp':
        enqueueSnackbar('Account registered successfully! An email will be sent shortly with more details.', { variant, autoHideDuration });
        break;
      case 'addTime':
        enqueueSnackbar('Your work hours have been submitted! An email has been sent to the dental office.', { variant, autoHideDuration });
        break;
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