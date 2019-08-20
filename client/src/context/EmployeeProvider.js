import React, { Component } from 'react'
import axios from 'axios'
const { Consumer, Provider } = React.createContext();
const employeeAxios = axios.create();

employeeAxios.interceptors.request.use((config) => {
    const token = localStorage.getitem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

class EmployeeProvider extends Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    getEmployees = () => {
        employeeAxios.get("/api/employees")
            .then(res => {
                this.setState({ employees: res.data })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    createEmployee = newEmployee => {
        console.log(newEmployee)
        employeeAxios.post("/api/employees", newEmployee)
            .then(res => {
                console.log(res.data)
                this.setState(prevState => ({ employees: [ ...prevState.employees, res.data] }), () => console.log(this.state.employees))
                // this.getEmployees()
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    addEmployee = (newEmployee, _id) => {
        employeeAxios.put(`/api/employees/${_id}`, newEmployee)
            .then(response => {
                this.setState(prevState => ({
                    employees: prevState.employees.map(employee => employee._id === _id ? response.data : employee)
                }))
            })
    }

    removeOldEmployee = _id => {
        employeeAxios.delete(`/api/employees/${_id}`, {living: false})
            .then(res => {
                console.log(res)
                // set state then filter over prevState.questions and return question if question._id !== to _id
                    // how?

                //  make sure to provide function to ?
            })
    }

    render(){
        return (
            <Provider
            value={{
                ...this.state,
                removeOldEmployee: this.removeOldEmployee,
                getEmployees: this.getEmployees,
                createEmployee: this.createEmployee,
                addEmployee: this.addEmployee,

            }}>
            { this.props.children }
            </Provider>
        )
    }
}

export const withEmployees = C => props => (
    <Consumer>
        {value => <C {...value} {...props} />}
    </Consumer>
)

export default EmployeeProvider