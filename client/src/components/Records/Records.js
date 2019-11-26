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
    {name:"action", label:"Action", className:"column"},
    {name:"joeco", label:"joeco", className:"column"}
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

    // handleClick(acceptData) {
    //     var self = this;
    //     const userId = localStorage.getItem('userId');
    //     var data = {
    //         userId: userId,
    //         gigId: acceptData[0].id,
    //         acceptData: acceptData[0]
    //       }
    //     console.log(data); 
    //     fetch("http://localhost:3001/acceptGig", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //     }).then(function(response) {
    //         console.log(response);
    //         return response;
    //     }).then(function(data) {
    //         console.log(data);
    //         if (data.status == 300) {
    //             console.log("Success");
    //             self.setState({success: true});
    //             self.props.history.push("/tempdashboard");
    //         }
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    //     this.forceUpdate();
    // }

    componentDidMount() {
        // var self = this;
        // fetch("http://localhost:3001/jobPosting", {
        //   method: 'GET'
        // }).then(res =>  {
        //   return res.json();
        // }).then(result => {
        //   console.log(result);
        //   var resultData = [];
        //   for (var i = 0; i < result.length; i++) {
        //       result[i].date = format(parseISO(result[i].date), 'yyyy-MM-dd');
        //       var office = result[i].office_name;
        //       var details = result[i].designation + "\n" + result[i].date + "\n" + result[i].time;
        //       var address = result[i].unit_number + ", " + result[i].street_number + " " + result[i].street_name + ", " 
        //                     + result[i].city + "\n" + "Parking: " + result[i].parking_options
        //       var action = <Button className="select" onClick={self.handleClick.bind(self,[result[i]])}>Select</Button>;
        //       var row = [];
        //       row.push(office);
        //       row.push(details);
        //       row.push(address);
        //       row.push(action);

        //       resultData.push(row);
        //   }
        //   self.setState({data: resultData});
        //   console.log(result);
        // }).catch(function(err) {
        //   console.log(err);
        // });
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
