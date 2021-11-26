import React, { useState, useEffect } from 'react';
import EmployeeCard from "./EmployeeCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Employees = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("https://payslip-fe-task-3emspw8.devlabs-projects.info/employee")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setEmployees(data.data);
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
                        key={employee._id}
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