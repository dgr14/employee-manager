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
            value={inputs.id}
            name="id"
            type="text"
            placeholder="Employee ID"
            className='empInput' />

            <input
            onChange={handleChange}
            value={inputs.firstName}
            name="firstName"
            type="text"
            placeholder="First Name" 
            className='empInput' />
            
            <input
            onChange={handleChange}
            value={inputs.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name" 
            className='empInput' />
            
            <input 
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="text"
            placeholder="E-Mail"
            className='emailInput' />
            
            <input 
            onChange={handleChange}
            value={inputs.phoneNumber}
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            className='empInput' />
            <div className='formButton  '>
            <button onClick={handleSubmit} value='create' className='submitButton'> Submit </button>
            </div>
        </form>
    )
}

export default withEmployees(EmployeeForm)