import React from 'react'
import './IncidentForm.css'

function IncidentForm(props) {
    const {handleChange, handleSubmit} = props
    return(
        <div className='incidentFormDiv'>
            <form className='incidentForm'>
                {/* Use Employees name from Employee component */}
                {/* ${inputs.firstName} */}

                <input 
                name='incidentTitle'
                />

                <input 
                name='incidentDate'
                />

                <textarea 
                name='incidentNotes'
                />
            </form>
        </div>
    )
}