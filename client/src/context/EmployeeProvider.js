import React, { Component } from 'react'
import axios from 'axios'
const { Consumer, Provider } = React.createContext();
const employeeAxios = axios.create();

employeeAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

class EmployeeProvider extends Component {
    constructor() {
        super()
        this.state = {
            inputs: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: ""
            },
            employees: [],
            toggle: true
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState(prevState => ({
            inputs: {...prevState.inputs, [name] : value}
        }))
    }

    clearInputs = () => {
        // console.log('i am clearing')
        this.setState({
                inputs: {
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: ""
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const newObj = {...this.state.inputs}
        this.createEmployee(newObj)
        this.getEmployees()
        this.clearInputs()
        // console.log('ran the clear inputs maybe?')

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

    rerender = () => {
        this.setState(prevState => ({
            employees: prevState.employees
        }))
    }

    editEmployee = (updatedEmployee, _id) => {
        console.log(updatedEmployee, _id)
        axios.put(`/employees/${_id}`, updatedEmployee)
            .then(response => {
                console.log(response.data)
                this.setState(prevState => ({
                    employees: prevState.employees.map(employee => employee._id === response.data._id ? response.data : employee)
                }))
            })
    }

    removeOldEmployee = _id => {
        axios.delete(`/employees/${_id}`)
            .then(res => {
                console.log(res)
                this.getEmployees()
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
                rerender: this.rerender,
                removeOldEmployee: this.removeOldEmployee,
                getEmployees: this.getEmployees,
                createEmployee: this.createEmployee,
                editEmployee: this.editEmployee,
                handleSubmit: this.handleSubmit,
                handleChange: this.handleChange,
                handleToggle: this.handleToggle

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


// Hooks Example

// import React, {useState, useEffect} from 'react'

// const EmployeeProvider = () => {

//     // This is effectively ComponentDidMount
//     useEffect(()=> {
//         handleChange()
//     })

//     const [inputs, setInputs] = useState({
//                                             _id: "",
//                                             firstName: "",
//                                             lastName: "",
//                                             email: "",
//                                             phoneNumber: ""
//                                         })
    
//     const [employees, setEmployees] = useState([])

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setInputs(prevInputs => {
//             return {...prevInputs, [name]: value}
//         })
//     }

//     const mappedInputs = inputs.map(input => )
// }