import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './Home.css';

import Employees from './Employees';
import CreateEmployee from './CreateEmployee';

const Webpages = () => {
    return(
        <div>
            <Container className="pb-3" fluid>
                <Row className="mb-4 header">
                    <Col md={6}>
                        <h3 className="text-white">Customer Management App</h3>
                    </Col>
                    <Col md={6}>
                        <Button variant="light">+ Create Employee</Button>
                    </Col>
                </Row>
            </Container>
            <Router>
                <Route exact path="/" component={Employees} />
                <Route path = "/create-employee" component={CreateEmployee} />
            </Router>
        </div>

    );
};
export default Webpages;