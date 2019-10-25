import React from 'react'
import './IncidentForm.css'
import Employee from './Employee';

function IncidentForm(props) {
    const {handleChange, handleSubmit} = props
    const {employee} = this.props
    return(
        <div className='incidentFormDiv'>
            <form className='incidentForm'>
                Employee: ${employee.firstName}
                {/* Use Employees name from Employee component */}

                <input 
                name='incidentTitle'
                onChange={this.handleChange}
                placeholder={`Incident Title`}
                className='incidentInput'
                />

                <input 
                name='incidentDate'
                onChange={this.handleChange}
                placeholder={`Incident Date`}
                className='incidentInput'
                />

                <textarea 
                name='incidentNotes'
                onChange={this.handleChange}
                placeholder={`Incident Notes`}
                className='incidentTextarea'
                />
            </form>
        </div>
    )
}