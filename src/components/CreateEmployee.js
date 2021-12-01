import React, {useRef, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './CreateEmployee.css';
import {Link} from "react-router-dom";

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');

    const submitNewEmployeeHandler = (event) => {
        event.preventDefault();

        fetch("https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                age: age,
                job: job
            })
        })
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={submitNewEmployeeHandler}>
            <Col md={{span: 8, offset: 2}}>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        First name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="First Name" id='firstName' onChange={(e) => setFirstName(e.target.value)} required/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Last name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Last Name" id='lastName' onChange={(e) => setLastName(e.target.value)} required/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Age
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="number" placeholder="Age" id='age' onChange={(e) => setAge(e.target.value)}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                       Job
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Job" id='job' onChange={(e) => setJob(e.target.value)}/>
                    </Col>
                </Row>
                <button className="my-3 button-form" type="submit">Add Employee</button>
            </Col>
            <Link to="/">
                <Button variant="link">Return to home</Button>
            </Link>
        </form>
    );
}
export default CreateEmployee;