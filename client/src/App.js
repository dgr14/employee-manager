import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import View from './View'
import { withEmployees } from './context/EmployeeProvider'

class App extends Component {
  constructor(){
    super()
    this.state = {
      employees: []

    }
  }
  componentDidMount(){
      this.props.getEmployees()
  }
  // componentDidUpdate(prevprops) {
  //   const { responses, _id } = this.props.questions.find(employee => employee._id === this.props.match.params._id)
  //   if (responses.length !== this.state.responses.length){
  //       this.setState({responses, _id})
  //   }
  // }
    render(){
      const mappedEmployees = this.props.employees.map(employee => {
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
      return (
        <div className="App">
          <h1 className='headerText'>Employee Manager</h1>
          <View />
          {mappedEmployees}
        </div>
      )
    }
  }

export default withEmployees(App);
