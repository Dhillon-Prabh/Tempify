
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './TempData.css';

class TempData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    createRow(id, name, email, phone, license_number, payment) {
        return {id, name, email, phone, license_number, payment};
    }

    componentDidMount() {
        var rows = [];
        fetch("/auth/admin", {
            method: 'GET'
        }).then(res =>  {
            return res.json();
        }).then(result => {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var id = result[i].temp_id;
                var name = result[i].temp_name;
                var email = result[i].email;
                var phone = result[i].phone;
                var license_number = result[i].license_number;
                var payment = result[i].payment;
                rows.push(this.createRow(id, name, email, phone, license_number, payment));
            }
            this.setState({data: rows});
        }).catch(function(err) {
          console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <Paper>
                    <div className="tableWrapper">
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell className="headerFont" align="right">Name</TableCell>
                                <TableCell className="headerFont" align="right">Email</TableCell>
                                <TableCell className="headerFont" align="right">Phone</TableCell>
                                <TableCell className="headerFont" align="right">License Number</TableCell>
                                <TableCell className="headerFont" align="right">Payment Required</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(row => (
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row" className="cellFont">
                                    {row.id}
                                </TableCell>
                                <TableCell className="cellFont" align="right">{row.name}</TableCell>
                                <TableCell className="cellFont" align="right">{row.email}</TableCell>
                                <TableCell className="cellFont" align="right">{row.phone}</TableCell>
                                <TableCell className="cellFont" align="right">{row.license_number}</TableCell>
                                <TableCell className="cellFont" align="right">{row.payment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default TempData;