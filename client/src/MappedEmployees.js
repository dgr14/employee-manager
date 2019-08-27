import React from 'react'
import { withEmployees } from './context/EmployeeProvider'

function MappedEmployees(){

const mappedEmployees = this.state.employees.map(employee => {
    return (
      <div className='mapped'>
        <p>Employee ID: {employee._id}</p>
        <p>First Name: {employee.firstName}</p>
        <p>Last Name: {employee.lastName}</p>
        <p>E-mail: {employee.email}</p>
        <p>Phone Number: {employee.phoneNumber}</p>
      </div>
    )
  }).reverse()
}
  export default withEmployees(MappedEmployees)