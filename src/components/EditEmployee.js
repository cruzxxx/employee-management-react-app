import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const EditEmployee = (props) => {

    let id = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');

    const editEmployeeHandler = () => {
        fetch('https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json' + id,{
            method: 'PUT',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                age: age,
                job: job
            })
            })
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={editEmployeeHandler}>
            <Col md={{span: 8, offset: 2}}>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        First name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="First Name" id='firstName' value={props.firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Last name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Last Name" id='lastName' value={props.lastName} onChange={(e) => setLastName(e.target.value)} required/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Age
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Age" id='age' value={props.age} onChange={(e) => setAge(e.target.value)}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Job
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Job" id='job' value={props.job} onChange={(e) => setJob(e.target.value)}/>
                    </Col>
                </Row>
                <button className="my-3 button-form">Edit Employee</button>
            </Col>
            <Link to="/">
                <Button variant="link">Return to home</Button>
            </Link>
        </form>

    )
};

export default EditEmployee;