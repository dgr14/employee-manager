import React, {Component, useEffect} from 'react'
import { withEmployees } from './context/EmployeeProvider'

class Employee extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggle: true,
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

handleChange = (e) => {
  const { name, value } = e.target
  this.setState(prevState => ({
      [name]: value
  }))
}

render(){
  const {employee, editEmployee} = this.props
  // console.log(employee)
  // const {toggle} = this.state
// console.log(this.state.toggle)
// console.log(this.props)
      return (
        <div>

        {this.state.toggle ?

        <div className='mapped'>

          <p>Employee ID: {employee._id}</p>
          <p>First Name: {employee.firstName}</p>
          <p>Last Name: {employee.lastName}</p>
          <p>E-mail: {employee.email}</p>
          <p>Phone Number: {employee.phoneNumber}</p>

          <button onClick={() => {
            editEmployee()
            this.handleToggle()
            }}>Edit</button>

        </div>
        :
        <div>
          <input name="firstName" onChange={this.handleChange} value={this.state.firstName} />
          <button onClick={() => editEmployee({firstName: this.state.firstName,lastName: this.state.lastName, email: this.state.email, phone: this.state.phoneNumber}, employee._id)
          }>Submit</button>
        </div>
        }
        
        </div>
    )
  }
}


  
  export default withEmployees(Employee)