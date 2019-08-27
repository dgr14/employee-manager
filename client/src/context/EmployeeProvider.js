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
            inputs: {
                _id: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: ""
            },
            employees: []
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState(prevState => ({
            inputs: {...prevState.inputs, [name] : value}
        }))
    }

    clearInputs = () => {
        this.setState({
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const newObj = {...this.state.inputs}
        this.createEmployee(newObj)
        this.getEmployees()

    }
    handleEdit = (e) => {
        e.preventDefault();
        axios.get('_id')
        axios.put()
        
    }

    getEmployees = () => {
        axios.get("/employees")
            .then(res => {
                this.setState({ employees: res.data })
                    console.log(this.state.employees)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    createEmployee = newEmployee => {
        console.log(newEmployee)
        console.log("test2")

        axios.post("/employees", newEmployee)
            .then(res => {
                console.log("test")
                this.setState(prevState => ({ employees: [ ...prevState.employees, res.data] }), () => console.log(this.state.employees))
                // this.getEmployees()
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    addEmployee = (newEmployee, _id) => {
        employeeAxios.put(`/employees/${_id}`, newEmployee)
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
                handleSubmit: this.handleSubmit,
                handleChange: this.handleChange

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