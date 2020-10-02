import { Container, Button } from "@material-ui/core";
import React from "react";
import Form from "./components/Form";
import RecruitPanel from "./components/RecruiterPanel";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    return (
        <div>
            <Container>
                <h1>Book Interview Schedule</h1>
                <Router>
                    <Link to="/Student" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" style={{marginRight: 5,backgroundColor: "yellow",color: "black"}}>
                            Student Panel
                        </Button>
                    </Link>
                    <Link to="/Recruiter" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary" style={{marginRight: 5,backgroundColor: "lightyellow",color: "black"}}>
                            Recruiter Panel
                        </Button>
                    </Link>
                    <Switch>
                        <Route exact path="/Student" component={Form} />
                        <Route
                            exact
                            path="/Recruiter"
                            component={RecruitPanel}
                        />
                    </Switch>
                </Router>
            </Container>
        </div>
    );
}

export default App;
