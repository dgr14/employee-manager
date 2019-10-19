import React, { Component } from 'react'
import { withEmployees } from './context/EmployeeProvider'
import './Employee.css'

class Employee extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggle: true,
      id: props.employee.id,
      firstName: props.employee.firstName,
      lastName: props.employee.lastName,
      email: props.employee.email,
      phoneNumber: props.employee.phoneNumber
    }
  }

  // toggle = () => {
  //   console.log('testing toggle state')
  //   this.setState(prevState => {
  //     this.state.toggle = !prevState.toggle
  //   }, () => console.log(this.state.toggle))

  // }

handleToggle = () => {
  console.log('testing toggle state')
  this.setState(prevState => {
    this.state.toggle = !prevState.toggle
  }, () => console.log(this.state.toggle))

}

// Do I need a new function for handling toggle to incidentForm?

handleChange = (e) => {
  const { name, value } = e.target
  this.setState(prevState => ({
      [name]: value
  }))
}

render(){
  const {employee, editEmployee, rerender, removeOldEmployee} = this.props
  // console.log(employee)
  // const {toggle} = this.state
// console.log(this.state.toggle)
// console.log(this.props)
      return (
        <div className='mapContainer'>

          {this.state.toggle ?

          <div className='mapped'>

            <p>Employee ID: {employee.id}</p>
            <p>First Name: {employee.firstName}</p>
            <p>Last Name: {employee.lastName}</p>
            <p>E-mail: {employee.email}</p>
            <p>Phone Number: {employee.phoneNumber}</p>

            <div className='editButtonDiv'>
              {/* Need to add fucntionality to the 'Add Incident' Button */}
              <button className='editButton'>Add Incident</button>
              <button onClick={() => {
                rerender()
                this.handleToggle()
                }}
                className='editButton'>Edit Information</button>
              
            </div>
          </div>
          :
          <div className="updateDiv">

            <input name="id" onChange={this.handleChange} placeholder={`Employee ID: ${this.state.id}`} className='editInput' />
            <input name="firstName" onChange={this.handleChange} placeholder={`First Name: ${this.state.firstName}`} className='editInput' />
            <input name="lastName" onChange={this.handleChange} placeholder={`Last Name: ${this.state.lastName}`} className='editInput' />
            <input name="email" onChange={this.handleChange} placeholder={`E-Mail: ${this.state.email}`} className='editInput' />
            <input name="phoneNumber" onChange={this.handleChange} placeholder={`Phone Number: ${this.state.phoneNumber}`} className='editInput' />
            
            <div className='updateButtonDiv'>
              <button onClick={() => {
                editEmployee({id: this.state.id, firstName: this.state.firstName,lastName: this.state.lastName, email: this.state.email, phoneNumber: this.state.phoneNumber, _id: employee._id}, employee._id)
              this.handleToggle()}}
                className='editButton'>Submit</button>
              <button onClick={() => {
              removeOldEmployee(employee._id)
              this.handleToggle()}}
                className='deleteButton'>Delete</button>
            </div>
          </div>
          }
        </div>
    )
  }
}


  
  export default withEmployees(Employee)