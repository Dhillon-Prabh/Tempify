import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';


function MyApp(props) {
    const { enqueueSnackbar } = useSnackbar();

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