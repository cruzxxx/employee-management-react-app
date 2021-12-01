import React, { useState, useEffect } from 'react';
import EmployeeCard from "./EmployeeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Employees = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    console.log(data);

                    //transform data object into array
                    const loadedEmployees = [];

                    //drill into into nested array inside data object
                    for (const key in data) {
                        loadedEmployees.push({
                            id: key,
                            firstName: data[key].firstName,
                            lastName: data[key].lastName,
                            age: data[key].age,
                            job: data[key].job
                        })
                    }

                    //final array is passed onto setEmployees state
                    setEmployees(loadedEmployees);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Row>
                <Col md={{span: 6, offset: 3}}>
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        id={employee.id}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        age={employee.age}
                        job={employee.job}
                    />
                ))}
                </Col>
            </Row>
        );
    }
}

export default Employees;