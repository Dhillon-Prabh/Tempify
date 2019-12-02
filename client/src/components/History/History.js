import React, {Component} from 'react';
import MUIDatatable from "mui-datatables";
import SuccessAlert from '../Alert/SuccessAlert';

// Sets the columns of information to be displayed
const columns = [
    {name:"name", label:"Name", className:"column"},
    {name:"date", options: { sortDirection: 'desc' }, label:"Date", className:"column"},
    {name:"practice", label:"Practice", className:"column"},
    {name:"software", label:"Software", className:"column"},
    {name:"experience", label:"Experience", className:"column"},
    {name:"city", label:"City", className:"column"},
    {name:"status", label:"Expected Rate", className:"column"},
    {name:"bookingID", label:"Booking ID", className:"column"},
];

// Sets the state of columns to be displayed
const options = {
    selectableRows: false,
    search: true,
    print: false,
    download: false,
    filter: false,
 };

 /**
  * History component to view all 'completed' bookings/gigs 
  * for the offices. 
  * @author Joe Fong 
  * @author John Ham
  * @version 1.0 
  */
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: '',
            success: false
        }
    }

    /**
     * Initial render of the component. Calls for all the data
     * from the backend to be loaded and rendered onto the component right away.
     */
    componentDidMount() {
            // Uses local storage id to makee query to database
        var userId = localStorage.getItem('userId');
        var data = {
            userId: userId,
        }
        // POST request to database for populate table
        fetch("http://localhost:3001/getRecords", {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + this.props.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res =>  {
          return res.json();
        }).then(result => {
            
          var resultData = [];
          for (let i = 0; i < result.length; i++) {
              let tempName = result[i].temp_name;
              let practice = result[i].type_of_practice;
              let software = Array.from(JSON.parse(result[i].dental_software) + ' ');
              let experience = result[i].experience;
              let city = result[i].city;
              let expectedRate = "$" + result[i].expected_rate;
              let bookingID = result[i].reference_number;
              let date = result[i].dates

              let row = [];
              row.push(tempName);
              row.push(date);
              row.push(practice);
              row.push(software);
              row.push(experience);
              row.push(city);
              row.push(expectedRate);
              row.push(bookingID);
              resultData.push(row);
        }
          this.setState({data: resultData});
        }).catch(function(err) {
        });
    }
    render() {
        // Returns the history component which displays the information
        return (
            <React.Fragment>
                <MUIDatatable 
                    className="datatable"
                    title={"History"}
                    options={options}
                    columns={columns}
                    data={this.state.data}
                />
                {this.state.success ? <SuccessAlert type="acceptGig" /> : null}
            </React.Fragment>
        );
    }
}

export default History;
