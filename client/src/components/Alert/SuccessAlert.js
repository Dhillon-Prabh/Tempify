import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './SuccessAlert.css'

//
//
// This is an alert component
// It is used to display a successful interaction by the user
// This includes registration success, login success, e-mail success, profile udpate success, posting success
//
//

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (variant, autoHideDuration) => {

    // Conditions for displaying success alert
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

// Component to be nexted into other components that requires success alert functino
export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider preventDuplicate={true}>
      <MyApp type={props.type}/>
    </SnackbarProvider>
  );
}