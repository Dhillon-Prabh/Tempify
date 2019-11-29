import React, {Component} from 'react';
import MUIDatatable from "mui-datatables";
import Button from '@material-ui/core/Button'
import {format} from 'date-fns';
import parseISO from 'date-fns/parseISO';
import SuccessAlert from '../Alert/SuccessAlert';
// import './JobPosting.css'

const columns = [
    {name:"office", label:"Dental Office", className:"column"},
    {name:"address", label:"Office Address", className:"column"},
    {name:"phone", label:"Phone Number", className:"column"},
    {name:"email", label:"Email Address", className:"column"},
    {name:"parking", label:"Parking Option", className:"column"},
    {name:"bookingDate", label:"Booking Date", className:"column"},
    {name:"bookingID", label:"Booking ID", className:"column"},
    {name:"status", label:"Status", className:"column"}
];

const options = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    filter: false,
 };

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: '',
            success: false
        }
    }

    componentDidMount() {

        console.log(this.props.token);

        fetch("http://localhost:3001/getRecords", {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + this.props.token,
            }
        }).then(res =>  {
          return res.json();
        }).then(result => {

          var resultData = [];
          for (let i = 0; i < result.length; i++) {
              let office = result[i].office_name;
              let address = result[i].unit_number + " " + result[i].street_name + " " + result[i].city + " " + result[i].province + " " + result[i].postalcode;
              let phoneNumber = result[i].phone_number;
              let email = result[i].email;
              let parkingOption = result[i].parking_options;
              let bookingDate = result[i].dates;
              let bookingID = result[i].reference_number;
              let status = result[i].temp_status; 

              let row = [];
              row.push(office);
              row.push(address);
              row.push(phoneNumber);
              row.push(email);
              row.push(parkingOption);
              row.push(bookingDate);
              row.push(bookingID);
              row.push(status);
              resultData.push(row);
        }
          this.setState({data: resultData});
        }).catch(function(err) {
          console.log(err);
        });
    }
    render() {
        return (
            <React.Fragment>
                <MUIDatatable 
                    className="datatable"
                    title={"Records"}
                    options={options}
                    columns={columns}
                    data={this.state.data}
                />
                {this.state.success ? <SuccessAlert type="acceptGig" /> : null}
            </React.Fragment>

        );
    }
}

export default Records;
