import React, { Component } from 'react';
import './App.css';
import View from './View'
import Header from './Header'
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
      // console.log(this.props)
      const mappedEmployees = this.props.employees.map(employee => {
        return (
          <Employee employee={employee} key={employee._id}/>
        )
      }).reverse()
      return (
        <div className="App">
          <div className='headerCompDiv'>
            <Header />
          </div>
          <View />
          <div className='mappedDiv'>
            {mappedEmployees}
          </div>
        </div>
      )
    }
  }

export default withEmployees(App);
