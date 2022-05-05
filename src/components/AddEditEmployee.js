import React, {useEffect, useRef, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './AddEditEmployee.css';
import {Link, useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const initialState = {
    firstName: "",
    lastName: "",
    age: "",
    job: "",
};

const AddEditEmployee = () => {

    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {firstName, lastName, age, job} = state;

    //useHistory react hook
    const history = useHistory();

    const {id} = useParams();

    //this use effect will only run if there's an ID
    useEffect(() => {
        fetch("https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json")
            .then(res => res.json())
            .then(
                (data_response) => {
                    setData(data_response);
                },
                (error) => {
                    console.log(error);
                }
            )

        return () => {
            setData({});
        }
    }, [id]);

    //this use effect will run if there's and ID and Data
    useEffect(() => {
        if (id) {
            setState({...data[id]});
        } else {
            setState({...initialState});
        }
        //if user navigate to other page, it will clean the clean data
        return () => {
            setState({...initialState});
        }
    }, [id, data]);

    const handleInputChange = (e) => {
        // array destructure, extracting name and value from the inputs.
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //validation if any field empty
        if (!firstName || !lastName || !age || !job) {
            toast.error("Please fill in all the fields on the form")
        } else {
            if (!id) {
                fetch("https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

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

                toast.success("Employee added successfully!")
            } else {
                const response = fetch('https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json' + id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        age: age,
                        job: job
                    })
                })
                    .then(response => {
                        response.json()
                        if (response.ok){
                            toast.success("Employee amended successfully.")
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error("Oops something went wrong.")
                    })
            }
        }
        setTimeout(() => history.push("/"), 500);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Col md={{span: 8, offset: 2}}>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        First name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="First Name" name="firstName" id='firstName'
                                      value={firstName || ""} onChange={handleInputChange}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Last name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Last Name" name="lastName" id='lastName'
                                      value={lastName || ""} onChange={handleInputChange}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Age
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Age" name="age" id='age' value={age || ""}
                                      onChange={handleInputChange}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="2">
                        Job
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Job" name="job" id='job' value={job || ""}
                                      onChange={handleInputChange}/>
                    </Col>
                </Row>
                <input className="my-3 button-form" type="submit" value={id ? "Update" : "Save"}/>
            </Col>
            <Link to="/">
                <Button variant="link">Return to home</Button>
            </Link>
        </form>
    )
}

export default AddEditEmployee;