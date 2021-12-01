import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import {
    Link
} from "react-router-dom";
import './EmployeeCard.css';
import Button from "react-bootstrap/Button";

const EmployeeCard = (props) => {

    useEffect(() => {
        // storing input name
        localStorage.setItem('ID', props.id);
        localStorage.setItem('First Name', props.firstName)
        localStorage.setItem('Last Name', props.lastName)
        localStorage.setItem('Age', props.age)
        localStorage.setItem('Job', props.job)
    }, [props.id, props.firstName, props.lastName, props.age, props.job]);

    return (
        <Card text="dark" className="mb-3 bg-light-gray">
            <Card.Body className="card-body">
                <h4 className="mb-1">{props.firstName} {props.lastName}</h4>
                <Card.Text>
                    <span>Age:</span> {props.age} <br/>
                    <span>Job:</span> {props.job} <br/>
                    <span>ID:</span> {props.id} <br/>
                </Card.Text>
            </Card.Body>
            <div>
                <div className="card-button mb-3">
                    <Link to={`/edit-employee/${props.id}`}>
                        <Button variant="outline-secondary" size="sm" className="mx-2">Edit</Button>
                    </Link>
                    <Link to={`/delete-employee/${props.id}`}>
                        <Button variant="outline-secondary" size="sm">Delete</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default EmployeeCard;
