import React from "react";
import MUIDatatable from "mui-datatables";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import SuccessAlert from "../Alert/SuccessAlert";
import FailAlert from "../Alert/FailAlert";
import "./JobPosting.css";

/**
 * This component shows the temps all the job postings and they can select the one they want.
 * @author Prabhdeep Singh
 */

/**
* Columns for the datatable of job postings
*/
const columns = [
  { name: "office", label: "Dental Office", className: "column" },
  { name: "details", options: { sortDirection: 'asc' },  label: "Details", className: "column" },
  { name: "address", label: "Office Address", className: "column" },
  { name: "action", label: "Action", className: "column" }
];

/**
 * Options that edit the datatable
 */
const options = {
  selectableRows: false,
  search: true,
  print: false,
  download: false,
  filter: false
};

/**
 * JobPostings class component for showing/accepting jobs.
 * @author Prabhdeep Singh
 */
class JobPosting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: '',
            setSuccessOpen: false,
            setFailOpen: false
        }
    }

    /**
     * This is where the selection of a job is handled
     * @param acceptData the data associated with the job that was accepted
     */
    handleClick(acceptData) {
        var self = this;
        const userId = localStorage.getItem('userId'); //grabs from the localstorage
        var data = {
            userId: userId,
            gigId: acceptData[0].id,
            acceptData: acceptData[0]
          }
        fetch("http://localhost:3001/acceptGig", {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status == 401) { //error
              self.setState({ setFailOpen: true });
              self.props.history.push("/tempdashboard");
            }
            return response;
        }).then(function(data) {
            if (data.status == 300) { //success
                console.log("Success");
                self.setState({setSuccessOpen: true});
                self.props.history.push("/tempdashboard");
            }
        }).catch(function(err) {
            console.log(err);
        });
        this.forceUpdate();
    }

    /**
     * fetches the job postings to show.
     * These job postings are unique for the role.
     */
    componentDidMount() {
        var self = this;
        fetch("http://localhost:3001/jobPosting", {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.props.token,
          }
        }).then(res =>  {
          return res.json();
        }).then(result => {
          var resultData = [];
          for (var i = 0; i < result.length; i++) {
              result[i].date = format(parseISO(result[i].date), 'yyyy-MM-dd');
              var office = result[i].office_name;
              var details = result[i].date + "\n" + result[i].designation + "\n" + result[i].time;
              var address = result[i].unit_number + ", " + result[i].street_number + " " + result[i].street_name + ", " 
                            + result[i].city + "\n" + "Parking: " + result[i].parking_options
              var action = <Button className="select" onClick={self.handleClick.bind(self,[result[i]])}>Select</Button>;
              var row = []; // each row in the datatable
              row.push(office);
              row.push(details);
              row.push(address);
              row.push(action);

              resultData.push(row);
          }
          self.setState({data: resultData}); // set the datatable to use this array
        }).catch(function(err) {
          console.log(err);
        });
  }

  render() {
    return (
      <React.Fragment>
        <div className="jobPostingContainer">
          <MUIDatatable
            className="datatable"
            title={"Job Postings"}
            options={options}
            columns={columns}
            data={this.state.data}
          />
          {this.state.setSuccessOpen ? <SuccessAlert type="acceptGig" /> : null}
          {this.state.setFailOpen ? <FailAlert type="acceptGig" /> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default JobPosting;
