import React, { useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

function RecruiterPanel(props) {
    const classes = useStyles();
    const [scheduleList, setscheduleList] = useState([]);

    function fetchAllApplication() {
        Axios.get("https://enigmatic-taiga-55528.herokuapp.com/schedule")
            .then(function (response) {
                setscheduleList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleApprove(scheduleID) {
        let dataAdd = {
            scheduleID: scheduleID,
            approveStatus: "Approved",
        };
        Axios.put(`https://enigmatic-taiga-55528.herokuapp.com/schedule`, JSON.stringify(dataAdd), {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                fetchAllApplication();
                alert("Approved");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleReject(scheduleID) {
        let dataAdd = {
            scheduleID: scheduleID,
            approveStatus: "Rejected",
        };
        Axios.put(`https://enigmatic-taiga-55528.herokuapp.com/schedule`, JSON.stringify(dataAdd), {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                fetchAllApplication();
                alert("Rejected");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchAllApplication();
    }, [scheduleList.approveStatus]);

    return (
        <div>
            <h1>Student Applicants List</h1>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="a dense table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Student Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scheduleList.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{Intl.DateTimeFormat('en-US').format(new Date(row.date)) }</TableCell>
                                <TableCell align="right">
                                    {row.approveStatus}
                                </TableCell>

                                <TableCell align="right">
                                    <Button onClick={() => handleApprove(row._id)} disabled={row.approveStatus === "Approved"?true:false}>
                                        Approve
                                    </Button>
                                    <Button onClick={() => handleReject(row._id)} disabled={row.approveStatus === "Rejected"?true:false}>
                                        Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RecruiterPanel;
