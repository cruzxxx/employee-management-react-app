import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './Home.css';

import Employees from './Employees';
import AddEditEmployee from './AddEditEmployee';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    return (
        <div>
            <ToastContainer position="top-center"/>
            <Router>
                <Container className="pb-3" fluid>
                    <Row className="mb-4 header">
                        <Col md={6}>
                            <Link to="/" className="header-text">
                                <h3 className="text-white">Customer Management App</h3>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <Link to="/create-employee">
                                <Button variant="light">+ Create Employee</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                <Route exact path="/" component={Employees}/>
                <Route path="/create-employee" component={AddEditEmployee}/>
                <Route path="/edit-employee/:id" component={AddEditEmployee}/>
            </Router>
        </div>

    );
};
export default Home;