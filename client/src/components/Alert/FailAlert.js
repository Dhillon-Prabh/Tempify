import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

/**
 * Displays a fail snackbar in the bottom left corner. 
 * Snackbar is displayed for two seconds.
 * Purpose of the snackbar should be passed in the component as a type.
 * 
 * @author John Ham
 * @version 1.0
 */

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  // Changes the text displayed in the snackbar based on the type.
  const showAlert = (variant, autoHideDuration) => {
    switch (props.type) {
    case 'paymentFail':
      enqueueSnackbar('Uh oh! A problem occurred. Please try payment again.', { variant, autoHideDuration });
      break;
    case 'register':
      enqueueSnackbar('Uh oh! A problem occurred while creating your account. Please try again.', { variant, autoHideDuration });
      break;
    case 'profileUpdate':
      enqueueSnackbar('Uh oh! A problem occurred while updating your profile. Please try again.', { variant, autoHideDuration });
      break;
    case 'acceptGig':
      enqueueSnackbar('Uh oh! A problem occurred while accepting this job. Please try again.', { variant, autoHideDuration });
      break;
    case 'addTime':
      enqueueSnackbar('Uh oh! A problem occurred while submitting your work hours. Please try again.', { variant, autoHideDuration });
      break;
    default:
      break;
    }
  }

  return (
    <React.Fragment>
      {showAlert('error', 2000)}
    </React.Fragment>
  )
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider preventDuplicate={true}>
      <MyApp type={props.type}/>
    </SnackbarProvider>
  );
}