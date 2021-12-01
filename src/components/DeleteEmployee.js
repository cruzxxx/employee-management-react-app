import React from 'react';

const DeleteEmployee = (props) => {

    let id = props._id

    fetch('https://react-crud-operations-4972b-default-rtdb.europe-west1.firebasedatabase.app/employee.json' + id, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))

    return (
        <div>Delete employee
            ID: {id}
        </div>

    )
};

export default DeleteEmployee;