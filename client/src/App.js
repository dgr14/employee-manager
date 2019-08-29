import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import View from './View'
import { withEmployees } from './context/EmployeeProvider'
import Employee from './Employee'

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
      console.log(this.props)
      const mappedEmployees = this.props.employees.map(employee => {
        return (
          <Employee employee={employee} key={employee._id}/>
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
