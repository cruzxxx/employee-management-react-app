import React, { useState, useEffect } from 'react';
import EmployeeCard from "./EmployeeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Employees = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this record?")){
            fetch('https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json' + id, {
                method: 'DELETE',
            })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res)


                )
                .catch(error => console.log(error))
                .catch(() => toast.error("Something went wrong"))
        }
    }

    useEffect(() => {
        fetch("https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json")
            .then(res => res.json())
            .then(
                (data_response) => {
                    setIsLoaded(true);

                    //transform data object into list to iterate through data with map method
                    // and display data on the page.
                    const loadedEmployees = [];

                    //drill into into nested array inside data object
                    for (const key in data_response) {
                        loadedEmployees.push({
                            id: key,
                            firstName: data_response[key].firstName,
                            lastName: data_response[key].lastName,
                            age: data_response[key].age,
                            job: data_response[key].job
                        })
                    }

                    //final array is passed onto setEmployees state
                    setData(loadedEmployees);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Row>
                <Col md={{span: 6, offset: 3}}>
                {/*TODO: refactor this to use the EmployeCard component*/}
                {data.map(employee => (
                    <Card text="dark" className="mb-3 bg-light-gray" key={employee.id}>
                        <Card.Body className="card-body">
                            <h4 className="mb-1">{employee.firstName} {employee.lastName}</h4>
                            <Card.Text>
                                <span>Age:</span> {employee.age} <br/>
                                <span>Job:</span> {employee.job} <br/>
                                <span>ID:</span> {employee.id} <br/>
                            </Card.Text>
                        </Card.Body>
                        <div>
                            <div className="card-button mb-3">
                                <Link to={`/edit-employee/${employee.id}`}>
                                    <Button variant="outline-secondary" size="sm" className="mx-2">Edit</Button>
                                </Link>
                                    <Button variant="outline-secondary" size="sm" onClick={() => onDelete(employee.id)}>Delete</Button>
                            </div>
                        </div>
                    </Card>
                ))}
                </Col>
            </Row>
        );
    }
}

export default Employees;