import React from 'react'
import './EmployeeForm.css'
import { withEmployees } from './context/EmployeeProvider'

function EmployeeForm(props) {
    const {handleChange, handleSubmit, inputs  } = props
    // console.log(inputs)
    return (
        <form className='empForm'>
            <input
            onChange={handleChange}
            value={inputs._id}
            name="_id"
            type="text"
            placeholder="Employee ID"/>

            <input
            onChange={handleChange}
            value={inputs.firstName}
            name="firstName"
            type="text"
            placeholder="First Name" />
            
            <input
            onChange={handleChange}
            value={inputs.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name" />
            
            <input 
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="text"
            placeholder="E-Mail"/>
            
            <input 
            onChange={handleChange}
            value={inputs.phoneNumber}
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"/>

            <button onClick={handleSubmit} value='create' className='submitButton'> Submit </button>
        </form>
    )
}

export default withEmployees(EmployeeForm)