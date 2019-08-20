import React, { Component } from 'react'
import axios from "axios"
const employeeAxios = axios.create();

employeeAxios.interceptiors.request.use((config ) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const AppContext = React.createContext()

export class AppContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getitem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }

    getEmployees = () => {
        return employeeAxios.get("/api/employees")
            .then(response => {
                this.setState(prevState => {
                    return { employees: [...prevState.employees, response.data] }
                })
                return response;
            })
    }

    addEmployee = (newEmployee) => {
        return employeeAxios.post("/api/employees/", newEmployee)
            .then(response => {
                this.setState(prevState => {
                    return { employees: [...prevState.employees, response.data] }
                })
                return response
            })
    }

    editEmployees = (employeesId, employee) => {
        return employeeAxios.put(`/api/employees/${employeesId}`, employee)
            .then(response => {
                const updatedQuestions = prevState.employees.map(employee => {
                    return employee._id === response.data._id ? response.data : employee
                })
                return { questions: updatedEmployees}
            })
    }

    deleteEmployees = (employeeId) => {
        return employeeAxios.delete(`/api/employees/${employeeId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedEmployees = prevState.employees.filter(employee => {
                        return employee._id !== employeeId
                    })
                    return { employees: updatedEmployees }
                })
                return response
            })
    }

    signup = (userInfo) => {
        return axios.post("/auth/signup", userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.setState({
                    user,
                    token
                })
                return response
            })
    }

    login = (credentials) => {
        return axios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.setState({
                    user,
                    token
                });
                this.getEmployees();
                return response;
            })
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({
            user: {},
            token: ""
        })
    }

    render() {
        return(
            <AppContext.Provider
                value={{
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    ...this.state
                }}
            >
            
            {this.props.children}
            
            </AppContext.Provider>
        )
    }
}

export const withContext = Component => {
    return props => {
        return(
            <AppContext.Consumer>
                {
                    globalState => {
                        return(
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </AppContext.Consumer>
        )
    }
}