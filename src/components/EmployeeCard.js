import React from 'react';
import Card from 'react-bootstrap/Card';

import './EmployeeCard.css';
import Button from "react-bootstrap/Button";

const EmployeeCard = (props) => {

    return (
        <Card text="dark" className="mb-3 bg-light-gray">
            <Card.Body className="card-body">
                <h4 className="mb-1">{props.firstName} {props.lastName}</h4>
                <Card.Text>
                    <span>Age:</span> {props.age} <br/>
                    <span>Job:</span> {props.job}
                </Card.Text>
            </Card.Body>
            <div>
                <div className="card-button mb-3">
                    <Button variant="outline-secondary" size="sm" className="mx-2">Edit</Button>
                    <Button variant="outline-secondary" size="sm">Delete</Button>
                </div>
            </div>
        </Card>
    );
};

export default EmployeeCard;
