import React, { useState } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";

function Form() {
    const initialScheduleValues = {
        name: "",
        date: new Date(),
        approveStatus: "pending",
    };
    const [schedule, setSchedule] = useState(initialScheduleValues);

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        initialScheduleValues.date = date;
        console.log(initialScheduleValues.date);
    };

    const handleInputChange = (event) => {
        setSchedule({
            ...schedule,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify(schedule);
        console.log(data);
        Axios.post("https://enigmatic-taiga-55528.herokuapp.com/schedule", data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Box mt={5}>
                <form>
                    <TextField
                        id="outlined-basic"
                        label="Student Name"
                        variant="outlined"
                        name="name"
                        onChange={handleInputChange}
                    />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            variant="outlined"
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            inputVariant="outlined"
                            name="date"
                        />
                    </MuiPickersUtilsProvider>
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        style={{marginRight: 5,backgroundColor: "black",color: "yellow"}}
                    >
                        Book
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default Form;
