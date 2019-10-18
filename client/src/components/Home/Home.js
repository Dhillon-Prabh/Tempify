import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCheckCircle, faSmile } from "@fortawesome/free-regular-svg-icons";
import Banner from '../Banner/Banner'
import BlueButton from '../Buttons/BlueButton'
import ClearButton from '../Buttons/ClearButton'

import bank from '../../images/bank.png'
import tax from '../../images/tax.png'
import research from '../../images/research.png'
import bill from '../../images/bill.png'
import insurance from '../../images/insurance.png'
import calendar from '../../images/calendar.png'
import dollar from '../../images/US Dollar_48px_1.png'
import thumbUp from '../../images/Thumb Up_48px.png'
import free from '../../images/free.png'
import ok from '../../images/Ok_48px_1.png'
import marker from '../../images/Marker_48px.png'
import userImage from '../../images/User_48px.png'
import network from '../../images/network.png'

import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Banner />
                <Block1/>
                <Block2/>
                <Block3/>
                <Block4/>
            </div>
        )
    }
}

class Block1 extends React.Component {
    render() {
        return (
            <Grid container direction="column" align='center' className="test">
                <Typography align='center' className='header1'>
                    Why Choose Tempify?
                </Typography>
                <Typography align='center' className='blueText header2' variant='h2'>
                    WE HANDLE THE ENTIRE PAYMENT PROCESS!
                </Typography>
                <Grid container direction='row' justify='center' className='columns blockRow'>
                    <Grid item direction='column' justify='center' className='block1Column'>
                        <Typography className='block1ColumnTitle'>
                            DENTAL PROFESSIONALS
                        </Typography>
                        <Row img={bank} content="Get Direct Deposit bi-weekly."/>
                        <Row img={tax} content="Collect only ONE T4 at the end of the year."/>
                        <Row img={research} content="Keep track of all your payment records in one place."/>
                    </Grid>
                    <Grid item direction='column' className='block1Column'>
                        <Typography className='block1ColumnTitle'>
                            DENTAL OFFICES
                        </Typography>
                        <Row img={bill} content="We handle the entire payroll process for you!"/>
                        <Row img={tax} content="We provide ALL our Dental Professionals with T4s"/>
                        <Row img={insurance} content="We cover CPP and El contributions!"/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const Row = (props) => {
    return (
        <Grid container alignItems='center' align='left' direction='row'>
            <img src={props.img} className="img" alt=""/>
            <Typography className="block1Text">
                {props.content}
            </Typography>
        </Grid>
    );
}


class Block2 extends React.Component {
    render() {
        return (
            <Grid container direction="column" align='center' className='blueBlock'>
                <Typography className='header1'>
                    How it Works
                </Typography>
                <Typography className='header2'>
                    4 SIMPLE STEPS TO BOOK YOUR NEXT DENTAL PROFESSIONAL
                </Typography>
                <Grid container direction='row' className='columns blockRow'>
                    <Grid item direction='column' className='block2Column'>
                        <Typography align='center' className='columnTitle'>
                            STEP 1
                        </Typography>
                        <Col icon={faClock} content="Select the time and date you wish to have a dental professional at your office"/>
                    </Grid>
                    <Grid item direction='column' className='block2Column'>
                        <Typography align='center' className='columnTitle'>
                            STEP 2
                        </Typography>
                        <Col icon={faUsers} content="Browse through the profiles and find the right person for your office"/>
                    </Grid>
                    <Grid item justify='center' direction='column' className='block2Column'>
                        <Typography align='center' className='columnTitle'>
                            STEP 3
                        </Typography>
                        <Col icon={faCheckCircle} content="Confirmation will be made after the dental professional accepts the request"/>
                    </Grid>
                    <Grid item justify='center' direction='column' className='block2Column'>
                        <Typography align='center' className='columnTitle'>
                            STEP 4
                        </Typography>
                        <Col icon={faSmile} content="Enjoy the satisfaction of knowing your patients are taken care of by our qualified dental professionals"/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const Col = (props) => {
    return (
        <Grid align='center'>
            <FontAwesomeIcon icon={props.icon} className="fIcons"/>
            <Typography className='verticalAlign'>
                {props.content}
            </Typography>
        </Grid>
    );
}

class Block3 extends React.Component {
    render() {
        return (
            <Grid container direction="column" justify='center' align='center' className='box3'>
                <Typography align='center' className='header1'>
                    Dental Professionals
                </Typography>
                <Grid container direction='row' justify='center' className='blockRow'>
                    <Col2 image={calendar} title='SCHEDULE' content='You determine how much you want to work'/>
                    <Col2 image={dollar} title='INCOME' content='Supplement your income when you need to'/>
                    <Col2 image={thumbUp} title='GET HIRED' content='Work in different settings until you find the right fit'/>
                    <Col2 image={free} title="IT'S FREE" content="It's always free for all Dental Professionals"/>
                </Grid>
                <Container>
                    <BlueButton/>
                </Container>
            </Grid>
        );
    }
}

class Block4 extends React.Component {
    render() {
        return (
            <Grid container direction="column" justify='center' align='center' className='box3 blueBlock'>
                <Typography align='center' className='header1'>
                    More Reasons to Choose Tempify
                </Typography>
                <Grid container direction='row' className='blockRow'>
                    <Col3 image={ok} title='FIND THE RIGHT MATCH' content='Our dental professionals have a profile so you can find the right match'/>
                    <Col3 image={dollar} title='COMPETITIVE PRICING' content='We offer competitive rates for all our dental professionals'/>
                    <Col3 image={thumbUp} title='QUICK, SIMPLE, EASY' content='We made the process simple, with a few clicks you can find the perfect fit for your office'/>
                </Grid>
                <Grid container direction='row' className='blockRow'>
                    <Col3 image={marker} title='LOCATION, LOCATION, LOCATION' content='Our dental professionals are located throughout the Lower Mainland to reduce travel time to your office'/>
                    <Col3 image={userImage} title='A PICTURE IS WORTH A THOUSAND WORDS' content='Take a look at the display pictures so you have the comfort of knowing who is coming to your office'/>
                    <Col3 image={network} title='HIRE YOUR NEXT TEAM MEMBER' content='Like what you see? Let us know and we will make arrangements for you'/>
                </Grid>
                <Container>
                    <BlueButton/>
                </Container>
            </Grid>
        );
    }
}

const Col2 = (props) => {
    return (
        <Grid item justify='center' direction='column' align='center' className='block3Column'>
            <img src={props.image} className="img2" alt=""/>
            <Typography align='center'>
                {props.title}
            </Typography>
            <Typography align='center'>
                {props.content}
            </Typography>
        </Grid>
    );
}

const Col3 = (props) => {
    return (
        <Grid item justify='center' direction='column' align='center' className='block4Column'>
            <img src={props.image} className="img2" alt=""/>
            <Typography align='center'>
                {props.title}
            </Typography>
            <Typography align='center'>
                {props.content}
            </Typography>
        </Grid>
    );
}

export default Home;